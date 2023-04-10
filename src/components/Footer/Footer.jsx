import "./Footer.scss";
import { Link } from "react-router-dom";
import { BsTelephone } from "react-icons/bs";
import { HiOutlineLocationMarker } from "react-icons/hi";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__logo-wrapper">
          <Link to="/">
            <img src="/images/logo.png" alt="" />
            <img src="/images/internatiol.png" alt="" />
          </Link>
        </div>
        <div className="footer__wrapper">
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
              <a href="https://github.com/Nurmuhammad032/ijara/blob/master/src/components/Header/SideMenu/SideMenu.tsx">
                <img src="/images/telegram.png" alt="" />
              </a>
              <a href="https://github.com/Nurmuhammad032/ijara/blob/master/src/components/Header/SideMenu/SideMenu.tsx">
                <img src="/images/facebook.png" alt="" />
              </a>
              <a href="https://github.com/Nurmuhammad032/ijara/blob/master/src/components/Header/SideMenu/SideMenu.tsx">
                <img src="/images/insta.png" alt="" />
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
