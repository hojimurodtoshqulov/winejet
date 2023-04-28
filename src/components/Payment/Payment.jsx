import "./Payment.scss";
import { GrClose } from "react-icons/gr";
import { useState } from "react";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import { getContent } from "../../utils/changeLang";
const Payment = ({ close, courseId }) => {
	const [increment, setIncrement] = useState(1);
	const [loading, setLoading] = useState(false);

	const [data, setData] = useState({});

	const inputHandler = (e) =>
		setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

	const submitOrder = async () => {
		try {
			setLoading(true);
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
			NotificationManager.success("Order sent", "Success");
			close(false);
		} catch (error) {
			console.log(error);
			NotificationManager.error("Something went wrong", "Error");
		} finally {
			setLoading(false);
		}
	};
	return (
		<>
			<div className="payment">
				<div>
					<div className="payment__header">
						<p className="payment__title">
							{getContent("Заполните форму", "Formani to'ldiring")}
						</p>
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
								placeholder={getContent("имя ", "Ism")}
							/>
							<input
								onChange={inputHandler}
								type="text"
								name="surname"
								placeholder={getContent("Фамилия ", "Familiya")}
							/>
							<input
								onChange={inputHandler}
								type="number"
								name="phoneNumber"
								placeholder={getContent("Номер телефона", "Telefon nomer")}
							/>
							<input
								onChange={inputHandler}
								type="email"
								name="email"
								placeholder={getContent("электронная почта", "email")}
							/>
						</div>
						<button
							disabled={loading}
							onClick={submitOrder}
							className="payment__submit-btn"
						>
							{loading ? "Loding..." : getContent("отправить", "Jo'natish")}
						</button>
					</div>
				</div>
			</div>
			<div className="payment__bg" onClick={() => close(false)}></div>
		</>
	);
};

export default Payment;
