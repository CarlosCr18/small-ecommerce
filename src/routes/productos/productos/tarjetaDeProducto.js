import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, cartArray, deleteItem } from "../../../storeReducers/cart/cartSlice";
import QuantitySelector from "../../../reusableComponents/quantitySelector/quantitySelector.js";
import { toast } from "react-hot-toast";

const TarjetaDeProducto = ({ arrayDeProducto, styles }) => {
  const enCarrito = useSelector(cartArray);
  const [filteredCard, setFilteredCard] = useState([]);
  const dispatch = useDispatch();
  const [saberMas, setSaberMas] = useState(false);
  const [cantidad, setCantidad] = useState(0);
  const [buttonClass, setButtonClass] = useState(`${styles.addToCartButton} ${styles.agregarAlCarritoBackground}`);
  const [buttonText, setButtonText] = useState("Add to cart");
  const id = useRef(parseInt(arrayDeProducto.id));
  const description = saberMas ? arrayDeProducto.description : arrayDeProducto.short_description;

  useEffect(() => {
    if (filteredCard.qty) {
      if (filteredCard.qty === 0) {
        setButtonClass(styles.addToCartButton + " " + styles.agregarAlCarritoBackground);
        setButtonText("Add to cart");
      } else if (filteredCard.qty > 0) {
        if (cantidad === 0) {
          setButtonClass(styles.addToCartButton + " " + styles.eliminarDelCarritoBackground);
          setButtonText("Delete from cart");
        } else {
          setButtonClass(styles.addToCartButton + " " + styles.actualizarCarritoBackground);
          setButtonText("Update cart");
        }
      }
    } else {
      setButtonClass(styles.addToCartButton + " " + styles.agregarAlCarritoBackground);
      setButtonText("Add to cart");
    }
  }, [filteredCard, cantidad, styles]);

  useEffect(() => {
    let filteredCard = enCarrito.filter((element) => element.product_id === id.current);
    setFilteredCard(filteredCard.length > 0 ? filteredCard[0] : []);
  }, [enCarrito]);

  const handleBtnAction = () => {
    if (isNaN(cantidad) || (cantidad === 0 && !filteredCard.qty)) {
      toast.dismiss();
      toast.error("Invalid number", { duration: 1000, position: "bottom-center", style: { marginBottom: "2rem" } });
      return;
    }
    if (cantidad === 0) {
      if (filteredCard.qty > 0) {
        toast.error(`Deleted ${filteredCard.title} from cart`, {
          duration: 1000,
          position: "bottom-center",
          style: { marginBottom: "2rem" },
        });
        dispatch(deleteItem({ product_id: id.current }));
        setFilteredCard([]);
      }
    } else {
      if (filteredCard.qty !== cantidad) {
        if (filteredCard.qty > 0) {
          toast.success(`Updated ${arrayDeProducto.title} in cart`, {
            duration: 1250,
            position: "bottom-center",
            style: { marginBottom: "2rem" },
          });
        } else {
          toast.success(`Added ${arrayDeProducto.title} to cart`, {
            duration: 1250,
            position: "bottom-center",
            style: { marginBottom: "2rem" },
          });
        }
        dispatch(
          addItem({
            product_id: id.current,
            qty: cantidad,
            title: arrayDeProducto["title"],
            image_url: arrayDeProducto["image_url"],
            price: arrayDeProducto.price,
            short_description: arrayDeProducto["short_description"],
            sale_count: arrayDeProducto["sale_count"],
            discount: arrayDeProducto.discount,
          })
        );
      } else {
        toast.dismiss();
        toast.success(`Already added ${arrayDeProducto.title} to cart`, {
          duration: 1250,
          position: "bottom-center",
          style: { marginBottom: "2rem" },
        });
      }
    }
  };

  return (
    <div className={styles.cardContainer}>
      <img loading="lazy" src={arrayDeProducto.image_url} alt={arrayDeProducto.short_description} />
      <div className={styles.cardTitle}>{arrayDeProducto.title}</div>
      <div className={styles.cardDescription}>{description}</div>
      <button
        className={styles.btnSaberMas}
        onClick={() => {
          setSaberMas(!saberMas);
        }}>
        {saberMas ? "--Show less--" : "--Show more--"}
      </button>

      <div className={styles.cardPrice}>
        ${(arrayDeProducto.price - arrayDeProducto.discount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        <span className={styles.cardLastPrice}>
          Previous price <s>${arrayDeProducto.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</s>
        </span>
      </div>
      {arrayDeProducto.sale_count > 0 ? (
        <div className={styles.AddToCartButtons}>
          <QuantitySelector quantity={cantidad} setQuantity={setCantidad} maxValue={arrayDeProducto.sale_count} />

          <button aria-label="Agregar al carrito" className={buttonClass} onClick={handleBtnAction}>
            {buttonText}
          </button>

          <p className={styles.enCarrito}>
            {filteredCard.qty > 0 ? " Items like this in your cart: " + filteredCard.qty : null}
          </p>
        </div>
      ) : (
        <h2>Sold out</h2>
      )}
    </div>
  );
};

export default TarjetaDeProducto;
