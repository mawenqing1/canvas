import React, { useContext }  from 'react';
import { ContextData } from "../public/initData";

function ChangeLayerBox() {
  const { state, dispatch } = useContext<any>(ContextData);
  return (
    <div className="ChangeLayer">
      <p>图层模式</p>
      <select onChange={(e) => dispatch({type:'changeLayers',value:e.target.value})}>
        <option value="source-over">source-over</option>
        <option value="source-in">source-in</option>
        <option value="source-out">source-out</option>
        <option value="source-atop">source-atop</option>
        <option value="destination-over">destination-over</option>
        <option value="destination-in">destination-in</option>
        <option value="destination-out">destination-out</option>
        <option value="destination-atop">destination-atop</option>
        <option value="lighter">lighter</option>
        <option value="copy">copy</option>
        <option value="xor">xor</option>
        <option value="multiply">multiply</option>
        <option value="screen">screen</option>
        <option value="overlay">overlay</option>
        <option value="darken">darken</option>
        <option value="lighten">lighten</option>
        <option value="color-dodge">color-dodge</option>
        <option value="color-burn">color-burn</option>
        <option value="hard-light">hard-light</option>
        <option value="soft-light">soft-light</option>
        <option value="difference">difference</option>
        <option value="exclusion">exclusion</option>
        <option value="hue">hue</option>
        <option value="saturation">saturation</option>
        <option value="color">color</option>
        <option value="luminosity">luminosity</option>
      </select>
    </div>
  );
}

export default ChangeLayerBox;
