import React from 'react';
import ApiHelper from '../utils/ApiHelper';

export default class MediaPoolConfig extends React.Component {
    state = {
        channelId: parseInt(window.localStorage.getItem("channel")),
        allVideos: [],
        allAudio: [],
        videoPool: [],
        audioPool: [],
        uploadVideoData: "",
        uploadAudioData: "",
        uploadVideoDataUrl: "",
        uploadAudioDataUrl: "",
        uploadFileName: ""
    }

    componentDidMount = async () => {
        try {
            await this.loadMediaData();
        } catch (e) {
            console.error(e);
        }
    }

    loadMediaData = async () => {
        let allVideos = await ApiHelper.getAllMedia("mp4");
        let allAudio = await ApiHelper.getAllMedia("mp3");
        let {videoPool, audioPool} = await ApiHelper.getBot(this.state.channelId);
        videoPool = videoPool.map(async (element) => {
            return await ApiHelper.getMediaMetaData(element);
        });
        audioPool = audioPool.map(async (element) => {
            return await ApiHelper.getMediaMetaData(element);
        });

        this.setState({allVideos, allAudio, videoPool, audioPool});
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
                this.setState({uploadVideoData: base64Media, uploadVideoDataUrl: fr.result, uploadFileName});
            } else if (ext === "mp3") {
                this.setState({uploadAudioData: base64Media, uploadAudioDataUrl: fr.result, uploadFileName});
            }
        }

        fr.readAsDataURL(file);
    }

    storeMedia = async (type) => {
        let mediaData = {}

        if (type === "audio") {
            mediaData.mimeType = "audio/mp3";
            mediaData.imagePayload = this.state.uploadAudioData;
        } else if (type === "video") {
            mediaData.mimeType = "video/mp4";
            mediaData.imagePayload = this.state.uploadVideoData;
        } else {
            return;
        }

        try {
            await ApiHelper.storeMedia(mediaData);
            this.loadMediaData();
        } catch (e) {
            console.error(e);
        }
    }

    render() {
        return (
            <div>
                <div style={{display: "table"}}>
                    <div style={{display: "table-cell"}}>
                        <h3>Available Audio</h3>
                        <ul>
                            { this.state.allAudio.map((element) => {
                                return <li>{element.title}<button>Add</button></li>
                            })}
                        </ul>
                    </div>
                    <div style={{display: "table-cell"}}>
                        <h3>My Audio</h3>
                        <ul>
                            { this.state.audioPool.map((element) => {
                                return <li>{element.title}<button>Remove</button></li>
                            })}                       
                        </ul>
                    </div>
                </div>
                <div>
                    <audio src={this.state.uploadAudioDataUrl} />
                    <input onChange={(e) => {this.onFileLoaded(e)}} type="file" />
                    <button onClick={() => {this.storeMedia("audio")}} disabled={this.state.uploadAudioData ? false : true}>Store Audio</button>
                </div>
                <div style={{display: "table"}}>
                    <div style={{display: "table-cell"}}>
                        <h3>Available Video</h3>
                        <ul>
                            { this.state.allVideos.map((element) => {
                                return <li>{element.title}<button>Add</button></li>
                            })};
                        </ul>
                    </div>
                    <div style={{display: "table-cell"}}>
                        <h3>My Audio</h3>
                        <ul>
                            { this.state.videoPool.map((element) => {
                                return <li>{element.title}<button>Remove</button></li>
                            })};                        
                        </ul>
                    </div>
                </div>
                <div>
                    <video src={this.state.uploadVideoDataUrl} />
                    <input onChange={(e) => {this.onFileLoaded(e)}} type="file" />
                    <button onClick={() => {this.storeMedia("video")}} disabled={this.state.uploadVideoData ? false : true}>Store Video</button>
                </div>
            </div>
        )
    }
}