import React from "react";
import QuantitySelector from "../../../reusableComponents/quantitySelector/quantitySelector.js";
import styles from "./listadoDeCarrito.module.css";
import OrderDetals from "../../../reusableComponents/orderDetails/orderDetails";

const ListadoDeCarrito = ({
	arrayDeCarrito,
	useDispatch,
	addItem,
	deleteItem,
}) => {
	const dispatch = useDispatch();
	const [cantidades, setCantidades] = React.useState(
		arrayDeCarrito.map((el) => el.qty)
	);
	const ids = arrayDeCarrito.map((el) => el.product_id);

	const setQtyEnCarrito = (value, id) => {
		if (value === 0) return;
		let index = arrayDeCarrito.findIndex((value) => value.product_id === id);
		let tempCantidades = cantidades.map((cantidad) => cantidad);
		tempCantidades[index] = +value;
		dispatch(
			addItem({
				product_id: id,
				qty: value,
				title: arrayDeCarrito[index]["title"],
				image_url: arrayDeCarrito[index]["image_url"],
				price: arrayDeCarrito[index]["price"],
				short_description: arrayDeCarrito[index]["short_description"],
				sale_count: arrayDeCarrito[index]["sale_count"],
				discount: arrayDeCarrito[index]["discount"],
			})
		);
		setCantidades(tempCantidades);
	};
	return (
		<div className={styles.listadoDeCarrito}>
			{arrayDeCarrito.map((element, index) => {
				return (
					<div key={element.product_id}>
						<OrderDetals
							image_url={element.image_url}
							title={element.title}
							short_description={element.short_description}
							price={element.price}
							subTotal={element.price - element.discount}
							total={(element.price - element.discount) * cantidades[index]}
							qty={cantidades[index]}
							key={element.product_id}
						/>
						<div className={styles.controles}>
							<QuantitySelector
								quantity={cantidades[index]}
								setQuantity={setQtyEnCarrito}
								maxValue={element.sale_count}
								index={ids[index]}
								minValue={1}
							/>
							<button
								className="eliminar"
								onClick={() => {
									setCantidades(
										cantidades.filter((cantidad, i) => i !== index)
									);
									dispatch(deleteItem({ product_id: element.product_id }));
								}}
							>
								Eliminar
							</button>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default ListadoDeCarrito;
