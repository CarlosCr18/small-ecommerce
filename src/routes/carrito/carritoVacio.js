import { Link } from "react-router-dom";
import styles from "./crearOrdenCarrito.module.css";

const CarritoVacio = () => {
  return (
    <div className={styles.subTotalContainer}>
      <h1>Your cart is empty</h1>
      <p className={styles.subTotal}>Take a look at the products section and add something to your cart</p>
      <Link to={"/"}>
        <button className={styles.btnIrAProductos}>Go to products</button>
      </Link>
    </div>
  );
};

export default CarritoVacio;
