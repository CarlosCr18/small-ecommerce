import TarjetaDeProducto from "./tarjetaDeProducto";
import styles from "./productos.module.css";

import { api } from "../../../storeReducers/apiSlice/apiSlice";

const Productos = () => {
	const { data, error, isFetching } = api.useGetListQuery(
		{},
		{
			refetchOnMountOrArgChange: true,
		}
	);
	if (error) {
		return (
			<div className={styles.productosContainer}>
				<h1>There was an error fetching</h1>
			</div>
		);
	}
	if (!isFetching) {
		return (
			<div className={styles.productosContainer}>
				{data.response.map((producto) => (
					<TarjetaDeProducto
						key={producto.id}
						arrayDeProducto={producto}
						styles={styles}
					/>
				))}
			</div>
		);
	}
	return (
		<div className={styles.subTotalContainer}>
			<h1>
				We are looking for products, give us a minute to wake up the server.
			</h1>
		</div>
	);
};

export default Productos;
