import React, { useContext } from 'react';
import { ContextData } from "../canvasPublic/initData";

function FabricBox() {
  const { state, dispatch } = useContext<any>(ContextData);

  const rect = () => {
    dispatch({ type: 'changeState', data: { show: 'fabricRect' } });
  };
  const circle = () => {
    dispatch({ type: 'changeState', data: { show: 'fabricCircle' } });
  };
  const ploy = () => {
    dispatch({ type: 'changeState', data: { show: 'fabricPloy' } });
  };
  const text = () => {
    dispatch({ type: 'changeState', data: { show: 'fabricText' } });
  };
  const img = () => {
    dispatch({ type: 'changeState', data: { show: 'fabricImg' } });
  };
  return (
    <div className="fabricDraw">
      <button onClick = {rect} >▭</button>
      <button onClick = {circle} >◯</button>
      <button onClick = {ploy} >┌</button>
      <button onClick = {text} >文本</button>
      <button onClick = {img} >图片</button>
      <button id="group">组合</button>
      <button id="ungroup" >拆分</button>
    </div>
  );
}

export default FabricBox;
