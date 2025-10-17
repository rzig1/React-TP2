import React, { useReducer } from 'react';

/* 3) useReducer - état complexe */
const initialReducerState = { count: 0, step: 1 };

function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + state.step };
    case 'DECREMENT':
      return { ...state, count: state.count - state.step };
    case 'SET_STEP':
      return { ...state, step: action.payload };
    case 'RESET':
      return initialReducerState;
    default:
      throw new Error(`Unhandled action: ${action.type}`);
  }
}

export default function UseReducerExample() {
  const [state, dispatch] = useReducer(reducer, initialReducerState);

  return (
    <section className="example-section">
      <h3>3. useReducer — État avec logique centralisée</h3>
      <p className="explain">useReducer est pratique quand la logique de mise à jour devient complexe.</p>

      <div className="card">
        <p style={{ fontWeight: 700 }}>Compteur : {state.count}</p>

        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', alignItems: 'center' }}>
          <button onClick={() => dispatch({ type: 'DECREMENT' })}>➖</button>
          <button onClick={() => dispatch({ type: 'INCREMENT' })}>➕</button>
          <button onClick={() => dispatch({ type: 'RESET' })}> Reset</button>
        </div>

        <div style={{ marginTop: 12 }}>
          <label>
            Step :
            <input
              type="number"
              value={state.step}
              onChange={(e) => dispatch({ type: 'SET_STEP', payload: Number(e.target.value || 1) })}
              style={{ marginLeft: 8, width: 80 }}
            />
          </label>
        </div>
      </div>
    </section>
  );
}
