import React from 'react';
import {sendRequest, url} from './constants';
import Dropzone from 'react-dropzone'
import personItem from './public/person.svg';
import movieItem from './public/movie.svg';
import logo from './public/logo.svg';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ClipLoader } from "react-spinners";

import './App.css';

class App extends React.Component {

    state = {
        video: false,
        isLoading: false,
        error: false
    };

    setVideo = (video) => this.setState({
        video,
        isLoading: false
    });

    onDrop = (files) => {
        this.setState({ isLoading: true });
        const file = new FormData();
        files.map((item) => file.append('name', item));
        return sendRequest(file, this.setVideo, (error) => this.setState(error));
    };

    renderVideo(){
        const { video, isLoading } = this.state;
        if (video) {
                return (
                    <>
                        <video width="280" height="500" controls>
                            <source src={url + video} type="video/mp4"/>
                        </video>
                        <CopyToClipboard text={url + video}>
                            <span className="text">Скопировать ссылку</span>
                        </CopyToClipboard>
                    </>
                )
        }
        return (
            <>
                {isLoading ?
                    <span className="loader">
                        <ClipLoader
                            size={80}
                            color="#5C75E6"
                            loading={true}
                        />
                    </span> : <img src={movieItem} className="image" alt=""/>}
                <span className="text">Поделиться</span>
            </>
        )
    }

    renderText(){
        const {error} = this.state;
        if (error) {
            return 'Извините, попробуйте позднее';
        }
        return 'Фотографии успешно загружены, ожидайте';
    }
    render() {
        const {isLoading, error} = this.state;
        return (<div className="app">
            <div className="main">
                <div className="mainContainer">
                    <div className="container">
                        <img src={logo} width="117px" alt=""/>
                        <Dropzone onDrop={acceptedFiles => this.onDrop(acceptedFiles)} multiple>
                            {({getRootProps, getInputProps}) => (
                                    <div {...getRootProps()} className="two-photos">
                                        <div className="two-photos__container">
                                            {isLoading || error ? this.renderText() : <>
                                                <img src={personItem} className="image-small" alt=""/>
                                                <img src={personItem} className="image-small" alt=""/>
                                            </>}

                                        </div>
                                        <input {...getInputProps()} />
                                        <span className="text">Загрузить 2 фотографии</span>
                                    </div>
                            )}
                        </Dropzone>
                    </div>
                    <div className="container container_video">
                        {this.renderVideo()}
                    </div>
                </div>
            </div>
        </div>)
    }
}

export default App;
