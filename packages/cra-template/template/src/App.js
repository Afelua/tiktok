import React from 'react';
import {sendRequest, url} from './constants';
import Dropzone from 'react-dropzone'
import personItem from './public/person.svg';
import movieItem from './public/movie.svg';
import './App.css';

class App extends React.Component {

    state = {
        video: false,
    };

    setVideo = (video) => this.setState({
        video
    });

    onDrop = (files) => {
        const file = new FormData();
        files.map((item) => file.append('name', item));
        return sendRequest(file, this.setVideo, (error) => console.log(error));
    };

    renderVideo(){
        const { video } = this.state;
        console.log(url + video);
        if (video) {
                return (
                    <video width="280" height="500" controls>
                        <source src={url + video} type="video/mp4"/>
                    </video>)
        }
        return (
            <div>
                <img src={movieItem} className="image"/>
                <span className="text">Поделиться</span>
            </div>
        )
    }
    render() {
        return (<div className="app">
            <div className="main">
                <div className="mainContainer">
                    <Dropzone onDrop={acceptedFiles => this.onDrop(acceptedFiles)} multiple>
                        {({getRootProps, getInputProps}) => (
                            <div className="container">
                                <div {...getRootProps()}>
                                    <img src={personItem} className="image"/>
                                    <input {...getInputProps()} />
                                    <span className="text">Загрузить фотографию</span>
                                </div>
                            </div>
                        )}
                    </Dropzone>
                    <div className="container">
                        {this.renderVideo()}
                    </div>
                </div>
            </div>
        </div>)
    }
}

export default App;
