import React, { useContext }  from 'react';
import { ContextData } from "../block";

function ChangeSizeBox() {
  const { state, dispatch } = useContext<any>(ContextData);
  return (
    <div className="ChangeBig">
      <ul>
        <li>
          <p>字号</p>
          <input onChange={(e) => dispatch({type:'changeFontSize',value:e.target.value})} type="text" placeholder="输入数字" />
        </li>
        <li>
          <p>字体</p>
          <select onChange={(e) => dispatch({type:'changeFontStyle',value:e.target.value})}>
            <option value="serif">衬线字体</option>
            <option value="Microsoft YaHei">非衬线字体</option>
          </select>
        </li>
      </ul>
    </div>
  );
}

export default ChangeSizeBox;
