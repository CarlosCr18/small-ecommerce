import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./routes/productos/App";
import ListaDeOrdenes from "./routes/ordenes/listarOrdenes";
import CrearOrdenCarrito from "./routes/carrito/crearOrdenCarrito";

import reportWebVitals from "./reportWebVitals";
import store from "./reduxStore/store";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/ordenes" element={<ListaDeOrdenes />} />
          <Route path="/carrito" element={<CrearOrdenCarrito />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
