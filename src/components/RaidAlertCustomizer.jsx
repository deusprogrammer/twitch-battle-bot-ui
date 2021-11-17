import React, {useState, useRef, useEffect} from 'react';
import Animation from '../elements/Animation';

import ApiHelper from '../utils/ApiHelper';
import config from '../config/config';

const readFileAsDataUri = (file) => {
    return new Promise(function(resolve,reject){
        let fr = new FileReader();

        fr.onload = function(){
            resolve(fr.result);
        };

        fr.onerror = function(){
            reject(fr);
        };

        fr.readAsDataURL(file)
    });
}

const RaidAlertCustomizer = (props) => {
    const [sprites, setSprites] = useState([]);
    const [sfx, setSFX] = useState({});
    const [bgm, setBGM] = useState({});
    const [name, setName] = useState("Sprite");
    const [message, setMessage] = useState("Incoming raid of size ${raidSize} from ${raider}");
    const [saving, setSaving] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const fileInput = useRef();
    const bgmFileInput = useRef();
    const sfxFileInput = useRef();

    useEffect(async () => {
        if (props.match && props.match.params && props.match.params.id) {
            let raidAlert = await ApiHelper.getRaidAlert(props.match.params.id);

            raidAlert.sprites.forEach((sprite) => {
                sprite.isStored = true;
                sprite.frames = sprite.cellCount;
                sprite.endFrame -= 1;
            });

            raidAlert.music.isStored = true;
            raidAlert.leavingSound.isStored = true;

            setName(raidAlert.name);
            setMessage(raidAlert.message);
            setSprites(raidAlert.sprites);
            setBGM(raidAlert.music);
            setSFX(raidAlert.leavingSound);
            setIsEdit(true);
        }
    }, []);

    const removeSprite = async (index) => {
        let temp = [...sprites];
        temp.splice(index, 1);
        setSprites(temp);
    };

    const storeAudio = async (imagePayload, title) => {
        let mediaData = {
            mimeType: "audio/mp3",
            imagePayload,
            title
        };

        let {_id} = await ApiHelper.storeMedia(mediaData);
        return `${config.MEDIA_SERVER_URL}/media/${_id}/file.mp3`;
    };

    const storeImage = async (imagePayload, title) => {
        let mediaData = {
            mimeType: "image/png",
            imagePayload,
            title
        };

        let {_id} = await ApiHelper.storeMedia(mediaData);
        return `${config.MEDIA_SERVER_URL}/media/${_id}/file.png`;
    };

    const storeRaidAlert = async () => {
        for (let sprite of sprites) {
            if (!sprite.isStored) {
                sprite.file = await storeImage(sprite.file.substring(sprite.file.indexOf(',') + 1), "Raid-Sprite");
            }
        }

        let bgmFile = bgm.file;
        if (!bgm.isStored) {
            bgmFile = await storeAudio(bgm.file.substring(bgm.file.indexOf(',') + 1), "Raid-BGM");
        }

        let sfxFile = sfx.file;
        if (!sfx.isStored) {
            sfxFile = await storeAudio(sfx.file.substring(sfx.file.indexOf(',') + 1), "Raid-SFX");
        }

        let config = {
            twitchChannel: parseInt(window.localStorage.getItem("channel")),
            name,
            message,
            sprites: sprites.map((sprite) => {
                return {
                    file: sprite.file,
                    startFrame: sprite.startFrame,
                    endFrame: sprite.endFrame,
                    frameWidth: sprite.frameWidth,
                    frameHeight: sprite.frameHeight,
                    frameRate: sprite.frameRate,
                    cellCount: sprite.frames
                }
            }),
            music: {
                file: bgmFile,
                volume: 1
            },
            leavingSound: {
                file: sfxFile,
                volume: 1
            }
        };

        if (isEdit) {
            await ApiHelper.updateRaidAlert(props.match.params.id, config);
            return props.match.params.id;
        } else {
            let {_id} = await ApiHelper.storeRaidAlert(config);
            return _id;
        }
    };

    return (
        <div>
            <hr />
            <h1>Create a New Custom Raid Alert</h1>
            <hr />
            <h2>Metadata</h2>
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>Name:</td>
                            <td>
                                <input 
                                    type="text" 
                                    style={{width: "400px"}}
                                    value={name}
                                    disabled={saving}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }} />
                            </td>
                        </tr>
                        <tr>
                            <td>Message Template:</td>
                            <td>
                                <input 
                                    type="text" 
                                    style={{width: "400px"}}
                                    value={message}
                                    disabled={saving}
                                    onChange={(e) => {
                                        setMessage(e.target.value);
                                    }} />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <hr />
            <div>
                <h2>Sprites</h2>
                {sprites.map((sprite, index) => {
                    return (
                        <div key={`sprite-${index}`} style={{border: "1px solid black"}}>
                            <h3>Sprite {index}</h3>
                            <div style={{marginLeft: "10px"}}>
                                <Animation 
                                    url={sprite.file}
                                    frameCount={sprite.frames}
                                    speed={sprite.frameRate}
                                    startFrame={sprite.startFrame}
                                    endFrame={sprite.endFrame}
                                    onLoaded={(frameWidth, frameHeight) => {
                                        const temp = [...sprites];
                                        sprite.frameWidth = Math.floor(frameWidth);
                                        sprite.frameHeight = Math.floor(frameHeight);
                                        temp[index] = sprite;
                                        setSprites(temp);
                                    }} />
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>Sprite Size:</td>
                                            <td>{sprite.frameWidth}X{sprite.frameHeight}</td>
                                        </tr>
                                        <tr>
                                            <td>Cell Count:</td>
                                            <td>
                                                <input 
                                                    type="number" 
                                                    value={sprite.frames} 
                                                    disabled={saving}
                                                    onChange={(e) => {
                                                        const temp = [...sprites];
                                                        sprite.frames = e.target.value ? parseInt(e.target.value) : 1;
                                                        sprite.endFrame = sprite.frames - 1;
                                                        temp[index] = sprite;
                                                        setSprites(temp);
                                                    }} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Frame Rate:</td>
                                            <td>
                                                <input 
                                                    type="number" 
                                                    value={sprite.frameRate} 
                                                    disabled={saving}
                                                    onChange={(e) => {
                                                        const temp = [...sprites];
                                                        sprite.frameRate = e.target.value ? parseInt(e.target.value) : 15;
                                                        temp[index] = sprite;
                                                        setSprites(temp);
                                                    }} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Start Frame:</td>
                                            <td>
                                                <input 
                                                    type="number" 
                                                    value={sprite.startFrame} 
                                                    disabled={saving}
                                                    onChange={(e) => {
                                                        const temp = [...sprites];
                                                        sprite.startFrame = e.target.value ? parseInt(e.target.value) : 0;
                                                        temp[index] = sprite;
                                                        setSprites(temp);
                                                    }} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>End Frame:</td>
                                            <td>
                                                <input 
                                                    type="number" 
                                                    value={sprite.endFrame} 
                                                    disabled={saving}
                                                    onChange={(e) => {
                                                        const temp = [...sprites];
                                                        sprite.endFrame = e.target.value ? parseInt(e.target.value) : sprite.frames;
                                                        temp[index] = sprite;
                                                        setSprites(temp);
                                                    }} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><button onClick={() => {removeSprite(index)}}>Remove</button></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div style={{backgroundColor: "gray", color: "white"}}>
                <input 
                    type="file" 
                    ref={fileInput}
                    accept=".png"
                    multiple
                    disabled={saving}
                    onChange={(e) => {
                        let readers = [];
                        for (let file of e.target.files) {
                            readers.push(readFileAsDataUri(file));
                        };
                        Promise.all(readers).then((results) => {
                            let newSprites = results.map((dataUri) => {
                                return {
                                    file: dataUri,
                                    width: 0,
                                    height: 0,
                                    frames: 1,
                                    startFrame: 0,
                                    endFrame: 0,
                                    frameRate: 15,
                                    isStored: false
                                };
                            });
                            setSprites([...sprites, ...newSprites]);
                            fileInput.current.value = '';
                        });
                    }}/>
            </div>
            <hr />
            <h2>Sounds</h2>
            <table>
                <tbody>
                    <tr>
                        <td style={{verticalAlign: "middle"}}>BGM:</td>
                        <td style={{verticalAlign: "middle"}}>
                            <input 
                                type="file" 
                                ref={bgmFileInput}
                                accept=".mp3"
                                disabled={saving}
                                onChange={(e) => {
                                    const f = e.target.files[0];
                                    const fr = new FileReader();
                                    fr.addEventListener("load", (event) => {
                                        setBGM({file: event.target.result, isStored: false});
                                    });
                                    fr.readAsDataURL(f);
                                }}/>
                        </td>
                        <td style={{verticalAlign: "middle"}}>
                            <audio 
                                src={bgm.file}
                                width="300px" 
                                controls  />
                        </td>
                    </tr>
                    <tr>
                        <td style={{verticalAlign: "middle"}}>SFX:</td>
                        <td style={{verticalAlign: "middle"}}>
                            <input 
                                type="file" 
                                ref={sfxFileInput}
                                accept=".mp3"
                                disabled={saving}
                                onChange={(e) => {
                                    const f = e.target.files[0];
                                    const fr = new FileReader();
                                    fr.addEventListener("load", (event) => {
                                        setSFX({file: event.target.result, isStored: false});
                                    });
                                    fr.readAsDataURL(f);
                                }}/>
                        </td><td style={{verticalAlign: "middle"}}>
                            <audio 
                                src={sfx.file} 
                                width="300px" 
                                controls />
                        </td>
                    </tr>
                </tbody>
            </table>
            <hr />
            <button 
                disabled={!name || !message || !sfx.file || !bgm.file || sprites.length <= 0 || saving}
                onClick={async () => {
                    setSaving(true);
                    let id = await storeRaidAlert();
                    setSaving(false);
                    window.location = `https://deusprogrammer.com/util/twitch-tools/raid-test?raider=wagnus&raidSize=1000&theme=STORED&key=${id}`;
            }}>
                { isEdit ? "Update" : "Create" }
            </button>
        </div>
    )
};

export default RaidAlertCustomizer;