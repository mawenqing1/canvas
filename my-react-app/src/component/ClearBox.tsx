import React, { useContext }  from 'react';
import { ContextData } from "../public/initData";

function ClearBox() {
    const { state, dispatch } = useContext<any>(ContextData);
  return (
    <div className="Clear">
      <button onClick={() => dispatch({type:'changeClear'})}>清空画布</button>
    </div>
  );
}

export default ClearBox;
