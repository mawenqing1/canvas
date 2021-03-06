import React, { useContext }  from 'react';
import { ContextData } from "../canvasPublic/initData";

function ShadowBox() {
    const { state, dispatch } = useContext<any>(ContextData);
  return (
    <div className="ShadowBox">
      <button onClick={() => dispatch({type:'shadowBox'})}>添加阴影</button>
    </div>
  );
}

export default ShadowBox;
