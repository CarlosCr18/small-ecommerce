import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	addItem,
	cartArray,
	deleteItem,
} from "../../../storeReducers/cart/cartSlice";
import QuantitySelector from "../../../reusableComponents/quantitySelector/quantitySelector.js";

const TarjetaDeProducto = ({ arrayDeProducto, styles }) => {
	const enCarrito = useSelector(cartArray).map((element) => element.product_id);
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
	let opcionesDeBotonDeCarrito = "Agregar al carrito";
	if (enCarrito.includes(id)) {
		if (cantidad === 0) {
			clasesDeButtonDeCarrito = `${styles.addToCartButton} ${styles.eliminarDelCarritoBackground}`;
			opcionesDeBotonDeCarrito = "Eliminar del carrito";
		} else {
			opcionesDeBotonDeCarrito = "Actualizar el carrito";
			clasesDeButtonDeCarrito = `${styles.addToCartButton} ${styles.actualizarCarritoBackground}`;
		}
	} else {
		clasesDeButtonDeCarrito = `${styles.addToCartButton} ${styles.agregarAlCarritoBackground}`;
		opcionesDeBotonDeCarrito = "Agregar al carrito";
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
				{(cantidad === 0 && !enCarrito.includes(id)) || isNaN(cantidad)
					? "Ingrese un numero valido"
					: "se actualizo el carrito"}
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
				{saberMas ? "--Saber menos--" : "--Saber mas--"}
			</button>

			<div className={styles.cardPrice}>
				$
				{(arrayDeProducto.price - arrayDeProducto.discount)
					.toString()
					.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
				<span className={styles.cardLastPrice}>
					Precio anterior{" "}
					<s>
						$
						{arrayDeProducto.price
							.toString()
							.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
					</s>
				</span>
			</div>
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
							if (enCarrito.includes(id)) {
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
			</div>
		</div>
	);
};

export default TarjetaDeProducto;
