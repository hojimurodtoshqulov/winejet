import "./Navbar.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { FiSearch } from "react-icons/fi";
import { HiOutlineCalendar } from "react-icons/hi";
import { RxHamburgerMenu } from "react-icons/rx";
import SelectComponent from "./SelectComponent/SelectComponent";
import { Link, NavLink, useLocation } from "react-router-dom";
import SideMenu from "./SideMenu/SideMenu";
import { useTranslation } from "react-i18next";
import { getContent } from "../../utils/changeLang";
import { Link as Scroll } from "react-scroll";
import { links, translations } from "./links";
const Navbar = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isActive, setIsActive] = useState(false);
	const { pathname } = useLocation();
	const [expanded, setExpanded] = useState(false);

	const [fakeData, setFakeData] = useState([
		{ nameRu: "КУРСЫ" },
		{ nameRu: "О НАС" },
		{ nameRu: "КОНТАКТЫ" },
	]);
	const [data, setData] = useState([fakeData]);
	const handleChange = (panel) => (_, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};
	// useEffect(() => {
	// 	axios
	// 		.get(`${process.env.REACT_APP_API_URL}/pages`)
	// 		.then((res) => {
	// 			setData(
	// 				res.data
	// 				// res.data.map((item) => {
	// 				// 	return {
	// 				// 		img: `data:image/png;base64,${item.attachmentContent.data}`,
	// 				// 		title_ru: item.titleRu,
	// 				// 		title_uz: item.titleUz,
	// 				// 		link: item.id,
	// 				// 		created_on: item.date,
	// 				// 		short_content_ru: item.descriptionRu,
	// 				// 		short_content_uz: item.descriptionUz,
	// 				// 	};
	// 				// })
	// 			);
	// 		})
	// 		.catch((err) => console.log("Error >>>> ", err));
	// }, []);

	useEffect(() => {
		axios.get(`https://winejet-uz.herokuapp.com/api/pages`).then((res) => {
			setData(res.data);
		});
		if (pathname === "/") {
			setIsScrolled(false);
			const handleScroll = () => {
				if (window.scrollY > 100) {
					setIsScrolled(true);
				} else {
					setIsScrolled(false);
				}
			};
			document.addEventListener("scroll", handleScroll);
			return () => {
				document.removeEventListener("scroll", handleScroll);
			};
		} else {
			setIsScrolled(true);
		}
	}, [pathname]);
	//   console.log("data pages >>> ", data);
	const getLinkClassName = (pathname, link) =>
		pathname.split("/")[1] === link ? "active-link" : "";
	const { t, i18n } = useTranslation();
	const changeLanguage = (lng) => {
		i18n.changeLanguage(lng);
	};
	// console.log("data nav >>> ", data);
	return (
		<>
			<nav className={`navbar ${isScrolled ? "navbar-active" : ""}`}>
				<div className="navbar__wrapper">
					<div className="navbar__logo-wrapper">
						<Link to={"/"}>
							<img className="logo-group" src="/images/logoGroup.png" alt="" />
						</Link>
					</div>
					<ul className="navbar__links-wrapper">
						{/* <li>
							<span className="navbar__search-icon">
								<FiSearch />
							</span>
						</li> */}
						{data.map((item, i) => {
							return (
								<li key={item.id}>
									<NavLink
										className={getLinkClassName(pathname, item.link)}
										to={item.link}
									>
										{/* ========================
										 * getContent: shu funksiyaga textlarni 1-parametriga ruschasini, 2-parametria o'zbekchasini berib chaqirilsa, uzi aktiv tilga qarab bittasini qaytaradi
										 */}
										{getContent(item.nameRu, item.nameUz)}
									</NavLink>
								</li>
							);
						})}
						<li>
							<Link
								className={getLinkClassName(pathname, "calendar")}
								to="/calendar"
							>
								<span>
									<HiOutlineCalendar />
								</span>
							</Link>
						</li>
						<li>
							<SelectComponent />
						</li>
					</ul>
					<div className="navbar__hamburger">
						<span onClick={() => setIsActive(true)}>
							<RxHamburgerMenu />
						</span>
					</div>
				</div>
			</nav>
			<SideMenu isActive={isActive} setIsActive={setIsActive} />
		</>
	);
};

export default Navbar;
