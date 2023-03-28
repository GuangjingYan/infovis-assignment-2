import React, { useState, useEffect } from "react";

import movies from "./data/movie.json";
import ControlPanel from "./components/ControlPanel";
import "./App.css";
import Mainplot from "./components/Mainplot";
import TableView from "./components/TableView";


function App() {

  const name = "Guangjing Yan";
  const studentNum = "2020-2XXXX";

  const nominal = ["genre", "creative_type", "source"];
  const ordinal = ["release", "rating"];
  const quantitative = ["budget", "us_gross", "worldwide_gross", "rotten_rating", "imdb_rating", "imdb_votes"];
  
  const width = 500;
  const height = 350;
  const margin = 35;
  const pointSize = 3;
  const maxPointSize = 10;
  // initialize controlpanel data
  const [data, setData] = useState({
    xPosition: "imdb_rating",
    yPosition: "us_gross",
    color: "none",
    opacity: "none",
    size: pointSize
  });
  // initialize brushed dot index
  const [brushedIndex, setBrushedIndex] = useState([]);

  return (
    <div className="App">
      <div style={{display: "flex"}}>
        <h1 style={{marginRight: 10}}>
        {"Assignment #2 /"}
        </h1>
        <h2 style={{marginTop: 25}}>
          {name + " (" + studentNum + ")"}
        </h2>
      </div>
      <div class="ControlPanel">
        <ControlPanel
          setdata = {setData}
          nominal = {nominal}
          ordinal = {ordinal}
          quantitative = {quantitative}
        />
      </div>
      <div className="MainWrapper">
          <Mainplot
            width = {width}
            height = {height}
            margin = {margin}
            pointSize = {pointSize}
            maxPointSize = {maxPointSize}
            data = {data}
            movieData = {movies}
            setBrushedIndex = {setBrushedIndex}
          />
          <TableView
            movieData = {movies}
            brushedIndex = {brushedIndex}
          />
      </div>
      

    </div>
  );
}

export default App;
