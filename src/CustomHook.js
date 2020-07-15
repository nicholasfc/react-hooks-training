import React from "react";
import useArray from "./todoHook";

const App = () => {
    const todos = useArray(["hi there", "sup", "world"]);
    return (
        <div>
            <h3>Todos</h3>
            <button onClick={() => todos.add(Math.random())}>add</button>
            <ul>
                {todos.value.map((todo, i) => (
                    <li key={i}>
                        {todo}
                        {/* <button onClick={() => todos.removeIndex(i)}>
                            delete
                        </button> */}
                    </li>
                ))}
            </ul>
            <button onClick={todos.clear}> clear</button>
        </div>
    );
};

export default App;
