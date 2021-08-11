import React, { useContext }  from 'react';
import { ContextData } from "../canvasPublic/initData";

function ChangeTextBox() {
  const { state, dispatch } = useContext<any>(ContextData);
  return (
    <div className="ChangeTextBox">
      <ul>
        <li>
          <p>文本对齐选项</p>
          <select onChange={(e) => dispatch({type:'changeTexts',value:e.target.value})}>
            <option value="start">start</option>
            <option value="end">end</option>
            <option value="left">left</option>
            <option value="right">right</option>
            <option value="center">center</option>
          </select>
        </li>
        <li>
          <p>基线对齐选项</p>
          <select onChange={(e) => dispatch({type:'changeBases',value:e.target.value})}>
            <option value="alphabetic">alphabetic</option>
            <option value="top">top</option>
            <option value="hanging">hanging</option>
            <option value="middle">middle</option>
            <option value="ideographic">ideographic</option>
            <option value="bottom">bottom</option>
          </select></li>
        <li>
          <p>文本方向</p>
          <select onChange={(e) => dispatch({type:'changeTextDir',value:e.target.value})}>
            <option value="inherit">inherit</option>
            <option value="ltr">ltr</option>
            <option value="rtl">rtl</option>
          </select>
        </li>
      </ul>
    </div>
  );
}

export default ChangeTextBox;
