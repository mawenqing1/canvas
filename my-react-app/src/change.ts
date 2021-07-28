import { createContext } from "react";
const initData = { count: 0 };//初始数据

// 派发事件
const reducer = (state:any, action:any) => {
    switch (action.type) {
        case "add":
            return { ...state, count: state.count + 1 }
        case "sub":
            return { ...state, count: state.count - 1 };
        case "change":
            return { ...state, count: action.changeCount };
        case "reset":
            return { ...initData };
        default:
            return state
    }
}

const ContextData = createContext({});

export { initData, reducer, ContextData }