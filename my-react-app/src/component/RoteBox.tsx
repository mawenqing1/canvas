import React, { useContext } from 'react';
import { ContextData } from "../public/initData";

function RoteBox() {
  const { state, dispatch } = useContext<any>(ContextData);
  return (
    <div className="RoteBox">
      <p>旋转</p>
      <input onChange={(e) => {dispatch({type:'ChangeRotate',
      value: e.target.value})}} type="range" defaultValue="0" min="0" max="360" step="1" />
    </div>
  );
}

export default RoteBox;
