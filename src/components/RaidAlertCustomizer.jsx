import React, {useState, useRef} from 'react';
import Animation from '../elements/Animation';

import ApiHelper from '../utils/ApiHelper';
import config from '../config/config';

const RaidAlertCustomizer = (props) => {
    const [file, setFile] = useState(null);
    const [sprites, setSprites] = useState([]);
    const [sfx, setSFX] = useState({});
    const [bgm, setBGM] = useState({});
    const fileInput = useRef();
    const bgmFileInput = useRef();
    const sfxFileInput = useRef();

    const storeAudio = async (imagePayload, title) => {
        let mediaData = {
            mimeType: "audio/mp3",
            imagePayload,
            title
        };

        let {_id} = await ApiHelper.storeMedia(mediaData);
        return `${config.MEDIA_SERVER_URL}/media/${_id}/file`;
    }

    const storeImage = async (imagePayload, title) => {
        let mediaData = {
            mimeType: "image/png",
            imagePayload,
            title
        };

        let {_id} = await ApiHelper.storeMedia(mediaData);
        return `${config.MEDIA_SERVER_URL}/media/${_id}/file`;
    }

    const storeRaidAlert = async () => {
        sprites.forEach((sprite) => {
            sprite.file = storeImage(sprite.file, "Raid-Sprite");
        });

        bgm.file = await storeAudio(bgm.file, "Raid-BGM");
        sfx.file = await storeAudio(sfx.file, "Raid-SFX");

        let config = {
            message: "TEST",
            sprites: sprites.map((sprite) => {
                return {
                    file: sprite.file,
                    startFrame: sprite.startFrame,
                    endFrame: sprite.endFrame,
                    frameWidth: sprite.frameWidth,
                    frameHeight: sprite.frameHeight,
                    frameRate: sprite.frameRate
                }
            }),
            music: {
                file: bgm.file,
                volume: 1
            },
            leavingSound: {
                file: sfx.file,
                volume: 1
            }
        };

        await ApiHelper.storeRaidAlert(config);
    }

    return (
        <div>
            <hr />
            <h1>Create a New Custom Raid Alert</h1>
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
                                                    onChange={(e) => {
                                                        const temp = [...sprites];
                                                        sprite.frames = e.target.value ? parseInt(e.target.value) : 1;
                                                        sprite.endFrame = sprite.frames;
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
                                                    onChange={(e) => {
                                                        const temp = [...sprites];
                                                        sprite.endFrame = e.target.value ? parseInt(e.target.value) : sprite.frames;
                                                        temp[index] = sprite;
                                                        setSprites(temp);
                                                    }} />
                                            </td>
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
                    onChange={(e) => {
                        const f = e.target.files[0];
                        setFile(f);
                    }}/>
                <button
                    disabled={file === null}
                    onClick={() => {
                        const fr = new FileReader();
                        fr.addEventListener("load", (event) => {
                            const sprite = {
                                file: event.target.result,
                                width: 0,
                                height: 0,
                                frames: 1,
                                startFrame: 0,
                                endFrame: 0,
                                frameRate: 15
                            };

                            const temp = [...sprites];
                            temp.push(sprite);
                            setSprites(temp);
                            fileInput.current.value = '';
                        })
                        fr.readAsDataURL(file);
                        setFile(null);
                    }}>Add Sprite</button>
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
                                onChange={(e) => {
                                    const f = e.target.files[0];
                                    const fr = new FileReader();
                                    fr.addEventListener("load", (event) => {
                                        setBGM({file: event.target.result});
                                    });
                                    fr.readAsDataURL(f);
                                }}/>
                        </td><td style={{verticalAlign: "middle"}}>
                            <audio 
                                src={bgm.url}
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
                                onChange={(e) => {
                                    const f = e.target.files[0];
                                    const fr = new FileReader();
                                    fr.addEventListener("load", (event) => {
                                        setSFX({file: event.target.result});
                                    });
                                    fr.readAsDataURL(f);
                                }}/>
                        </td><td style={{verticalAlign: "middle"}}>
                            <audio 
                                src={sfx.url} 
                                width="300px" 
                                controls />
                        </td>
                    </tr>
                </tbody>
            </table>
            <hr />
            <pre>
                {
                    JSON.stringify({
                        message: "TEST",
                        sprites: sprites.map((sprite) => {
                            return {
                                file: "TBA",
                                startFrame: sprite.startFrame,
                                endFrame: sprite.endFrame,
                                frameWidth: sprite.frameWidth,
                                frameHeight: sprite.frameHeight,
                                frameRate: sprite.frameRate
                            }
                        }),
                        music: {
                            file: "TBA",
                            volume: 1
                        },
                        leavingSound: {
                            file: "TBA",
                            volume: 1
                        }
                    }, null, 5)
                }
            </pre>
            <button onClick={async () => {
                await storeRaidAlert();
            }}>
                Create
            </button>
        </div>
    )
};

export default RaidAlertCustomizer;