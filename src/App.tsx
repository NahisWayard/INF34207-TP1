import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AddProcess from "./components/AddProcess";
import ProcessList from "./components/ProcessList";
import { Provider } from "react-redux";
import { store } from './store'
import OrchestratorControl from "./components/OrchestratorControl";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
      <Provider store={store}>    
        <div className="App">
          <br />
          <h1 style={{textAlign: "center"}}>INF34207 - Systèmes d'exploitation TP01</h1>
          <p style={{textAlign: "center"}}>Alexandre Nguyen | Lilian Arago </p>
          <OrchestratorControl />
          <AddProcess />
          <ProcessList />
        </div>
        <ToastContainer />
      </Provider>
  );
}

export default App;
