import "./Contact.scss";
import "leaflet/dist/leaflet.css";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { BsTelephone } from "react-icons/bs";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import CustomMap from "../../CustomMap/CustomMap";
import Card from "../../Card/Card";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import { useTranslation } from "react-i18next";
import { getContent } from "../../../utils/changeLang";
let DefaultIcon = L.icon({
	iconUrl: icon,
	shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const MyMap = () => {
	const position = [41.299496, 69.240074];

	return (
		<MapContainer
			center={position}
			style={{
				width: "100%",
				height: "100%",
				zIndex: "40",
			}}
			zoom={13}
			scrollWheelZoom={true}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Marker position={position}></Marker>
		</MapContainer>
	);
};

const Contact = () => {
	const [data, setData] = useState({});
	const [formData, setFormData] = useState({});

	const changeHandler = (e) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};
	useEffect(() => {
		const getContact = async () => {
			const res = await await axios.get(
				"https://winejet-uz.herokuapp.com/api/contact"
			);
			setData(res.data);
		};

		getContact();
	}, []);

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			const dataToSubmit = {
				...formData,
			};

			const res = await axios.post(
				"https://winejet-uz.herokuapp.com/api/order/to-email",
				dataToSubmit
			);
			console.log(res);
			NotificationManager.success("Message sent", "Success");
			setFormData({ name: "", email: "", message: "" });
		} catch (error) {
			NotificationManager.error("Something went wrong", "Error");
		}
	};
	return (
		<section className="contact-page">
			<div className="contact-page__container">
				<h1 data-aos="fade-down" className="contact-page__title">
					{getContent("КОНТАКТЫ", "Aloqa")}
				</h1>
				<div className="contact-page__wrapper">
					<div className="contact-page__info-wrapper">
						<div data-aos="fade-left">
							<p>
								<BsTelephone />
							</p>
							<p>
								<a href={`tel:+${data.phoneNumber}`} target="_blanck">
									+{data.phoneNumber}
								</a>
							</p>
						</div>
						<div data-aos="fade-right">
							<p>
								<MdOutlineEmail />
							</p>
							<p>
								<a href={`mailto: ${data.email}`} target="_blank">
									{data.email}
								</a>
							</p>
						</div>
						<div data-aos="fade-left">
							<p>
								<IoLocationOutline />
							</p>
							<p>
								<a href="">{data.address}</a>
							</p>
						</div>
					</div>
					<div className="contact-page__inputs">
						<h1 data-aos="fade-up">
							{getContent("Заполните форму", "Formani to'ldiring")}
						</h1>
						<div>
							<form onSubmit={submitHandler}>
								<input
									data-aos="fade-right"
									type="text"
									name="name"
									placeholder={getContent("Имя", "Ism")}
									onChange={changeHandler}
									required
									value={formData.name}
								/>
								<input
									data-aos="fade-left"
									type="email"
									placeholder={getContent(
										"Электронная почта",
										"Elektron pochta"
									)}
									name="email"
									onChange={changeHandler}
									required
									value={formData.email}
								/>
								<textarea
									data-aos="fade-right"
									rows="3"
									placeholder={getContent("Сообщение", "Xabar")}
									name="message"
									onChange={changeHandler}
									required
									value={formData.message}
								></textarea>
								<button data-aos="fade-down">
									{getContent("Oтправить", "Jo'natish")}
								</button>
							</form>
						</div>
					</div>
				</div>
				<div data-aos="zoom-in" className="contact-page__map-wrapper">
					<CustomMap />
				</div>
			</div>
		</section>
	);
};

export default Contact;
