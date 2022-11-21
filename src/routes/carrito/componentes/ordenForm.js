import React from "react";
import styles from "./ordenForm.module.css";
import { api } from "../../../storeReducers/apiSlice/apiSlice";
import { useNavigate } from "react-router-dom";

const OrdenForm = ({ product_list, ocultarForm, useDispatch, clearItems }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reducer = (state, action) => {
    const { name, value } = action.target;
    return { ...state, [name]: value };
  };
  const initialState = {
    street_name: "",
    zip_code: "",
    address: "",
    phone: "",
    state: "",
    city: "",
    product_list: product_list,
  };
  const [createOrder, { isSuccess }] = api.useAddNewOrderMutation();
  const [data, setData] = React.useReducer(reducer, initialState);
  const [enviandoData, setEnviandoData] = React.useState(false);

  let handleSubmit = (e) => {
    e.preventDefault();
    setEnviandoData(true);

    createOrder(data);
  };

  if (isSuccess) {
    return (
      <div className={styles.dialogContainer}>
        <h2>The order was created successfully!</h2>
        <button
          className={`${styles.btn} ${styles.btnCrearOrden}`}
          onClick={() => {
            ocultarForm();
            dispatch(clearItems());
            navigate("/ordenes");
          }}>
          Close
        </button>
      </div>
    );
  }

  return (
    <div className={styles.dialogContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Create order</h2>
        <p className={styles.text}>
          Almost ready! <br></br> We just need some more information
        </p>

        {Object.keys(initialState).map((field, index) => {
          if (field === "product_list") return null;
          return (
            <div key={index + field} className={`${styles.form__group} ${styles.field}`}>
              <input
                id={field}
                name={field}
                type={"text"}
                minLength={3}
                maxLength={field === "phone" ? "15" : field === "zip_code" ? "5" : "20"}
                value={data.field}
                placeholder={field}
                className={styles.form__field}
                onChange={(element) => {
                  setData({ target: element.target });
                }}
                required
              />
              <label htmlFor={field} className={styles.form__label}>
                {field.replace("_", " ")}
              </label>
            </div>
          );
        })}

        <div className={styles.btnsContainer}>
          {!enviandoData && (
            <>
              <button type="submit" className={`${styles.btn} ${styles.btnCrearOrden}`}>
                Create order
              </button>
              <button type="button" className={`${styles.btn} ${styles.btnRegresar}`} onClick={() => ocultarForm()}>
                Go back
              </button>
            </>
          )}
          {enviandoData && (
            <>
              <p className={styles.Enviando}>Sending</p>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default OrdenForm;
