import React from "react";
import { createRoot } from "react-dom/client";
import Parent from "./components/Parent/index.jsx";
import Child from "./components/Child/index.jsx";

const domNode = document.getElementById("app");
const root = createRoot(domNode);

const App = () => (
  <div>
    <h1>
      Hello, HTTPS World!!!!
      <Parent />
      <Child />
    </h1>
  </div>
);

root.render(<App />);
