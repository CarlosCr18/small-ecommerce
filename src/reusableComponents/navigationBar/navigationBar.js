import styles from "./navigation.module.css";
import { useSelector } from "react-redux";
import { cartArray } from "../../storeReducers/cart/cartSlice";
import { Link } from "react-router-dom";

export default function NavBar() {
	const enCarrito = useSelector(cartArray).map((element) => element.id).length;
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
						Cart
						{enCarrito > 0 ? (
							<div className={styles.cantidadEnCarrito}>{enCarrito}</div>
						) : (
							<></>
						)}
					</Link>
				</div>
			</div>
		</nav>
	);
}
