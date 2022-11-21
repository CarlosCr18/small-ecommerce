import React from "react";
import styles from "./quantitySelector.module.css";

const QuantitySelector = ({ quantity, setQuantity, maxValue, index = -1, minValue = 0, mostrarDisponibles = true }) => {
  const [localQuantity, setLocalQuantity] = React.useState(quantity);

  React.useEffect(() => {
    if (localQuantity < minValue) {
      setLocalQuantity(minValue);
      if (index === -1) {
        setQuantity(minValue);
      } else {
        setQuantity(0, index);
      }
    } else if (localQuantity > maxValue) {
      setLocalQuantity(maxValue);
      if (index === -1) {
        setQuantity(maxValue);
      } else {
        setQuantity(maxValue, index);
      }
    } else {
      if (index === -1) {
        setQuantity(localQuantity);
      } else {
        setQuantity(localQuantity, index);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localQuantity]);

  return (
    <div className={styles.quantitySelectorContainer}>
      <div className={styles.inputsContainer}>
        <button
          aria-label="aumentar orden de objetos"
          className={styles.quantityButton}
          onClick={() => setLocalQuantity(+localQuantity - 1)}>
          -
        </button>
        <input
          type="number"
          min={minValue}
          step="1"
          className={styles.quantityInput}
          value={localQuantity}
          onInput={({ target }) => {
            setLocalQuantity(parseInt(target.value));
          }}></input>
        <button className={styles.quantityButton} onClick={() => setLocalQuantity(+localQuantity + 1)}>
          +
        </button>
      </div>
      {mostrarDisponibles && <p className={styles.availablesDescription}>Available: {maxValue}</p>}
    </div>
  );
};

export default QuantitySelector;
