import React, { useState, useCallback, useMemo, useEffect } from 'react';

// useCallback


const App = () => {
    const handleClick = useCallback(() => {
      alert("Button clicked!");
    }, []);
  
    return <button onClick={handleClick}>Click Me</button>;
  };

// const Logger = () => {
//     const logMessage = useCallback(() => {
//       console.log("Logging message...");
//     }, []);
  
//     return <button onClick={logMessage}>Log</button>;
//   };
  

// const Child = React.memo(({ onClick }) => {
//     console.log("Child rendered");
//     return <button onClick={onClick}>Click</button>;
//   });
  
//   const Parent = () => {
//     const handleClick = useCallback(() => {
//       alert("Clicked!");
//     }, []);
  
//     return <Child onClick={handleClick} />;
//   };

// import { useState, useCallback } from "react";

// const App = () => {
//   const [text, setText] = useState("");

//   const handleChange = useCallback((e) => {
//     setText(e.target.value);
//   }, []);

//   return <input type="text" onChange={handleChange} value={text} />;
// };

// const FunctionContext = React.createContext();

// const Provider = ({ children }) => {
//   const someFunction = useCallback(() => {
//     console.log("Context function");
//   }, []);

//   return (
//     <FunctionContext.Provider value={someFunction}>
//       {children}
//     </FunctionContext.Provider>
//   );
// };

//////////////useMemo////////////

// const App = ({ number }) => {
//     const doubled = useMemo(() => number * 2, [number]);
  
//     return <div>Doubled: {doubled}</div>;
//   };


// const App = () => {
//     const numbers = [4, 2, 7, 1];
//     const sorted = useMemo(() => [...numbers].sort(), []);
  
//     return <div>{sorted.join(", ")}</div>;
//   };


// const App = ({ search, items }) => {
//     const filteredItems = useMemo(() => {
//       return items.filter((item) => item.includes(search));
//     }, [search, items]);
  
//     return (
//       <ul>
//         {filteredItems.map((item) => (
//           <li key={item}>{item}</li>
//         ))}
//       </ul>
//     );
//   };
  
export default App;