import React, { useState, useEffect } from 'react';
import Select from 'react-select';

// props = {
  // setdata
  // nominal
  // ordinal
  // quantitative
// }

const ControlPanel = (props) => {
  const { setdata, nominal, ordinal, quantitative } = props;
  // x-position options & y-position options
  const quantitativeOptions = quantitative.map( d => { return {value: d, label: d} });
  // color options
  const ordinalOptions = ordinal.map( d => { return {value: d, label: d} });
  const nominalOptions = nominal.map( d => { return {value: d, label: d} });
  const colorOptions = [{value:"none", label:"none"}].concat(ordinalOptions,nominalOptions);
  // Opacity & Size options
  const opacityOptions = [{value:"none", label:"none"}].concat(quantitativeOptions);
  // search state
  const [xPosition, setXPosition] = useState("imdb_rating");
  const [yPosition, setYPosition] = useState("us_gross");
  const [color, setColor] = useState("none");
  const [opacity, setOpacity] = useState("none");
  const [size, setSize] = useState("none");
  // selecthandle
  const xSelector = (selectedOption) => {
    const {value} = selectedOption;
    setXPosition(value);
  };
  const ySelector = (selectedOption) => {
    const {value} = selectedOption;
    setYPosition(value);
  };
  const colorSelector = (selectedOption) => {
    const {value} = selectedOption;
    setColor(value);
  }
  const opacitySelector = (selectedOption) => {
    const {value} = selectedOption;
    setOpacity(value);
  }
  const sizeSelector = (selectedOption) => {
    const {value} = selectedOption;
    setSize(value);
  }

  //setdata
  useEffect(() => {
    setdata({
      xPosition: xPosition,
      yPosition: yPosition,
      color: color,
      opacity: opacity,
      size: size
    });
  }, [xPosition,yPosition,color,opacity,size]);

  return(
    <>
    <div className='ControlPanel'>
    <div className='ControlPanelItem'>
        <span style={{marginRight:'10px'}}>{"x: "}</span>
        <Select
        defaultValue={quantitativeOptions[4]}
        options={quantitativeOptions}
        onChange={xSelector}
        />
      </div>
      <div className='ControlPanelItem'>
        <span style={{marginRight:'10px'}}>{"y: "}</span>
        <Select
        defaultValue={quantitativeOptions[1]}
        options={quantitativeOptions}
        onChange={ySelector}
        />
      </div>
      <div className='ControlPanelItem'>
        <span style={{marginRight:'10px'}}>{"Color: "}</span>
        <Select
        defaultValue={colorOptions[0]}
        options={colorOptions}
        onChange={colorSelector}
        />
      </div>
      <div className='ControlPanelItem'>
        <span style={{marginRight:'10px'}}>{"Opacity: "}</span>
        <Select
        defaultValue={opacityOptions[0]}
        options={opacityOptions}
        onChange={opacitySelector}
        />
      </div>
      <div className='ControlPanelItem'>
        <span style={{marginRight:'10px'}}>{"Size: "}</span>
        <Select
        defaultValue={opacityOptions[0]}
        options={opacityOptions}
        onChange={sizeSelector}
        />
      </div>
    </div>
      </>
      )
};
export default ControlPanel;