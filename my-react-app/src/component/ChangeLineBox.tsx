import React, { useContext }  from 'react';
import { ContextData } from "../canvasPublic/initData";

function ChangeLineBox() {
  const { state, dispatch } = useContext<any>(ContextData);
  return (
    <div className="ChangeLine">
      <ul>
        <li><p>设置线宽</p>
          <input onChange={(e) => dispatch({type:'changeLineWidth',value:e.target.value})} type="text" placeholder="输入数字" /></li>
        <li><p>设置末端样式</p>
          <select onChange={(e) => dispatch({type:'changeType',value:e.target.value})}>
            <option value="butt">方形</option>
            <option value="round">圆形</option>
            <option value="square">区域</option>
          </select></li>
      </ul>
    </div>
  );
}

export default ChangeLineBox;
