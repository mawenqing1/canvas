import React, { useContext }  from 'react';
import { ContextData } from "../public/initData";

function ChangeShadowBox() {
    const { state, dispatch } = useContext<any>(ContextData);
  return (
    <div className="ChangeBox">
      <ul>
        <li><input onChange={(e) => dispatch({type:'shadowOffX',value:e.target.value})} type="text" placeholder="横向阴影" /></li>
        <li><input onChange={(e) => dispatch({type:'shadowOffY',value:e.target.value})} type="text" placeholder="纵向阴影" /></li>
        <li><input onChange={(e) => dispatch({type:'shadowBlur',value:e.target.value})} type="text" placeholder="模糊程度" /></li>
        <li><input onChange={(e) => dispatch({type:'shadowColor',value:e.target.value})} type="text" placeholder="阴影颜色" /></li>
      </ul>
    </div>
  );
}

export default ChangeShadowBox;
