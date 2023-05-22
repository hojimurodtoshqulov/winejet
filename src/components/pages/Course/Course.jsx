import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Payment from "../../Payment/Payment";
import "./Course.scss";
import axios from "axios";
import { useParams } from "react-router-dom";
import i18next from "i18next";
import { getContent } from "../../../utils/changeLang";
import { months } from "../../../utils/customLang";
import { useTranslation } from "react-i18next";

const img = [
  { img: "/images/grape1.png" },
  { img: "/images/grape2.png" },
  { img: "/images/grape3.png" },
  { img: "/images/grape4.png" },
];
const staticData = {
  data: {
    img: "/images/grape1.png",
    title_ru: "Porem ipsum dolor ",
    title_uz: "Porem ipsum dolor",
    link: "",
    created_on: Date.now(),
    short_content_ru: "Morem ipsum dolor sit amet, consectetur",
    short_content_uz: "Morem ipsum dolor sit amet, consectetur",
    price: "200.000",
  },
};
const data1 = [
  "Horem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac ",
  "Horem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac ",
];
const formatter = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "UZS",
});
const Course = () => {
  const currentLanguage = i18next.language;
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState(staticData.data);
  const params = useParams();
  const { i18n } = useTranslation();
  const id = params.slug;

  const desc = i18n.language === "uz" ? "short_content_uz" : "short_content_ru";

  useEffect(() => {
    axios
      .get(`https://winejet-uz.herokuapp.com/api/courses/${id}`)
      .then((res) => {
        const item = res.data;
        // data: {
        //   img: "/images/grape1.png",
        //   title_ru: "Porem ipsum dolor ",
        //   title_uz: "Porem ipsum dolor",
        //   link: "",
        //   created_on: Date.now(),
        //   short_content_ru: "Morem ipsum dolor sit amet, consectetur",
        //   short_content_uz: "Morem ipsum dolor sit amet, consectetur",
        //   price: "200.000",
        // }
        setData({
          img: `https://winejet-uz.herokuapp.com/api/files/${item.attachmentContentId}`,
          title_ru: item.titleRu,
          title_uz: item.titleUz,
          link: item.id,
          created_on: item.date,
          short_content_ru: item.descriptionRu,
          short_content_uz: item.descriptionUz,
          price: item.price,
          desc1_uz: item.descriptionUz2,
          desc1_ru: item.descriptionRu2,
          desc2_uz: item.descriptionUz3,
          desc2_ru: item.descriptionRu3,
        });
      });
  }, []);
  let date = new Date(data.created_on);
  return (
    <>
      <section
        className="course-page"
        style={{
          overflow: "hidden",
        }}
      >
        <div className="course-page__container">
          <div className="course-page__wrapper">
            <div className="course-page__right">
              <div data-aos="flip-left">
                <h1>{getContent(data.title_ru, data.title_uz)}</h1>
                <p className="course-page__desc-header">
                  {getContent("старт", "boshlanish")}: {date.getDate()}{" "}
                  {getContent(
                    months["ru"][
                      date.toLocaleString("default", { month: "long" })
                    ],
                    months["uz"][
                      date.toLocaleString("default", { month: "long" })
                    ]
                  )}
                </p>
                <p className="course-page__desc">{data[desc]} </p>
                <p className="course-page__desc-price">
                  {formatter.format(data.price)}
                  {/* {getContent("сум", "so'm")} */}
                </p>
                <button onClick={() => setOpenModal(true)}>
                  {getContent("Оставить зявку", "So'rov qoldiring")}
                </button>
              </div>
            </div>
            <div className="course-page__left">
              <div className="img-wrapper-course-page">
                <img src={data.img} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <div
        style={{
          position: "relative",
          zIndex: 60,
        }}
      >
        <AnimatePresence>
          {openModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "tween" }}
            >
              <Payment courseId={id} close={setOpenModal} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* <Payment close={setOpenModal} /> */}
      <section className="course-page__section-2">
        <div className="course-page__sectoin-2-container">
          {/* <h1>Vorem ipsum dolor </h1> */}
          <div className="course-page__sectoin-2-wrapper">
            <div data-aos="fade-up" className="course-page__cards">
              <img src="/images/course-section2-img.png" alt="" />
              <p>{getContent(data?.desc1_ru, data?.desc1_uz)}</p>
            </div>
            <div data-aos="fade-up" className="course-page__cards">
              <img src="/images/course-section2-img.png" alt="" />
              <p>{getContent(data?.desc2_ru, data?.desc2_uz)}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Course;
