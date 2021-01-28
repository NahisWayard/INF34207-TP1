import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AddProcess from "./components/AddProcess";
import ProcessList from "./components/ProcessList";
import { Provider } from "react-redux";
import { store } from './store'

function App() {
  return (
      <Provider store={store}>
        <div className="App">
            <AddProcess />
            <ProcessList />
        </div>
      </Provider>
  );
}

export default App;
