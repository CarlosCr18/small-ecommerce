import TarjetaDeProducto from "./tarjetaDeProducto";
import styles from "./productos.module.css";

import { api } from "../../../storeReducers/apiSlice/apiSlice";

const Productos = () => {
	const { data, error, isLoading, isFetching } = api.useGetListQuery(
		{},
		{
			refetchOnMountOrArgChange: true,
		}
	);
	console.log({ data, error, isLoading, isFetching });
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
	return <div className="spinner"></div>;
};

export default Productos;
