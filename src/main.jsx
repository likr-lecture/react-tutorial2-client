import "bulma/css/bulma.css";
import { createRoot } from "react-dom/client";
import { App } from "./App.jsx";

createRoot(document.querySelector("#content")).render(<App />);
