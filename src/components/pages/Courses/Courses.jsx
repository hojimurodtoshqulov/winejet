import "./Courses.scss";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import { Card } from "../../";
import { getContent } from "../../../utils/changeLang";
import { useTranslation } from "react-i18next";
import { Box, Skeleton } from "@mui/material";

const staticData = {
  courses: [
    {
      img: "/images/course-img1.jpg",
      title_ru: "Курс Сомелье. WineJet Diploma",
      title_uz: "Level 4 WineJet Diploma",
      link: "",
      created_on: "2023-05-04T00:00:00.000+00:00",
      short_content_ru:
        "Курс Сомелье -  для начинающих экспертов. Обладателям 3 уровня WineJet. 20 очных занятий по 2,5 часа, 20 видео-уроков.",
      short_content_uz:
        "Sommelier Course -  expert knowledge for professionals and those who have completed Level 3 WineJet. 20 face-to-face lessons of 2.5 hours each plus 20 video lessons.",
    },
    {
      img: "/images/course-img2.jpg",
      title_ru: "1 уровень WineJet",
      title_uz: "Level 1 WineJet",
      link: "",
      created_on: "2023-05-01T00:00:00.000+00:00",
      short_content_ru:
        "Как стать сомелье - для любителей. 1 занятие, 2,5 часа!",
      short_content_uz:
        "How To Become a Sommelier - expert knowledge for non professionals and fans. 1 Lesson, 2.5 hours!",
    },
    {
      img: "/images/course-img3.jpg",
      title_ru: "2 уровень WineJet",
      title_uz: "Level 2 WineJet",
      link: "",
      created_on: "2023-05-02T00:00:00.000+00:00",
      short_content_ru:
        "Однодневный винный интенсив - для любителей и профессионалов, 2 занятия по 2,5 часа.",
      short_content_uz:
        "One day wine intensive course - expert knowledge for wine lovers and trainees. 2 lessons, 2.5 hours each!",
    },
  ],
};
const staticShowCoursesData = {
  titleRu: "все курсы",
  titleUz: "Barcha kurslar",
  descriptionRu:
    "Курс Сомелье - для начинающих экспертов. Обладателям 3 уровня WineJet. 20 очных занятий по 2,5 часа, 20 видео-уроков.",
  descriptionUz:
    "Sommelier kursi - yangi boshlanuvchilar uchun. 3-darajali WineJet egalari. 2,5 soatlik 20 ta yuzma-yuz dars, 20 ta video dars.",
  attachmentContent: "",
};
const Courses = () => {
  const [current, setCurrent] = useState(0);
  const [data, setData] = useState([]);
  const [showCoursesData, setShowCoursesData] = useState(staticShowCoursesData);
  const [filteredData, setFilteredData] = useState(staticData.courses);
  const [tab, setTab] = useState(["tab1", "tab2", "tab3", "tab4"]);
  const i18n = useTranslation();
  useEffect(() => {
    axios.get(`https://winejet-uz.herokuapp.com/api/courses`).then((res) => {
      console.log(res);
      setFilteredData(
        res.data.map((item) => {
          return {
            img: `https://winejet-uz.herokuapp.com/api/files/${item.attachmentContentId}`,
            title_ru: item.titleRu,
            title_uz: item.titleUz,
            link: item.id,
            created_on: item.date,
            short_content_ru: item.descriptionRu,
            short_content_uz: item.descriptionUz,
          };
        })
      );
      setFilteredData(res.data.data.result);
      setData(res.data.data.result);
    });
  }, []);
  useEffect(() => {
    axios
      .get(`https://winejet-uz.herokuapp.com/api/courses-showcase`)
      .then((res) => {
        setShowCoursesData(res.data);
      });
  }, []);
  const handleTabClick = (index) => {
    setCurrent(index);
    if (index === 0) {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) => item.category_id === index);
      setFilteredData(filtered);
    }
  };
  console.log(
    "showCoursesData?.attachmentContent?.data >>> ",
    showCoursesData?.attachmentContent?.data
  );
  return (
    <>
      <section
        className="courses"
        style={{
          background: `linear-gradient(90deg, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(https://winejet-uz.herokuapp.com/api/files/${showCoursesData?.attachmentContentId})`,
        }}
      >
        <div className="courses__container">
          <div className="courses__wrapper">
            <h1 data-aos="flip-up">
              {getContent(showCoursesData?.titleRu, showCoursesData?.titleUz)}
            </h1>
            <p data-aos="flip-down">
              {getContent(
                showCoursesData?.descriptionRu,
                showCoursesData?.descriptionUz
              )}
            </p>
          </div>
        </div>
      </section>
      <section className="courses-items">
        <div className="courses-items__container">
          <div>
            <h1 data-aos="fade-down" className="courses-items__title">
              {getContent("все курсы", "barcha kurslar")}
            </h1>
            <ul className="courses-items__tab-wrapper">
              <li
                onClick={() => handleTabClick(0)}
                className={`${current === 0 ? "active-tab" : ""}`}
              >
                {getContent("Все", "Barchasi")}
              </li>
              {tab.map((item, i) => (
                <li
                  key={i}
                  onClick={() => handleTabClick(item.id)}
                  className={`${current === item.id ? "active-tab" : ""}`}
                >
                  {getContent(item.title_ru, item.title_Uz)}
                </li>
              ))}
            </ul>
            <div className="card-wrapper">
              <AnimatePresence>
                {filteredData.length ? (
                  filteredData.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -50 }}
                      transition={{ type: "tween" }}
                      data-aos="flip-left"
                    >
                      <Card
                        img={item.img}
                        title_ru={item.title_ru}
                        title_uz={item.title_uz}
                        link={item.link}
                        date={item.created_on}
                        short_content_ru={item.short_content_ru}
                        short_content_uz={item.short_content_uz}
                      />
                    </motion.div>
                  ))
                ) : (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "3rem",
                      flexWrap: "wrap",
                      width: "100%",
                    }}
                  >
                    <Box>
                      <Skeleton sx={{ height: "300px", width: "200px" }} />
                      <Skeleton width="60%" />
                    </Box>
                    <Box>
                      <Skeleton sx={{ height: "300px", width: "200px" }} />
                      <Skeleton width="60%" />
                    </Box>
                    <Box>
                      <Skeleton sx={{ height: "300px", width: "200px" }} />
                      <Skeleton width="60%" />
                    </Box>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Courses;
