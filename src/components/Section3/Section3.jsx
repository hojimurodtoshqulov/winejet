import { useEffect, useState } from "react";
import axios from "axios";
import "./Section3.scss";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";
import { getContent } from "../../utils/changeLang";
const Section3 = () => {
  const isDesktop = useMediaQuery("(min-width:900px)");
  const { ref, inView } = useInView({
    threshold: 0.4,
  });
  const { t } = useTranslation();
  const animate1 = {
    opacity: inView ? 1 : 0,
    x: inView ? 50 : -100,
  };
  const staticData = {
    titleRu: "Международная школа сомелье WineJet",
    titleUz: "Vinogradstva o'quv markazi",
    descriptionRu:
      "Основана в 2011 году. Наши филиалы располагаются в Узбекистане, России, Израиле, Франции. Обучение ориентировано на любителей и будущих профессионалов. Курсы WineJet ставят целью обучить студентов трем основным направлениям, которые должен знать любой сомелье и винный эксперт: ресторанный и винный сервис, экспертная оценка качества вина, винная культура.",
    descriptionUz:
      "Bu sharob sanoatida jiddiy martaba qurishni, o'z malakalarini oshirishni yoki sharob haqida oddiy bilimlarni olishni xohlovchilar uchun yaratilgan noyob ta'lim loyihasi bo'lib, olijanob ichimlikdan yanada ko'proq zavq olish va restoranda yaxshisini tanlash uchun. supermarket o'z-o'zidan.",
    attachmentContentId: "",
  };
  const [data, setData] = useState(staticData);
  useEffect(() => {
    axios.get(`https://winejet-uz.herokuapp.com/api/about-us`).then((res) => {
      setData(res.data);
    });
  }, []);
  // console.log("data about >>> ", data?.attachmentContent?.data);
  return (
    <section className="section3-page" ref={ref} id="section3-page">
      <div className="section3-page__container">
        <div className="section3-page__wrapper">
          <div className="section3-page__right">
            {/* {console.log("about-us >->-> ", data?.attachmentContent?.data)} */}
            {isDesktop ? (
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={animate1}
                transition={{ duration: 0.4, type: "tween" }}
                className="section3-wrapper"
              >
                <span
                  style={{ fontWeight: 900 }}
                  className="section3-card-header"
                >
                  {t("aboutus.header")}
                </span>
                <div className="section3-card">
                  <h1>{getContent(data.titleRu, data.titleUz)}</h1>
                  <p className="section3-page__desc">
                    {getContent(data.descriptionRu, data.descriptionUz)}
                  </p>
                  {/* <h1>{t("aboutus.title")}</h1>
									<p className="section3-page__desc">{t("aboutus.info")}</p> */}
                </div>
              </motion.div>
            ) : (
              <div className="section3-wrapper">
                <span className="section3-card-header">
                  {t("aboutus.header")}
                </span>
                <div className="section3-card">
                  <h1>{data.titleRu}</h1>
                  <p className="section3-page__desc">{data.descriptionRu}</p>
                  {/* <h1>{t("aboutus.title")}</h1>
									<p className="section3-page__desc">{t("aboutus.info")}</p> */}
                </div>
              </div>
            )}
          </div>
          <div className="section3-page__left">
            <div className="section3-left-imgWrapper">
              <img
                src={`https://winejet-uz.herokuapp.com/api/files/${data?.attachmentContentId}`}
                alt="about image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section3;
