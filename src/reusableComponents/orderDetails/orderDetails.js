import styles from "./orderDetails.module.css";

const OrderCard = ({ image_url, title, short_description, price = 0, subTotal = 0, qty = 0, total = 0 }) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.informacionDeProducto}>
        <img className={styles.productImg} src={image_url} alt={title} />
        <div className={styles.textoContainer}>
          <h2 className={styles.productTitle}>{title}</h2>
          <p className={styles.productDescription}>{short_description}</p>
          <p className={styles.priceTag}>
            <span className={styles.strikePrice}>${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
            <strong> ${subTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</strong>
          </p>
          <p className={styles.priceSubTotal}>
            Total {qty > 1 ? `from ${qty} products ` : " "} ${total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
