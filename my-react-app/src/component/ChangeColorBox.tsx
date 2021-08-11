import React, { useContext }  from 'react';
import { ContextData } from "../canvasPublic/initData";

function ChangeColorBox() {
  const { state, dispatch } = useContext<any>(ContextData);
  return (
    <div className="ChangeColor">
      <ul>
        <li>
          <p>渐变颜色1：</p>
          <input onChange={(e) => dispatch({type:'start',value:e.target.value})} type="text" placeholder="渐变颜色1" />
        </li>
        <li>
          <p>渐变颜色2：</p>
          <input onChange={(e) => dispatch({type:'end',value:e.target.value})} type="text" placeholder="渐变颜色2" />
        </li>
      </ul>
    </div>
  );
}

export default ChangeColorBox;
