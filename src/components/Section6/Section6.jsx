import { useEffect, useState } from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "./Section6.scss";
import { useMediaQuery } from "@mui/material";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { getContent } from "../../utils/changeLang";
const Section6 = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
  });
  const [newsData, setNewsData] = useState([]);
  const isDesktop = useMediaQuery("(min-width:900px)");
  const controls1 = useAnimation();
  const controls2 = useAnimation();
  const handleAnimation = () => {
    if (inView) {
      controls1.start({ x: 0, opacity: 1 });
      controls2.start({ x: 0, opacity: 1 });
    } else {
      controls1.start({ x: -50, opacity: 0 });
      controls2.start({ x: 50, opacity: 0 });
    }
  };
  const { i18n } = useTranslation();
  const activeLang = i18n.language === "uz" ? "textUz" : "textRu";
  // console.log("newsData>>>>>>>>>", newsData);
  useEffect(() => {
    axios.get(`https://winejet-uz.herokuapp.com/api/news`).then((res) => {
      setNewsData(res.data);
    });
    handleAnimation();
  }, [inView]);
  {
    // console.log("section6 Data >> ", newsData?.[0]?.attachmentContents?.[0]?.data);
  }
  return (
    <section className="section6" ref={ref}>
      <div className="section6__container">
        <h1 className="section6__title">
          {getContent(
            "Миссия и цели Учебного центра Виноградарства!",
            "Vinochilik o‘quv markazining vazifasi va maqsadlari!"
          )}
        </h1>
        <div className="section6__img-wrapper">
          {isDesktop ? (
            <motion.div
              className="section6__img"
              initial={{ x: -50, opacity: 0 }}
              animate={controls1}
              transition={{ duration: 0.4, type: "tween" }}
            >
              <img
                src={`https://winejet-uz.herokuapp.com/api/files/${newsData?.[0]?.attachmentContentIds?.[0]}`}
                alt=""
              />
            </motion.div>
          ) : (
            <div className="section6__img">
              <img
                src={`https://winejet-uz.herokuapp.com/api/files/${newsData?.[0]?.attachmentContentIds?.[0]}`}
                alt=""
              />
            </div>
          )}
          {isDesktop ? (
            <motion.div
              className="section6__img"
              initial={{ x: 50, opacity: 0 }}
              animate={controls2}
              transition={{ duration: 0.4, type: "tween" }}
            >
              <img
                 src={`https://winejet-uz.herokuapp.com/api/files/${newsData?.[0]?.attachmentContentIds?.[1]}`}
                alt=""
              />
            </motion.div>
          ) : (
            <div className="section6__img">
              <img
                 src={`https://winejet-uz.herokuapp.com/api/files/${newsData?.[0]?.attachmentContentIds?.[1]}`}
                alt=""
              />
            </div>
          )}
          <div className="section6__card1">
            <p>{newsData?.[1]?.[activeLang]}</p>
          </div>
        </div>
        <div className="section6__img-wrapper">
          {isDesktop ? (
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={controls1}
              transition={{ duration: 0.4, type: "tween", delay: 0.4 }}
              className="section6__img2"
            >
              <img
                src={`https://winejet-uz.herokuapp.com/api/files/${newsData?.[1]?.attachmentContentIds?.[1]}`}
                alt=""
              />
            </motion.div>
          ) : (
            <div className="section6__img2">
              <img
                src={`https://winejet-uz.herokuapp.com/api/files/${newsData?.[1]?.attachmentContentIds?.[1]}`}
                alt=""
              />
            </div>
          )}
          {isDesktop ? (
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={controls2}
              transition={{ duration: 0.4, type: "tween", delay: 0.4 }}
              className="section6__img2"
            >
              <img
                src={`https://winejet-uz.herokuapp.com/api/files/${newsData?.[1]?.attachmentContentIds?.[0]}`}
                alt=""
              />
            </motion.div>
          ) : (
            <div className="section6__img2">
              <img
                src={`https://winejet-uz.herokuapp.com/api/files/${newsData?.[1]?.attachmentContentIds?.[0]}`}
                alt=""
              />
            </div>
          )}
          <div className="section6__card2">
            <p>{newsData?.[0]?.[activeLang]}</p>
          </div>
        </div>
        <div className="section6__footer-card-wrapper">
          <div className="section6__footer-card">
            <p>{newsData?.[0]?.[activeLang]}</p>
          </div>
          <div className="section6__footer-card">
            <p>{newsData?.[1]?.[activeLang]}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section6;
