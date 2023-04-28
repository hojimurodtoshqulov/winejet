import "./Footer.scss";
import { Link } from "react-router-dom";
import { BsTelephone } from "react-icons/bs";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BsInstagram } from "react-icons/bs";
import { FiFacebook } from "react-icons/fi";
import { RxTwitterLogo } from "react-icons/rx";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { getContent } from "../../utils/changeLang";
import { useTranslation } from "react-i18next";
import { HiOutlineCalendar, HiOutlineMail } from "react-icons/hi";
function Footer() {
	const [pages, setPages] = useState([]);

	const [contactData, setContactData] = useState({});
	const { i18n } = useTranslation();
	useEffect(() => {
		const getPages = async () => {
			try {
				const res = await axios.get(
					`https://winejet-uz.herokuapp.com/api/pages`
				);
				setPages(res.data);
			} catch (error) {
				console.log(error);
			}
		};
		const getContactInfo = async () => {
			try {
				const res = await axios.get(
					`https://winejet-uz.herokuapp.com/api/contact`
				);
				setContactData(res.data);
			} catch (error) {
				console.log(error);
			}
		};

		getPages();
		getContactInfo();
	}, []);
	return (
		<footer className="footer">
			<div className="footer__container">
				<div className="footer__logo-wrapper">
					<Link to="/">
						<img src="/images/logoGroup.png" alt="" />
					</Link>
				</div>
				<div className="footer__wrapper">
					<div className="column-wrap">
						<h6>{getContent("Страницы", "Ilovalar")}</h6>
						{pages?.map((item) => (
							<Link key={item.link} to={item.link}>
								{getContent(item.nameRu, item.nameUz)}
							</Link>
						))}
						<Link to="/calendar">{getContent("календарь", "Kalendar")}</Link>
						{/*  <Link to="">ipsum</Link>
            <Link to="">dolor sit</Link>
            <Link to="">amet</Link>
            <Link to="">consectetur</Link> */}
					</div>
					<div className="column-wrap">
						<h6>{getContent("Контакт", "Aloqa")}</h6>
						<div className="footer__contact-info">
							<p>
								<BsTelephone />
							</p>
							<p>+{contactData.phoneNumber}</p>
						</div>
						<div className="footer__contact-info">
							<p>
								<HiOutlineMail />
							</p>
							<p>{contactData.email}</p>
						</div>
						<div className="footer__contact-info">
							<p>
								<HiOutlineLocationMarker />
							</p>
							<p>{contactData.address} </p>
						</div>
					</div>
					<div className="column-wrap">
						<h6>
							{getContent(
								"подпишитесь на новости",
								"yangiliklarga obuna bo'ling"
							)}
						</h6>

						<div className="footer__input-wrapper">
							<input
								type="text"
								placeholder={getContent("Ваш email", "Bizning email")}
							/>
							<button>{getContent("отправить", "yuborish")}</button>
						</div>
						<h6
							style={{
								margin: "2.8rem 0",
							}}
						>
							{getContent("Присоединяйтесь к нам", "bizga qo'shiling")}
						</h6>
						<div className="footer__social-wrapper">
							<a className="social_icons" href={contactData.instagram}>
								<BsInstagram />
							</a>
							<a className="social_icons" href={contactData.facebook}>
								<FiFacebook />
							</a>
							<a className="social_icons" href={contactData.twitter}>
								<RxTwitterLogo />
							</a>
						</div>
					</div>
				</div>
				<p className="footer__copyright">&#169; copyright 2023</p>
			</div>
		</footer>
	);
}

export default Footer;
