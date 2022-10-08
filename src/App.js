import React from "react";
import Navigation from "./Navigation/Navigation";
import { connect } from 'react-redux';
import { getFirestore } from "firebase/firestore";
// import './App.css'
import './Story.css';

function App() {
  return (
    <div className="App">
      <section className="App-header">
        <Navigation />
      </section>
    </div>
  );
}



export default App;
