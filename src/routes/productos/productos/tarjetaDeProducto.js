import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	addItem,
	cartArray,
	deleteItem,
} from "../../../storeReducers/cart/cartSlice";
import QuantitySelector from "../../../reusableComponents/quantitySelector/quantitySelector.js";

const TarjetaDeProducto = ({ arrayDeProducto, styles }) => {
	const enCarrito = useSelector(cartArray).map((element) => {
		return { product_id: element.product_id, qty: element.qty };
	});
	const IDsEnCarrito = enCarrito.map((el) => el.product_id);
	const dispatch = useDispatch();
	const [saberMas, setSaberMas] = useState(false);
	const [cantidad, setCantidad] = useState(0);
	const id = parseInt(arrayDeProducto.id);
	const description = saberMas
		? arrayDeProducto.description
		: arrayDeProducto.short_description;
	let dialogDeAlertaRef = useRef();
	useEffect(() => {
		dialogDeAlertaRef.current = document.getElementById("dialogMensaje" + id);
	}, [id]);
	const mostrarMensajeDeAlerta = () => {
		if (cantidad === 0 && enCarrito.includes(id)) return;
		dialogDeAlertaRef.current.show();
		setTimeout(() => {
			dialogDeAlertaRef.current.close();
		}, 1500);
	};
	let clasesDeButtonDeCarrito = styles.addToCartButton;
	let opcionesDeBotonDeCarrito = "Add to cart";
	if (IDsEnCarrito.includes(id)) {
		if (cantidad === 0) {
			clasesDeButtonDeCarrito = `${styles.addToCartButton} ${styles.eliminarDelCarritoBackground}`;
			opcionesDeBotonDeCarrito = "Delete from cart";
		} else {
			opcionesDeBotonDeCarrito = "Update cart";
			clasesDeButtonDeCarrito = `${styles.addToCartButton} ${styles.actualizarCarritoBackground}`;
		}
	} else {
		clasesDeButtonDeCarrito = `${styles.addToCartButton} ${styles.agregarAlCarritoBackground}`;
		opcionesDeBotonDeCarrito = "Add to cart";
	}

	return (
		<div className={styles.cardContainer}>
			<dialog
				className={
					cantidad === 0 || isNaN(cantidad)
						? `${styles.dialogMensaje} ${styles.eliminarDelCarritoBackground}`
						: `${styles.dialogMensaje} ${styles.actualizarCarritoBackground}`
				}
				id={"dialogMensaje" + id}
			>
				{(cantidad === 0 && !IDsEnCarrito.includes(id)) || isNaN(cantidad)
					? "Enter a valid number"
					: "Cart updated"}
			</dialog>
			<img
				loading="lazy"
				src={arrayDeProducto.image_url}
				alt={arrayDeProducto.short_description}
			/>
			<div className={styles.cardTitle}>{arrayDeProducto.title}</div>
			<div className={styles.cardDescription}>{description}</div>
			<button
				className={styles.btnSaberMas}
				onClick={() => {
					setSaberMas(!saberMas);
				}}
			>
				{saberMas ? "--Show less--" : "--Show more--"}
			</button>

			<div className={styles.cardPrice}>
				$
				{(arrayDeProducto.price - arrayDeProducto.discount)
					.toString()
					.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
				<span className={styles.cardLastPrice}>
					Previous price{" "}
					<s>
						$
						{arrayDeProducto.price
							.toString()
							.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
					</s>
				</span>
			</div>
			{arrayDeProducto.sale_count > 0 ? (
				<div className={styles.AddToCartButtons}>
					<QuantitySelector
						quantity={cantidad}
						setQuantity={setCantidad}
						maxValue={arrayDeProducto.sale_count}
					/>

					<button
						aria-label="Agregar al carrito"
						className={clasesDeButtonDeCarrito}
						onClick={() => {
							mostrarMensajeDeAlerta();
							if (isNaN(cantidad)) {
								return;
							}
							if (cantidad === 0) {
								if (IDsEnCarrito.includes(id)) {
									dispatch(deleteItem({ product_id: id }));
								}
								return;
							} else {
								dispatch(
									addItem({
										product_id: id,
										qty: cantidad,
										title: arrayDeProducto["title"],
										image_url: arrayDeProducto["image_url"],
										price: arrayDeProducto.price,
										short_description: arrayDeProducto["short_description"],
										sale_count: arrayDeProducto["sale_count"],
										discount: arrayDeProducto.discount,
									})
								);
							}
						}}
					>
						{opcionesDeBotonDeCarrito}
					</button>

					<p className={styles.enCarrito}>
						{enCarrito
							.map((el) => {
								if (el.product_id === id) {
									return el.qty;
								}
								return "";
							})
							.join("")
							.trim()
							? " Items like this in your cart: " +
							  enCarrito
									.map((el) => {
										if (el.product_id === id) {
											return el.qty;
										}
										return "";
									})
									.join("")
									.trim()
							: null}
					</p>
				</div>
			) : (
				<h2>Sold out</h2>
			)}
		</div>
	);
};

export default TarjetaDeProducto;
