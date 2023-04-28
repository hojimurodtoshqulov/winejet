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
import { HiOutlineCalendar } from "react-icons/hi";
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
            <h6>Страницы</h6>
            {pages?.map((item) => (
              <Link key={item.link} to={item.link}>
                {getContent(item.nameRu, item.nameUz)}
              </Link>
            ))}
            <Link to="/calendar">
              <HiOutlineCalendar />
            </Link>
            {/*  <Link to="">ipsum</Link>
            <Link to="">dolor sit</Link>
            <Link to="">amet</Link>
            <Link to="">consectetur</Link> */}
          </div>
          <div className="column-wrap">
            <h6>Контакт</h6>
            <div className="footer__contact-info">
              <p>
                <BsTelephone />
              </p>
              <p>+{contactData.phoneNumber}</p>
            </div>
            <div className="footer__contact-info">
              <p>
                <HiOutlineLocationMarker />
              </p>
              <p>{contactData.address} </p>
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
              Присоединяйтесь к нам
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
