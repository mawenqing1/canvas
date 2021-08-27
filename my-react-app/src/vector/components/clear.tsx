import React from 'react';

function Clear() {
  const clear = () => {
    const canvas = document.getElementById('vecCanvas');
    const gl = canvas!.getContext('webgl');
    gl.clearColor(1.0, 1.0, 1.0, 1.0)
    gl.clear(gl.COLOR_BUFFER_BIT);
  }
  return (
    <div>
      <button onClick={()=>{clear()}}>清空画布</button>
    </div>
  );
}

export default Clear;
