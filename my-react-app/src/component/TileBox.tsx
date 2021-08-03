import React, { useContext }  from 'react';
import { ContextData } from "../public/block";

function TileBox() {
    const { state, dispatch } = useContext<any>(ContextData);
  return (
    <div className="TileBox">
      <button onClick={() => dispatch({type:'changeTile'})} id="a-btn5">平铺</button>
    </div>
  );
}

export default TileBox;
