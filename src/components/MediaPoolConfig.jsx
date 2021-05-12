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
        uploadAudioData: ""
    }

    componentDidMount = async () => {
        let allVideos = await ApiHelper.getAllMedia("mp4");
        let allAudio = await ApiHelper.getAllMedia("mp3");
        let {videoPool, audioPool} = ApiHelper.getBotConfig(this.state.channelId);
        videoPool = videoPool.map((element) => {
            return await ApiHelper.getMediaMetaData(element);
        });
        audioPool = audioPool.map((element) => {
            return await ApiHelper.getMediaMetaData(element);
        });

        this.setState({allVideos, allAudio, videoPool, audioPool});
    }

    onFileLoaded = (e, target) => {

    }

    render() {
        return (
            <div>
                <div style={{display: "table"}}>
                    <div style={{display: "table-cell"}}>
                        <h3>Available Audio</h3>
                        <ul>
                            { this.state.allAudio.map((element) => {
                                return <li>{element.name}<button>Add</button></li>
                            })};
                        </ul>
                    </div>
                    <div style={{display: "table-cell"}}>
                        <h3>My Audio</h3>
                        <ul>
                            { this.state.audioPool.map((element) => {
                                return <li>{element.name}<button>Remove</button></li>
                            })};                        
                        </ul>
                    </div>
                </div>
                <div>
                    <input onChange={(e) => {this.onFileLoaded(e, "audio")}} type="file" />
                    <button>Store Audio</button>
                </div>
                <div style={{display: "table"}}>
                    <div style={{display: "table-cell"}}>
                        <h3>Available Video</h3>
                        <ul>
                            { this.state.allVideo.map((element) => {
                                return <li>{element.name}<button>Add</button></li>
                            })};
                        </ul>
                    </div>
                    <div style={{display: "table-cell"}}>
                        <h3>My Audio</h3>
                        <ul>
                            { this.state.videoPool.map((element) => {
                                return <li>{element.name}<button>Remove</button></li>
                            })};                        
                        </ul>
                    </div>
                </div>
                <div>
                    <input onChange={(e) => {this.onFileLoaded(e, "video")}} type="file" />
                    <button>Store Video</button>
                </div>
            </div>
        )
    }
}