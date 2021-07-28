import React, { useContext } from 'react';
import { ContextData } from "../change";

function Change(): JSX.Element {
    const { state, dispatch } = useContext<any>(ContextData);

    return <div>
        <h1>{state.count}</h1>
        <button onClick={() => {
            dispatch({ type: 'add' })
        }}>add</button>
        <button onClick={() => {
            dispatch({ type: 'sub' })
        }}>sub</button>
        <button onClick={() => {
            dispatch({ type: 'change', changeCount: 10 })
        }}>change</button>
        <button onClick={() => {
            dispatch({ type: 'reset' })
        }}>reset</button>
    </div>
}

export default Change