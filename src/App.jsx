import "./constants/colors.css";
import "../src/base/commons.css";

import Home from "./pages/Home";
import CursorBall from "./components/Cursor/CursorBall";

import './App.css';

const App = () => {
  return (
    <div className="App">
      <Home />
      <CursorBall />
    </div>
  );
}

export default App;
