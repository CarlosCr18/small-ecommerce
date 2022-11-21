import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, cartArray, deleteItem, clearItems } from "../../storeReducers/cart/cartSlice";
import CarritoVacio from "./carritoVacio";
import NavBar from "../../reusableComponents/navigationBar/navigationBar";
import ListadoDeCarrito from "./componentes/listadoDeCarrito";
import styles from "./crearOrdenCarrito.module.css";
import OrdenForm from "./componentes/ordenForm";

const CrearOrdenCarrito = () => {
  const enCarrito = useSelector(cartArray);
  const product_list = enCarrito.map((elemento) => {
    return { product_id: elemento.product_id, qty: elemento.qty };
  });
  const preciosEnCarrito = enCarrito.map((element) => (element.price - element.discount) * element.qty);
  const subTotal = enCarrito.length === 0 ? 0 : preciosEnCarrito.reduce((acc, value) => value + acc);

  const modal = React.useRef();
  React.useEffect(() => {
    modal.current = document.getElementById("ordenDialog");
  }, []);

  const mostrarForm = () => {
    modal.current.showModal();
  };
  const ocultarForm = () => {
    modal.current.close();
  };
  return (
    <div className={styles.crearOrdenContainer}>
      <NavBar />
      <dialog className={styles.ordenDialog} id="ordenDialog">
        <OrdenForm
          product_list={product_list}
          ocultarForm={ocultarForm}
          useDispatch={useDispatch}
          clearItems={clearItems}
        />
      </dialog>
      {enCarrito.length === 0 ? (
        <CarritoVacio />
      ) : (
        <>
          <div className={styles.subTotalContainer}>
            <p className={styles.subTotal}>
              Subtotal <strong>${subTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</strong>
            </p>
            <button
              className={styles.btnCrearOrden}
              onClick={() => {
                mostrarForm();
              }}>
              Create new order
            </button>
          </div>
          <ListadoDeCarrito
            arrayDeCarrito={enCarrito}
            useDispatch={useDispatch}
            addItem={addItem}
            deleteItem={deleteItem}
          />
        </>
      )}
    </div>
  );
};

export default CrearOrdenCarrito;
