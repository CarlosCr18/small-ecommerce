import "./App.css";
import NavBar from "../../reusableComponents/navigationBar/navigationBar";
import Productos from "./productos/listarProductos";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Productos />
    </div>
  );
}

export default App;
