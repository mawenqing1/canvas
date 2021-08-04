import React, { useContext } from 'react';
import { ContextData } from "../public/block";

function Block(): JSX.Element {
  const { state, dispatch } = useContext<any>(ContextData);

  const rect = () => {
    dispatch({ type: 'changeState', data: { show: 'rect' } });
    dispatch({ type: 'changeIsShow' })
  };
  const triangle = () => {
    dispatch({ type: 'changeState', data: { show: 'triangle' } }); 
    dispatch({ type: 'changeIsShow' })
  };
  const circle = () => {
    dispatch({ type: 'changeState', data: { show: 'circle' } }); 
    dispatch({ type: 'changeIsShow' })
  };
  const line = () => {
    dispatch({ type: 'changeState', data: { show: 'line' } }); 
    dispatch({ type: 'changeIsShow' })
  };
  const arc = () => {
    dispatch({ type: 'changeState', data: { show: 'arc' } }); 
    dispatch({ type: 'changeIsShow' })
  };
  const qctwo = () => {
    dispatch({ type: 'changeState', data: { show: 'qctwo' } }); 
    dispatch({ type: 'changeIsShow' })
  };
  const qcthree = () => {
    dispatch({ type: 'changeState', data: { show: 'qcthree' } }); 
    dispatch({ type: 'changeIsShow' })
  };
  const img = () => {
    dispatch({ type: 'changeState', data: { show: 'img' } }); 
    dispatch({ type: 'changeIsShow' })
  }
  return (
    <div id="aside" className="Block" >
      <ul>
        <li>
          <button onClick={rect}>绘制矩形</button>
        </li>
        <li>
          <button onClick={triangle}>绘制三角形</button>
        </li>
        <li>
          <button onClick={circle}>绘制圆形</button>
        </li>
        <li>
          <button onClick={line}>绘制线条</button>
        </li>
        <li>
          <button onClick={arc}>绘制圆弧</button>
        </li>
        <li>
          <button onClick={qctwo}>绘制二次贝塞尔曲线</button>
        </li>
        <li>
          <button onClick={qcthree}>绘制三次贝塞尔曲线</button>
        </li>
        <li>
          <input type="file" accept="image/*" id = 'file'  placeholder="选择提交的照片" />
          <button onClick={img} >确认选择/清除图片</button>
        </li>
      </ul>
    </div>
  );
}

export default Block;
