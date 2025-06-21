import { useReducer } from 'react';
let initialValue = 0;

const counter=(state, action) => {
    switch (action.type) {
        case 'increment':
            return state + 1;
        case 'decrement':
            if (state > 0) {
            return state - 1;}
            
        case 'reset':
            return 0;
        default:
            return state;
    }
}

const Reducer = () => {
    const [count, dispatch] = useReducer(counter, initialValue);
    return (
        <div>
            <h1>Reducer</h1>
            <h1>Count:{count}</h1>
            <button onClick={() => dispatch({ type: 'increment' })}>+</button>
            <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
            <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
        </div>
    )
}
export default Reducer;