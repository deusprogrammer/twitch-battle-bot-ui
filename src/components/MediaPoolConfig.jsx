import React from 'react';
import ApiHelper from '../utils/ApiHelper';
import config from '../config/config';

export default class MediaPoolConfig extends React.Component {
    state = {
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
        uploadAudioFileName: ""
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

        mediaPool[index] = (e.target.value ? "*" : "") + mediaPool[index].replace("*", "");

        try {
            if (type === "audio") {
                this.setState({audioPool: mediaPool});
                await ApiHelper.updateBotMediaPool(this.state.channelId, "audio", mediaPool);
            } else if (type === "video") {
                this.setState({videoPool: mediaPool});
                await ApiHelper.updateBotMediaPool(this.state.channelId, "video", mediaPool);
            } else {
                return;
            }
        } catch(e) {
            console.error(e);
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

        if (!this.state.addAudioUrl && !this.state.addVideoUrl) {
            try {
                let {_id} = await ApiHelper.storeMedia(mediaData);
                mediaPool.push(`${config.MEDIA_SERVER_URL}/media/${_id}`);
            } catch (e) {
                console.error(e);
            }
        } else {
            try {
                mediaPool.push(mediaUrl);
            } catch (e) {
                console.error(e);
            }
        }

        try {
            await ApiHelper.updateBotMediaPool(this.state.channelId, type, mediaPool);
        } catch (e) {
            console.error(e);
        }

        this.setState({uploadAudioData: "", uploadAudioDataUrl: "", uploadAudioFileName: "", uploadVideoData: "", uploadVideoDataUrl: "", uploadVideoFileName: ""});
        this.loadMediaData();
    }

    render() {
        return (
            <div>
                <div style={{display: "table"}}>
                    <div style={{display: "table-cell"}}>
                        <h3>My Audio</h3>
                        <ul>
                            { this.state.audioPool.map((element, index) => {
                                return <li><input type="checkbox" onChange={(e) => {this.onDisableMedia(e, "audio", index)}} checked={!element.startsWith("*")}/>{element.replace("*", "")}</li>
                            })}                       
                        </ul>
                    </div>
                </div>
                <div>
                    <audio src={this.state.uploadAudioDataUrl} width="300px" controls /><br/>
                    <input onChange={(e) => {this.onFileLoaded(e)}} accept=".mp3" type="file" disabled={this.state.addAudioUrl ? true : false} /><br/>
                    <span>or</span><br/>
                    <input onChange={(e) => {this.onChangeUrl(e, "audio")}} type="text" placeholder="Audio URL" disabled={this.state.uploadAudioDataUrl ? true : false} /><br/>
                    <button onClick={() => {this.storeMedia("audio")}} disabled={this.state.uploadAudioData || this.state.addAudioUrl ? false : true}>Store Audio</button>
                </div>
                <div style={{display: "table"}}>
                    <div style={{display: "table-cell"}}>
                        <h3>My Video</h3>
                        <ul>
                            { this.state.videoPool.map((element, index) => {
                                return <li><input type="checkbox" onChange={(e) => {this.onDisableMedia(e, "video", index)}} checked={!element.startsWith("*")}/>{element.replace("*", "")}</li>
                            })}                        
                        </ul>
                    </div>
                </div>
                <div>
                    <video src={this.state.uploadVideoDataUrl} width="300px" controls /><br/>
                    <input onChange={(e) => {this.onFileLoaded(e)}} accept=".mp4" type="file" disabled={this.state.addVideoUrl ? true : false} /><br/>
                    <span>or</span><br/>
                    <input onChange={(e) => {this.onChangeUrl(e, "video")}} type="text" placeholder="Video URL" disabled={this.state.uploadVideoDataUrl ? true : false} /><br/>
                    <button onClick={() => {this.storeMedia("video")}} disabled={this.state.uploadVideoData || this.state.addVideoUrl ? false : true}>Store Video</button>
                </div>
            </div>
        )
    }
}