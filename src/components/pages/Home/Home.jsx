import "./Home.scss";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, Landing, Section3, Section5, Section6, Teachers } from "../../";
import axios from "axios";
import { Link } from "react-router-dom";
import { Box, Skeleton, useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import SectionMap from "../../SectionMap/SectionMap";

const staticData = {
  courses: [
    {
      img: "/images/course-img1.png",
      title_ru: "Курсы Официанта",
      title_uz: "Курсы Официанта",
      link: "",
      created_on: new Date(),
      short_content_ru:
        "Мы поможем вам получить все  самые важные и необходимые знания в данной сфере деятельности!",
      short_content_uz:
        "Мы поможем вам получить все  самые важные и необходимые знания в данной сфере деятельности!",
    },
    {
      img: "/images/course-img2.png",
      title_ru: "Курсы Официанта",
      title_uz: "Курсы Официанта",
      link: "",
      created_on: new Date(),
      short_content_ru:
        "Мы поможем вам получить все  самые важные и необходимые знания в данной сфере деятельности!",
      short_content_uz:
        "Мы поможем вам получить все  самые важные и необходимые знания в данной сфере деятельности!",
    },
  ],
};

const Home = () => {
  const { ref, inView } = useInView({
    threshold: 0.4,
  });

  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const isDesktop = useMediaQuery("(min-width:900px)");

  useEffect(() => {
    axios
      .get(`https://winejet-uz.herokuapp.com/api/courses`)
      .then((res) => {
        setData(
          res.data.map((item) => {
            return {
              img: `data:image/png;base64,${item.attachmentContent.data}`,
              title_ru: item.titleRu,
              title_uz: item.titleUz,
              link: item.id,
              created_on: item.date,
              short_content_ru: item.descriptionRu,
              short_content_uz: item.descriptionUz,
            };
          })
        );
      })
      .catch((err) => console.log("Error >>", err));
  }, []);

  const animateCard = {
    opacity: inView ? 1 : 0,
    y: inView ? 0 : 50,
  };

  useEffect(() => {
  	axios
  		.get(`https://winejet-uz.herokuapp.com/apicourses/get-main`)
  		.then((res) => {
  			setData(res?.data?.data?.result);
  		});
  }, []);

  return (
    <div
      style={{
        background: "#fff",
      }}
    >
      <Landing />
      <section
        className="course"
        style={{
          overflow: "hidden",
        }}
      >
        <div className="course__title">
          <h1>{t("courses.title")}</h1>
        </div>
        <div className="course-card-wrapper" ref={ref}>
          {data.length ? (
            data
              ?.filter((item, i) => i < 3)
              .map((item, i) => {
                return isDesktop ? (
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={animateCard}
                    transition={{ type: "tween", duration: 0.5 }}
                    key={i}
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
                ) : (
                  <div key={i}>
                    <Card
                      img={item.img}
                      title_ru={item.title_ru}
                      title_uz={item.title_uz}
                      link={item.id}
                      date={item.created_on}
                      short_content_ru={item.short_content_ru}
                      short_content_uz={item.short_content_uz}
                    />
                  </div>
                );
              })
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "3rem",
                flexWrap: "wrap",
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
        </div>
        <div className="course__btn">
          <Link to="/courses">{t("courses.button")}</Link>
        </div>
      </section>
      <Section3 />
      <Teachers />
      {/* <Section5 /> */}
      <Section6 />
      <SectionMap />
    </div>
  );
};

export default Home;
