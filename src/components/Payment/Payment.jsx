import "./Payment.scss";
import { GrClose } from "react-icons/gr";
import { useState } from "react";
import axios from "axios";

const Payment = ({ close, courseId }) => {
  const [increment, setIncrement] = useState(1);

  const [data, setData] = useState({});

  const inputHandler = (e) =>
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const submitOrder = async () => {
    try {
      const dataToSubmit = {
        ...data,
        courseId: +courseId,
      };

      console.log(dataToSubmit);
      const res = await axios.post(
        "https://winejet-uz.herokuapp.com/api/order",
        dataToSubmit
      );
      console.log(res);
    } catch (error) {}
  };
  return (
    <>
      <div className="payment">
        <div>
          <div className="payment__header">
            <p className="payment__title">Заполните форму </p>{" "}
            <p className="payment__close-icon" onClick={() => close(false)}>
              <GrClose />
            </p>
          </div>
          <div className="payment__wrapper">
            <div className="payment__inputs">
              <input
                onChange={inputHandler}
                type="text"
                name="name"
                placeholder="имя"
              />
              <input
                onChange={inputHandler}
                type="text"
                name="surname"
                placeholder="Фамилия"
              />
              <input
                onChange={inputHandler}
                type="text"
                name="phoneNumber"
                placeholder="Номер телефона"
              />
              <input
                onChange={inputHandler}
                type="text"
                name="email"
                placeholder="email"
              />
            </div>
            <button onClick={submitOrder} className="payment__submit-btn">
              оплатить
            </button>
          </div>
        </div>
      </div>
      <div className="payment__bg" onClick={() => close(false)}></div>
    </>
  );
};

export default Payment;
