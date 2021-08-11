import React, { useContext }  from 'react';
import { ContextData } from "../canvasPublic/initData";

function TextBox() {
    const { state, dispatch } = useContext<any>(ContextData);
  return (
    <div className="Texts">
      <input onChange={(e) => dispatch({type:'changeText',value:e.target.value}) } type="text" placeholder="输入想要添加的文字" />
    </div>
  );
}

export default TextBox;