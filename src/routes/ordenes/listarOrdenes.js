import React, { useState, useEffect } from "react";
import NavBar from "../../reusableComponents/navigationBar/navigationBar";
import styles from "./listarOrdenes.module.css";
import CardOrden from "./cardOrden/cardOrden";
import { Link } from "react-router-dom";
import { api } from "../../storeReducers/apiSlice/apiSlice";

const ListaDeOrdenes = () => {
	// const [buscandoDetalles, setBuscandoDetalles] = useState(false);
	// const [detallesDeOrden, setDetallesDeOrden] = useState();
	const [numeroDeOrden, setNumeroDeOrden] = useState(0);
	const [detallesFetched, setDetallesFetched] = useState(false);
	const [buscarDetallesHook, { data: detallesDeOrden }] =
		api.useGetOrderDetailMutation();

	useEffect(() => {
		setDetallesFetched(false);
	}, [numeroDeOrden]);
	const {
		data: listaDeOrdenes,
		error: errorListaDeOrdenes,
		isFetching: buscandoListaDeOrdenes,
	} = api.useGetOrdersQuery(
		{},
		{
			refetchOnMountOrArgChange: true,
		}
	);

	const buscarDetalles = async () => {
		buscarDetallesHook({
			order_id: listaDeOrdenes.response[numeroDeOrden].id,
		});
		setDetallesFetched(true);
	};

	if (errorListaDeOrdenes) {
		return (
			<div className={styles.subTotalContainer}>
				<NavBar />
				<h1>
					<br />
				</h1>
				<h1>There was an error processing your request</h1>
				<Link to={"/"}>
					<button className={styles.btnIrAProductos}>Go to products</button>
				</Link>
			</div>
		);
	}

	if (buscandoListaDeOrdenes) {
		return (
			<div className={styles.subTotalContainer}>
				<NavBar />
				<h1>
					<br />
				</h1>
				<h3>We are searching your past orders</h3>
				<p className={styles.subTotal}>It will not take long</p>
				<Link to={"/"}>
					<button className={styles.btnIrAProductos}>Go to products</button>
				</Link>
			</div>
		);
	}

	if (listaDeOrdenes.response.length === 0) {
		return (
			<div className={styles.subTotalContainer}>
				<NavBar />
				<h1>
					<br />
				</h1>
				<h1>Your order history is empty</h1>
				<p className={styles.subTotal}>
					Take a look at the products list and add something to your cart
				</p>
				<Link to={"/"}>
					<button className={styles.btnIrAProductos}>Go to products</button>
				</Link>
			</div>
		);
	}

	return (
		<div className={styles.listaDeOrdenesContainer}>
			<NavBar />
			{!buscandoListaDeOrdenes ? (
				<div className={styles.ordenActual}>
					<h1>Orders history</h1>
					<div className={styles.controlDeOrden}>
						<h2>Order number</h2>
						<div className={styles.numeroDeOrden}>
							{numeroDeOrden > 0 && (
								<button
									onClick={() => {
										setNumeroDeOrden(numeroDeOrden - 1);
									}}
								>
									-
								</button>
							)}
							<p>
								{numeroDeOrden + 1 + " / " + listaDeOrdenes.response.length}
							</p>
							{numeroDeOrden < listaDeOrdenes.response.length - 1 && (
								<button
									onClick={() => {
										setNumeroDeOrden(numeroDeOrden + 1);
									}}
								>
									+
								</button>
							)}
						</div>
					</div>

					<h2>Order's products</h2>
					<CardOrden
						orden={listaDeOrdenes.response[numeroDeOrden]}
						styles={styles}
						detallesDeOrden={
							detallesDeOrden && detallesFetched ? detallesDeOrden.response : []
						}
					/>

					{!detallesFetched && (
						<button
							className={styles.btnMostrarMasDetalles}
							onClick={() => {
								buscarDetalles();
								// setBuscandoDetalles(true);
							}}
						>
							Show more details
						</button>
					)}
				</div>
			) : (
				<h2>Loading orders...</h2>
			)}
		</div>
	);
};

export default ListaDeOrdenes;
