import React, { useContext }  from 'react';
import { ContextData } from "../public/block";

function ChangeDashBox() {
  const { state, dispatch } = useContext<any>(ContextData);
  return (
    <div className="ChangeDash">
      <ul>
        <li>
          <p>虚线中实线长度</p>
          <input onChange={(e) => dispatch({type:'changeSolids',value:e.target.value})} type="text" placeholder="请输入数字" />
        </li>
        <li>
          <p>虚线中空白长度</p>
          <input onChange={(e) => dispatch({type:'changeDottdeds',value:e.target.value})} type="text" placeholder="请输入数字" />
        </li>
        <li>
          <p>虚线起始偏移</p>
          <input onChange={(e) => dispatch({type:'changeDeviations',value:e.target.value})} type="text" placeholder="请输入数字" />
        </li>
      </ul>
    </div>
  );
}

export default ChangeDashBox;
