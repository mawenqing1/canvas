import React, { useContext }  from 'react';
import { ContextData } from "../block";

function Block(): JSX.Element {
    const { state, dispatch } = useContext<any>(ContextData);
  return (
    <div id="aside" className="Block" >
      <ul>
        <li>
          <button id="a-btn0" onClick={() => {dispatch({type:'changeState',data:{show:'rect'}}); dispatch({type:'changeIsShow'})}
        }>绘制矩形</button>
        </li>
        <li>
          <button id="a-btn1" onClick={() => {dispatch({type:'changeState',data:{show:'triangle'}}); dispatch({type:'changeIsShow'})}}>绘制三角形</button>
        </li>
        <li>
          <button id="a-btn2" onClick={() => {dispatch({type:'changeState',data:{show:'circle'}}); dispatch({type:'changeIsShow'})}}>绘制圆形</button>
        </li>
        <li>
          <button onClick={() => {dispatch({type:'changeState',data:{show:'line'}}); dispatch({type:'changeIsShow'})}}>绘制线条</button>
        </li>
        <li>
          <button onClick={() => {dispatch({type:'changeState',data:{show:'arc'}}); dispatch({type:'changeIsShow'})}}>绘制圆弧</button>
        </li>
        <li>
          <button onClick={() => {dispatch({type:'changeState',data:{show:'qctwo'}}); dispatch({type:'changeIsShow'})}}>绘制二次贝塞尔曲线</button>
        </li>
        <li>
          <button onClick={() => {dispatch({type:'changeState',data:{show:'qcthree'}}); dispatch({type:'changeIsShow'})}}>绘制三次贝塞尔曲线</button>
        </li>
        <li>
          <input type="file" accept="image/*" id="file" placeholder="选择提交的照片" />
          <button onClick={() => {dispatch({type:'changeState',data:{show:'img'}}); dispatch({type:'changeIsShow'})}} id="a-btn3">确认选择/清除图片</button>
        </li>
      </ul>
    </div>
  );
}

export default Block;
