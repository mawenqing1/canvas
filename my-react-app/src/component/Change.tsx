import React, { useContext } from 'react';
import { ContextData } from "../canvasPublic/initData";

function Change(): JSX.Element {
    const { state, dispatch } = useContext<any>(ContextData);

    return (
        <header className="Change">
      {/* 颜色更改模块 */}
      <div id="ys" >
        <input onChange={(e) => {dispatch({type:'changeColor',
      value: e.target.value})}} id="input" type="text" placeholder="请输入要改变的颜色" />
        <button type="submit" >更改</button>
      </div>

      {/* 图片缩放模块 */}
      <div id="sf">
        <span>图片缩放</span>
        <input onChange={(e) => {dispatch({type:'changeTypes',value: e.target.value})}} type="range" id="scale-range" min={0.0} max={2.0} step={0.01 }defaultValue={1} />
      </div>
      {/* 增加透明度 */}
      <div id="transparency">
        <span>更改透明度</span>
        <input onChange={(e) => {dispatch({type:'changeTransparency',value: e.target.value})}} type="range" id="tp-range" min={0.0} max={1.0} step={0.1} defaultValue={1} />
      </div>
    </header>
    )
}

export default Change