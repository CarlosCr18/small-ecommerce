import React from "react";
import OrderDetals from "../../../reusableComponents/orderDetails/orderDetails";

const CardOrden = ({ orden, styles, detallesDeOrden = [] }) => {
	return (
		<div className={styles.cardOrdenContainer}>
			<h3>Recibo de Orden</h3>
			<div className={styles.gridContainer}>
				<div className={styles.gridElementWelcome}>
					Hola usuario <strong>{orden.user_id}</strong> esta es tu orden id:{" "}
					<strong>{orden.id}</strong>
				</div>
				<hr></hr>
				<div className={styles.gridElementInfo}>
					<div className={styles.gridElement}>
						<p>Fecha de Orden</p>
						<p>
							<strong>{orden.last_update.split(" ")[0]}</strong>
						</p>
					</div>
					<div className={styles.gridElement}>
						<p>Numero de Orden</p>
						<p>
							<strong>{orden.order_code}</strong>
						</p>
					</div>
					<hr></hr>
					<div className={styles.gridElement}>
						<p>Subtotal</p>
						<p>
							{" "}
							<strong>
								$
								{orden.subtotal
									.toString()
									.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
							</strong>
						</p>
					</div>
					<div className={styles.gridElement}>
						<p>Descuento</p>
						<p>
							{" "}
							<strong>
								$
								{orden.discount
									.toString()
									.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
							</strong>
						</p>
					</div>
					<div className={styles.gridElement}>
						<p>Total</p>
						<p>
							{" "}
							<strong>
								${orden.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
							</strong>
						</p>
					</div>
					<hr></hr>

					<div className={styles.gridElementInfo}>
						<p>Los datos asociados con esta orden son:</p>
						<div className={styles.gridElement}>
							<p>Usuario</p>
							<p>
								<strong>{orden.user_id}</strong>
							</p>
						</div>
						<div className={styles.gridElement}>
							<p>telefono</p>
							<p>
								<strong>{orden.phone}</strong>
							</p>
						</div>
						<div className={styles.gridElement}>
							<p>Nombre de la calle</p>
							<p>
								{" "}
								<strong>{orden.street_name}</strong>
							</p>
						</div>
						<div className={styles.gridElement}>
							<p>Direccion</p>
							<p>
								<strong>{orden.address}</strong>
							</p>
						</div>
						<div className={styles.gridElement}>
							<p>ciudad</p>
							<p>
								<strong>{orden.city}</strong>
							</p>
						</div>
						<div className={styles.gridElement}>
							<p>estado</p>
							<p>
								<strong>{orden.state}</strong>
							</p>
						</div>
						<div className={styles.gridElement}>
							<p>Codigo postal</p>
							<p>
								<strong>{orden.zip_code}</strong>
							</p>
						</div>
					</div>
				</div>
			</div>
			{detallesDeOrden.map((element) => {
				return (
					<div key={element.image_url} className={styles.detailsContainer}>
						<OrderDetals
							image_url={element.image_url}
							title={element.title}
							short_description={element.short_description}
							price={element.price}
							subTotal={element.price - element.discount}
							qty={element.qty}
							total={element.total}
						/>
					</div>
				);
			})}
		</div>
	);
};

export default CardOrden;
