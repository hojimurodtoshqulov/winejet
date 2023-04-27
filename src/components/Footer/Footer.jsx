import "./Footer.scss";
import { Link } from "react-router-dom";
import { BsTelephone } from "react-icons/bs";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BsInstagram } from "react-icons/bs";
import { FiFacebook } from "react-icons/fi";
import { RxTwitterLogo } from "react-icons/rx";
import { useState, useEffect } from "react";
import axios from "axios";
import { HiOutlineCalendar } from "react-icons/hi";

function Footer() {
	const [data, setData] = useState([]);
	useEffect(() => {
		axios.get(`https://winejet-uz.herokuapp.com/api/pages`).then((res) => {
			setData(res.data);
		});
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
						<h6>Pages</h6>
						{data.map((item, i) => (
							<Link key={item.id} to={item.link}>
								{item.nameRu}
							</Link>
						))}
						<Link
							
							to="/calendar"
						>
								<HiOutlineCalendar />
							
						</Link>
					</div>
					<div className="column-wrap">
						<h6>Jorem</h6>
						<Link to="">Porem</Link>
						<Link to="">ipsum</Link>
						<Link to="">dolor sit</Link>
						<Link to="">amet</Link>
						<Link to="">consectetur</Link>
					</div>
					<div className="column-wrap">
						<h6>Jorem</h6>
						<div className="footer__contact-info">
							<p>
								<BsTelephone />
							</p>
							<p>+998 (90) 999 99 99</p>
						</div>
						<div className="footer__contact-info">
							<p>
								<HiOutlineLocationMarker />
							</p>
							<p>Yorem ipsum dolor </p>
						</div>
					</div>
					<div className="column-wrap">
						<h6>подпишитесь на новости</h6>

						<div className="footer__input-wrapper">
							<input type="text" placeholder="Ваш email" />
							<button>отправить</button>
						</div>
						<h6
							style={{
								margin: "2.8rem 0",
							}}
						>
							Join us
						</h6>
						<div className="footer__social-wrapper">
							<a className="social_icons" href="">
								<BsInstagram />
							</a>
							<a className="social_icons" href="">
								<FiFacebook />
							</a>
							<a className="social_icons" href="">
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
