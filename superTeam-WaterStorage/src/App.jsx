import React from 'react';
import './App.css';
import { useState, useEffect } from "react";
import BarChart from "./BarChart"
import MonthPicker from './MonthPicker';
import sendGetRequest from "./request";

function App() {
  // Page layout
  const js = "Water storage in California reservoirs";
  const [visible, setVisible] = useState('hidden');
  
  // Calendar
  const [date, setDate] = useState({month: 4, year: 2022 });
  function yearChange(newYear) {
    let m = date.month;
    setDate({year: newYear, month: m });
  }
  function monthChange(newMonth){
    let y = date.year;
    setDate({month: newMonth, year: y});
  }
  
  // Bar Chart
  const [chartData, setChartData] = useState([]);
  useEffect(requestWaterData, [date]);
  function requestWaterData () {
    (async function () {
      // date.year
      let jsonResp = await sendGetRequest("/getList", date); 
      let newChartData = jsonResp.map((elem) => elem.value);
      setChartData(newChartData);
      console.log("got new water data: " + newChartData);
    }) ();
  };

  // Return Components
  return (
    <main className="App">
      <p className="titleHead">{js}</p>
      <div className="topContent">
        <div className="wordContent">
          <p id="text1">
            California's reservoirs are part of a <a href="https://www.ppic.org/wp-content/uploads/californias-water-storing-water-november-2018.pdf">complex water storage system</a>.  The State has very variable weather, both seasonally and from year-to-year, so storage and water management is essential.  Natural features - the Sierra snowpack and vast underground aquifers - provide more storage capacity,  but reservoirs are the part of the system that people control on a day-to-day basis.  Managing the flow of surface water through rivers and aqueducts, mostly from North to South, reduces flooding and attempts to provide a steady flow of water to cities and farms, and to maintain natural riparian habitats.  Ideally, it also transfers some water from the seasonal snowpack into long-term underground storage.  Finally, hydro-power from the many dams provides carbon-free electricity. 
          </p>
          <p id="text2">
            California's water managers monitor the reservoirs carefully, and the state publishes daily data on reservoir storage. 
          </p>
          <SeeButton val={"See more"} act = {setVisible}/>
        </div>
        <div className="imgContent">
          <img className="img" src="https://cdn.theatlantic.com/thumbor/HYdYHLTb9lHl5ds-IB0URvpSut0=/900x583/media/img/photo/2014/09/dramatic-photos-of-californias-historic-drought/c01_53834006/original.jpg
"/>
Lake Oroville in the 2012-2014 drought. Image credit Justin Sullivan, from The Atlatic article Dramatic Photos of California's Historic Drought.
        </div>
      </div>
      <div className="bottomContent" id = {visible}>
        <div className="table">
           <BarChart chartData={chartData}/>
        </div>

        <div className="bottomLeft" >
          <p className="wordBottom">
            Here's a quick look at some of the data on reservoirs from the <a href="https://cdec.water.ca.gov/index.html">California Data Exchange Center</a>, which consolidates climate and water data from multiple federal and state government agencies, and  electric utilities.  Select a month and year to see storage levels in the eleven largest in-state reservoirs.
          </p>
          <div className="month">
            <div className="monthContent">Change month: </div>
              <MonthPicker  
                // props 
                date = {date}
                yearFun = {yearChange}
                monthFun = {monthChange}
              />
          </div>
        </div> 
      </div>
    </main>
  );
}

{/*用这个方法不知道为什么报错，不能显示按键出来，这样也没法操作下面的文字显示和隐藏*/}
function SeeButton(props){
  const [val, setval] = useState(props.val);

  if(val == "See more"){
    return(
      <button className="seeButton" 
        onClick = {
          function(){
            setval("See less");
            props.act("show");
          }
        }
      >
      {val}
      </button>);
  }
  else{
    return(
      <button className="seeButton" 
        onClick = {
          function(){
            setval("See more");
            props.act('hidden');
          }
        }
      >
      {val}
      </button>);
  }
} 

export default App;