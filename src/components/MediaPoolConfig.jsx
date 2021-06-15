import React from 'react';
import ApiHelper from '../utils/ApiHelper';
import config from '../config/config';
import {toast} from 'react-toastify';

export default class MediaPoolConfig extends React.Component {
    constructor(props) {
        super(props);

        this.audioUrlRef = React.createRef();
        this.audioDataRef = React.createRef();
        this.videoUrlRef = React.createRef();
        this.videoDataRef = React.createRef();

        this.state = {
            channelId: parseInt(window.localStorage.getItem("channel")),
            videoPool: [],
            audioPool: [],
            uploadVideoData: "",
            uploadAudioData: "",
            uploadVideoDataUrl: "",
            uploadAudioDataUrl: "",
            addVideoUrl: "",
            addAudioUrl: "",
            uploadVideoFileName: "",
            uploadAudioFileName: "",
            videoPreview: {},
            audioPreview: {},
            saving: false
        }
    }

    componentDidMount = async () => {
        try {
            await this.loadMediaData();
        } catch (e) {
            console.error(e);
        }
    }

    loadMediaData = async () => {
        let {videoPool, audioPool} = await ApiHelper.getBot(this.state.channelId);
        this.setState({videoPool, audioPool});
    }

    onFileLoaded = (e) => {
        let fr = new FileReader();
        let file = e.target.files[0];

        const uploadFileName = file.name;
        const lastDot = uploadFileName.lastIndexOf('.');
        const ext = uploadFileName.substring(lastDot + 1);

        fr.onload = () => {
            let base64Media = fr.result.substring(fr.result.indexOf(',') + 1);

            if (ext === "mp4") {
                this.setState({uploadVideoData: base64Media, uploadVideoDataUrl: fr.result, uploadVideoFileName: uploadFileName});
            } else if (ext === "mp3") {
                this.setState({uploadAudioData: base64Media, uploadAudioDataUrl: fr.result, uploadAudioFileName: uploadFileName});
            }
        }

        fr.readAsDataURL(file);
    }

    onChangeUrl = (e, type) => {
        if (type === "video") {
            this.setState({addVideoUrl: e.target.value});
        } else if (type ==="audio") {
            this.setState({addAudioUrl: e.target.value});
        }
    }

    onDisableMedia = async (e, type, index) => {
        let mediaPool = {};
        if (type === "audio") {
            mediaPool = [...this.state.audioPool];
        } else if (type === "video") {
            mediaPool = [...this.state.videoPool];
        } else {
            return;
        }

        mediaPool[index].url = (e.target.checked ? "" : "*") + mediaPool[index].url.replace("*", "");

        try {
            if (type === "audio") {
                this.setState({audioPool: mediaPool, saving: true});
                await ApiHelper.updateBotMediaPool(this.state.channelId, "audio", mediaPool);
            } else if (type === "video") {
                this.setState({videoPool: mediaPool, saving: true});
                await ApiHelper.updateBotMediaPool(this.state.channelId, "video", mediaPool);
            } else {
                return;
            }
            toast(`Updated video state`, {type: "info"});
            this.setState({saving: false});
        } catch(e) {
            console.error(e);
            toast("Failed to update media pool!")
            return;
        }
    }

    storeMedia = async (type) => {
        let mediaPool = {};
        let mediaData = {};
        let mediaUrl = "";
        if (type === "audio") {
            mediaData.mimeType = "audio/mp3";
            mediaData.imagePayload = this.state.uploadAudioData;
            mediaData.title = this.state.uploadAudioFileName;
            mediaPool = [...this.state.audioPool];
            mediaUrl = this.state.addAudioUrl;
        } else if (type === "video") {
            mediaData.mimeType = "video/mp4";
            mediaData.imagePayload = this.state.uploadVideoData;
            mediaData.title = this.state.uploadVideoFileName;
            mediaPool = [...this.state.videoPool];
            mediaUrl = this.state.addVideoUrl;
        } else {
            return;
        }

        this.setState({saving: true});
        if (!this.state.addAudioUrl && !this.state.addVideoUrl) {
            try {
                let {_id} = await ApiHelper.storeMedia(mediaData);
                mediaPool.push({
                    name: type + (mediaPool.length + 1),
                    url: `${config.MEDIA_SERVER_URL}/media/${_id}/file`
                });
            } catch (e) {
                console.error(e);
                toast("Failed to store video file!")
                return;
            }
        } else {
            mediaPool.push({
                name: type + (mediaPool.length + 1),
                url: mediaUrl
            });
        }

        try {
            await ApiHelper.updateBotMediaPool(this.state.channelId, type, mediaPool);
        } catch (e) {
            console.error(e);
            toast("Failed to update media pool!")
            return;
        }
        toast(`Media stored successfully`, {type: "info"});
        this.setState({saving: false});

        this.audioUrlRef.current.value = null;
        this.audioDataRef.current.value = null;
        this.videoUrlRef.current.value = null;
        this.videoDataRef.current.value = null;

        this.setState({uploadAudioData: "", uploadAudioDataUrl: "", uploadAudioFileName: "", uploadVideoData: "", uploadVideoDataUrl: "", uploadVideoFileName: ""});
        this.loadMediaData();
    }

    updateMedia = (e, index, type) => {
        let mediaPool = [];

        if (type === "audio") {
            mediaPool = [...this.state.audioPool];
        } else if (type === "video") {
            mediaPool = [...this.state.videoPool];
        } else {
            return;
        }

        mediaPool[index].name = e.target.value;

        if (type === "audio") {
            this.setState({audioPool: mediaPool});
        } else if (type === "video") {
            this.setState({videoPool: mediaPool});
        } else {
            return;
        }
    }

    saveMediaConfig = async (type) => {
        let mediaPool = [];

        if (type === "audio") {
            mediaPool = [...this.state.audioPool];
        } else if (type === "video") {
            mediaPool = [...this.state.videoPool];
        } else {
            return;
        }

        try {
            this.setState({saving: true});
            await ApiHelper.updateBotMediaPool(this.state.channelId, type, mediaPool);
            this.setState({saving: false});
            toast(`Media config save successful`, {type: "info"});
        } catch (e) {
            console.error(e);
            toast("Failed to save media pool config!")
            return;
        }
    }

    render() {
        return (
            <div>
                <div style={{display: "table"}}>
                    <div style={{display: "table-cell"}}>
                        <h3>My Audio</h3>
                        <ul>
                            { this.state.audioPool.map((element, index) => {
                                return (
                                    <li>
                                        <input type="checkbox" onChange={(e) => {this.onDisableMedia(e, "audio", index)}} checked={!element.name.startsWith("*")} disabled={this.state.saving}/>
                                        <span className={this.state.audioPreview === element.url  ? "selected" : ""} style={{cursor: "pointer"}} onClick={() => {this.setState({audioPreview: element.url.replace("*", "") })}}>
                                            <input type="text" value={element.name} onChange={(e) => {this.updateMedia(e, index, "audio")}} onBlur={() => {this.saveMediaConfig("audio")}} disabled={this.state.saving} />
                                        </span>
                                    </li>)
                            })}                       
                        </ul>
                    </div>
                    <div style={{display: "table-cell", verticalAlign: "middle"}}>
                        <h3>Preview</h3>
                        <audio src={this.state.audioPreview} width="300px" controls />
                    </div>
                </div>
                <div style={{border: "1px solid black"}}>
                    <h3>Add New Audio</h3>
                    <audio src={this.state.uploadAudioDataUrl} width="300px" controls /><br/>
                    <input ref={this.audioDataRef} onChange={(e) => {this.onFileLoaded(e)}} accept=".mp3" type="file" disabled={this.state.addAudioUrl ? true : false} /><br/>
                    <span>or</span><br/>
                    <input ref={this.audioUrlRef} onChange={(e) => {this.onChangeUrl(e, "audio")}} type="text" placeholder="Audio URL" disabled={this.state.uploadAudioDataUrl ? true : false} /><br/>
                    <button onClick={() => {this.storeMedia("audio")}} disabled={this.state.uploadAudioData || this.state.addAudioUrl || this.state.saving ? false : true}>Store Audio</button>
                </div>
                <div style={{display: "table"}}>
                    <div style={{display: "table-cell"}}>
                        <h3>My Video</h3>
                        <ul>
                            { this.state.videoPool.map((element, index) => {
                                return (<li>
                                            <input type="checkbox" onChange={(e) => {this.onDisableMedia(e, "video", index)}} checked={!element.url.startsWith("*")} disabled={this.state.saving}/>
                                            <span className={this.state.videoPreview === element.url  ? "selected" : ""} style={{cursor: "pointer"}} onClick={() => {this.setState({videoPreview: element.url.replace("*", "") })}}>
                                                <input type="text" value={element.name} onChange={(e) => {this.updateMedia(e, index, "video")}} onBlur={() => {this.saveMediaConfig("video")}} disabled={this.state.saving} />
                                            </span>
                                        </li>)
                            })}                        
                        </ul>
                    </div>
                    <div style={{display: "table-cell", verticalAlign: "middle"}}>
                        <h3>Preview</h3>
                        <video src={this.state.videoPreview} width="300px" controls />
                    </div>
                </div>
                <div style={{border: "1px solid black"}}>
                    <h3>Add New Video</h3>
                    <video src={this.state.uploadVideoDataUrl} width="300px" controls /><br/>
                    <input ref={this.videoDataRef} onChange={(e) => {this.onFileLoaded(e)}} accept=".mp4" type="file" disabled={this.state.addVideoUrl ? true : false} /><br/>
                    <span>or</span><br/>
                    <input ref={this.videoUrlRef} onChange={(e) => {this.onChangeUrl(e, "video")}} type="text" placeholder="Video URL" disabled={this.state.uploadVideoDataUrl ? true : false} /><br/>
                    <button onClick={() => {this.storeMedia("video")}} disabled={this.state.uploadVideoData || this.state.addVideoUrl || this.state.saving ? false : true}>Store Video</button>
                </div>
            </div>
        )
    }
}