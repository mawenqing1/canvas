import React, { useContext }  from 'react';
import { ContextData } from "../block";

function ShapeBox() {
  const { state, dispatch } = useContext<any>(ContextData);
  return (
    <div className="ChangeShape">
      <ul>
        <li>
          <p>切片X</p>
          <input onChange={(e) => dispatch({type:'changeShapeOffX',value:e.target.value})} type="range" step="0.1" min="1" max="10" defaultValue='10' />
        </li>
        <li>
          <p>切片Y</p>
          <input onChange={(e) => dispatch({type:'changeShapeOffY',value:e.target.value})} type="range" step="0.1" min="1" max="10" defaultValue='10' />
        </li>
        <li>
          <p>原点坐标X</p>
          <input onChange={(e) => dispatch({type:'changePointX',value:e.target.value})} type="range" step="0.5" min="0" max="5" defaultValue='0' />
        </li>
        <li>
          <p>原点坐标Y</p>
          <input onChange={(e) => dispatch({type:'changePointY',value:e.target.value})} type="range" step="0.5" min="0" max="5" defaultValue='0' />
        </li>
      </ul>
    </div>
  );
}

export default ShapeBox;
