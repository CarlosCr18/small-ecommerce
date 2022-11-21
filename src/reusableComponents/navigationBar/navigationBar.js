import styles from "./navigation.module.css";
import { useSelector } from "react-redux";
import { cartArray } from "../../storeReducers/cart/cartSlice";
import { Link } from "react-router-dom";
import { BsCart } from "react-icons/bs";

export default function NavBar() {
  const enCarrito = useSelector(cartArray).reduce((accum, curr) => {
    return (accum += parseInt(curr.qty));
  }, 0);
  return (
    <nav className={styles.nav}>
      <div className={styles.linksContainer}>
        <div className={styles.link}>
          <Link to={"/"}>Products</Link>
        </div>
        <div className={styles.link}>
          <Link to={"/ordenes"}>Orders</Link>
        </div>
        <div className={`${styles.link}  ${styles.carrito}`}>
          <Link to={"/carrito"}>
            <span>Cart </span>
            <span className={`${styles.cartIcon}`}>
              <BsCart />
            </span>
            {
              <>
                <div className={styles.cantidadEnCarrito}>{enCarrito}</div>
              </>
            }
          </Link>
        </div>
      </div>
    </nav>
  );
}
