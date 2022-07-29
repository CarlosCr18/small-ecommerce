import React from "react";
import OrderDetals from "../../../reusableComponents/orderDetails/orderDetails";

const CardOrden = ({ orden, styles, detallesDeOrden = [] }) => {
	return (
		<div className={styles.cardOrdenContainer}>
			<h3>Order receipt</h3>
			<div className={styles.gridContainer}>
				<div className={styles.gridElementWelcome}>
					Hello user <strong>{orden.user_id}</strong>. This is your order ID:{" "}
					<strong>{orden.id}</strong>
				</div>
				<hr></hr>
				<div className={styles.gridElementInfo}>
					<div className={styles.gridElement}>
						<p>Order's date</p>
						<p>
							<strong>{orden.last_update.split(" ")[0]}</strong>
						</p>
					</div>
					<div className={styles.gridElement}>
						<p>Order's number</p>
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
						<p>Discount</p>
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
						<p>User information:</p>
						<div className={styles.gridElement}>
							<p>User</p>
							<p>
								<strong>{orden.user_id}</strong>
							</p>
						</div>
						<div className={styles.gridElement}>
							<p>Phone</p>
							<p>
								<strong>{orden.phone}</strong>
							</p>
						</div>
						<div className={styles.gridElement}>
							<p>Street</p>
							<p>
								{" "}
								<strong>{orden.street_name}</strong>
							</p>
						</div>
						<div className={styles.gridElement}>
							<p>Address</p>
							<p>
								<strong>{orden.address}</strong>
							</p>
						</div>
						<div className={styles.gridElement}>
							<p>City</p>
							<p>
								<strong>{orden.city}</strong>
							</p>
						</div>
						<div className={styles.gridElement}>
							<p>State</p>
							<p>
								<strong>{orden.state}</strong>
							</p>
						</div>
						<div className={styles.gridElement}>
							<p>zip code</p>
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
