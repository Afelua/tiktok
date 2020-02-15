import React from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone'
import './App.css';

const config = {
    headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data; boundary=---WebKitFormBoundary7MA4YWxkTrZu0gW',
    },
};

export const api = axios.create({
    baseURL: 'http://192.168.108.26:8080/f1'
});

const getVideo = (files) => {
    api.post('/', files, config)
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
};

const onDrop = (files) => {
    const file = new FormData();
    files.map((item) => {
        file.append('name', item);
    });
    getVideo(file);
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Dropzone onDrop={acceptedFiles => onDrop(acceptedFiles)} multiple>
              {({getRootProps, getInputProps}) => (
                  <section>
                      <div {...getRootProps()}>
                          <input {...getInputProps()} />
                          <p>Drag 'n' drop some files here, or click to select files</p>
                      </div>
                  </section>
              )}
          </Dropzone>
      </header>
      <div>

      </div>
    </div>
  );
}

export default App;
