import "./Contact.scss";
import "leaflet/dist/leaflet.css";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import React, { useEffect } from "react";
import { BsTelephone } from "react-icons/bs";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import CustomMap from "../../CustomMap/CustomMap";
import Card from "../../Card/Card";

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
  return (
    <section className="contact-page">
      <div className="contact-page__container">
        <h1 data-aos="fade-down" className="contact-page__title">
          КОНТАКТЫ
        </h1>
        <div className="contact-page__wrapper">
          <div className="contact-page__info-wrapper">
            <div data-aos="fade-left">
              <p>
                <BsTelephone />
              </p>
              <p>+998 95 052 46 26</p>
            </div>
            <div data-aos="fade-right">
              <p>
                <MdOutlineEmail />
              </p>
              <p>nurmuhammad2003o@gmail.com</p>
            </div>
            <div data-aos="fade-left">
              <p>
                <IoLocationOutline />
              </p>
              <p>Tashkent, Sergeli</p>
            </div>
          </div>
          <div className="contact-page__inputs">
            <h1 data-aos="fade-up">Fill in form</h1>
            <div>
              <input data-aos="fade-right" type="text" placeholder="Name" />
              <input data-aos="fade-left" type="text" placeholder="Email" />
              <textarea
                data-aos="fade-right"
                rows="3"
                placeholder="Message"
              ></textarea>
              <button data-aos="fade-down">send</button>
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
