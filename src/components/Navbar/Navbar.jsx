import "./Navbar.scss";
import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { HiOutlineCalendar } from "react-icons/hi";
import { RxHamburgerMenu } from "react-icons/rx";
import SelectComponent from "./SelectComponent/SelectComponent";
import { Link, NavLink, useLocation } from "react-router-dom";
import SideMenu from "./SideMenu/SideMenu";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { getContent } from "../../utils/changeLang";
import { Link as Scroll } from "react-scroll";
import { links, translations } from "./links";
const Navbar = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isActive, setIsActive] = useState(false);
	const { pathname } = useLocation();
	const [expanded, setExpanded] = useState(false);

	const [data, setData] = useState([]);
	const handleChange = (panel) => (_, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	useEffect(() => {
		axios.get(`${process.env.REACT_APP_API_URL}menu/get`).then((res) => {
			setData(res?.data?.data?.result);
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

	const getLinkClassName = (pathname, link) =>
		pathname.split("/")[1] === link ? "active-link" : "";
	const { t, i18n } = useTranslation();
	const changeLanguage = (lng) => {
		i18n.changeLanguage(lng);
	};
	return (
		<>
			<nav className={`navbar ${isScrolled ? "navbar-active" : ""}`}>
				<div className="navbar__wrapper">
					<div className="navbar__logo-wrapper">
						<Link to={""}>
							<img src="/images/logo.png" alt="" />
							<img src="/images/Internatiol.png" alt="" />
						</Link>
					</div>
					<ul className="navbar__links-wrapper">
						<li>
							<span className="navbar__search-icon">
								<FiSearch />
							</span>
						</li>
						{links.map((item, i) => {
							return (
								<li key={i}>
									{/* {item.scroll ? (
										pathname === "/" ? (
											<Scroll
												className={""}
												activeClass={"active-link"}
												to={"section3-page"}
												spy={true}
												offset={-150}
											>
												{getContent(
													translations["ru"][item.link],
													translations["uz"][item.link]
												)}
											</Scroll>
										) : (
											""
										)
									) : ( */}
										<NavLink
											className={getLinkClassName(pathname, item.link)}
											to={item.link}
										>
											{getContent(
												translations["ru"][item.link],
												translations["uz"][item.link]
											)}
										</NavLink>
									{/* )} */}
								</li>
							);
						})}
						<li>
							<SelectComponent />
						</li>
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
