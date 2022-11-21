import "./App.css";
import NavBar from "../../reusableComponents/navigationBar/navigationBar";
import Productos from "./productos/listarProductos";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Toaster />
      <Productos />
    </div>
  );
}

export default App;
