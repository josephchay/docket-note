import "./constants/colors.css";
import "../src/base/commons.css";

import Home from "./pages/Home";
import CursorGroup from "./components/Cursor/CursorGroup";

import './App.css';

const App = () => {
  return (
    <div className="App">
      <Home />
      <CursorGroup
        count={ 10 }
      />
    </div>
  );
}

export default App;
