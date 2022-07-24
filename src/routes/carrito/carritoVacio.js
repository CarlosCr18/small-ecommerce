import { Link } from "react-router-dom";
import styles from "./crearOrdenCarrito.module.css";

const CarritoVacio = () => {
  return (
    <div className={styles.subTotalContainer}>
      <h1>Tu Carrito esta vacio</h1>
      <p className={styles.subTotal}>
        Mira la seccion de productos y agrega algo a tu carrito
      </p>
      <Link to={"/"}>
        <button className={styles.btnIrAProductos}>Ir a productos</button>
      </Link>
    </div>
  );
};

export default CarritoVacio;
