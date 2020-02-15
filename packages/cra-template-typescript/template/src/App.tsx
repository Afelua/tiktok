import React from 'react';
import axios from 'axios';
import InputFiles from 'react-input-files';
import './App.css';


const getVideo = () =>{
  axios.post('http://192.168.108.26:8080/')
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
function App() {
  return (
    <div className="App">
      <header className="App-header">
          <InputFiles onChange={files => console.log(files)}>
              <button>Upload</button>
          </InputFiles>;
      </header>
    </div>
  );
}

export default App;
