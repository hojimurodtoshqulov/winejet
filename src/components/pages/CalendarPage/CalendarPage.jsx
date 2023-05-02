import "./Calendar.scss";
import { useEffect, useMemo, useState } from "react";
import AsideFilter from "../../AsideFilter/AsideFilter";
import CalendarComponent from "./CalendarComponent";
import moment from "moment";
import { getContent } from "../../../utils/changeLang";
import { useTranslation } from "react-i18next";
import { weekdays } from "../../../utils/customLang";
import { Link } from "react-router-dom";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import axios from "axios";
export const FilterWrapper = () => {
  return (
    <div className="calendar-header-filter">
      <div>
        <img src="/images/filter.png" alt="" />
      </div>
      <p>{getContent("фильтр", "Saralash")}</p>
    </div>
  );
};

const staticData = [
  {
    id: 402,
    titleUz: "Level 1 WineJet",
    titleRu: "1 уровень WineJet",
    descriptionUz:
      "How To Become a Sommelier - expert knowledge for non professionals and fans. 1 Lesson, 2.5 hours.",
    descriptionUz2: "gdfsg",
    descriptionUz3: "dfgds",
    descriptionRu: "Как стать сомелье - для любителей. 1 занятие, 2,5 часа",
    descriptionRu2: "dsfg",
    descriptionRu3: "11111",
    date: "2023-04-11T08:22:54.049Z",
    price: 1000000,
  },
  {
    id: 402,
    titleUz: "Level 1 WineJet",
    titleRu: "1 уровень WineJet",
    descriptionUz:
      "How To Become a Sommelier - expert knowledge for non professionals and fans. 1 Lesson, 2.5 hours.",
    descriptionUz2: "gdfsg",
    descriptionUz3: "dfgds",
    descriptionRu: "Как стать сомелье - для любителей. 1 занятие, 2,5 часа",
    descriptionRu2: "dsfg",
    descriptionRu3: "11111",
    date: "2023-04-11T08:22:54.049Z",
    price: 1000000,
  },
  {
    id: 402,
    titleUz: "Level 1 WineJet",
    titleRu: "1 уровень WineJet",
    descriptionUz:
      "How To Become a Sommelier - expert knowledge for non professionals and fans. 1 Lesson, 2.5 hours.",
    descriptionUz2: "gdfsg",
    descriptionUz3: "dfgds",
    descriptionRu: "Как стать сомелье - для любителей. 1 занятие, 2,5 часа",
    descriptionRu2: "dsfg",
    descriptionRu3: "11111",
    date: "2023-04-12T08:22:54.049Z",
    price: 1000000,
  },
  {
    id: 402,
    titleUz: "Level 1 WineJet",
    titleRu: "1 уровень WineJet",
    descriptionUz:
      "How To Become a Sommelier - expert knowledge for non professionals and fans. 1 Lesson, 2.5 hours.",
    descriptionUz2: "gdfsg",
    descriptionUz3: "dfgds",
    descriptionRu: "Как стать сомелье - для любителей. 1 занятие, 2,5 часа",
    descriptionRu2: "dsfg",
    descriptionRu3: "11111",
    date: "2023-04-18T08:22:54.049Z",
    price: 1000000,
  },
];

const months = {
  ru: [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ],
  uz: [
    "Yanvar",
    "Fevral",
    "Mart",
    "Aprel",
    "May",
    "Iyun",
    "Iyul",
    "Avgust",
    "Sentabr",
    "Oktabr",
    "Noyabr",
    "Dekabr",
  ],
};

const weekDays = {
  ru: [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ],
  uz: [
    "Yakshanba",
    "Dushanba",
    "Seshanba",
    "Chorshanba",
    "Payshanba",
    "Juma",
    "Shanba",
  ],
};

const CalendarPage = () => {
  const [isActive, setIsActive] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [uniqueDate, setUniqueDate] = useState([]);
  const [data, setData] = useState([]);
  const [coursesData, setCoursesData] = useState([]);

  const { i18n } = useTranslation();

  const activeLang = i18n.language;

  console.log(activeLang);

  const { t } = useTranslation();
  useEffect(() => {
    axios.get(`https://winejet-uz.herokuapp.com/api/courses`).then((res) => {
      setCoursesData(res.data);
    });
  }, []);

  /*   function shortenString(inputString) {
    const words = inputString.split(" ");
    const maxLength = 5;
    let shortenedString = words.slice(0, maxLength).join(" ");
    if (words.length > maxLength) {
      shortenedString += " ...";
    }
    return shortenedString;
  } */

  const sectonClasses = useMemo(
    () => ["calendar", isActive ? "trans-section" : ""].join(" ").trim(),
    [isActive]
  );
  return (
    <>
      <section className={sectonClasses}>
        <div className="calendar__container">
          <h1 className="calendar__title">
            {getContent("Календарь", "Kalendar")}
          </h1>
          <div className="react-calendar-wrapper">
            <CalendarComponent />
          </div>
          <div className="calendar__header-wrapper">
            <div onClick={() => setIsActive(true)}>
              <FilterWrapper />
            </div>
            <div className="calendar__header-currentData">
              <span>
                <HiOutlineChevronLeft />
              </span>
              <p>{getContent("апрель", "aprel")}, 2023</p>
              <span>
                <HiOutlineChevronRight />
              </span>
            </div>
          </div>
          <div
            style={{
              marginTop: "3rem",
            }}
          >
            <div className="calendar__date-wrapper">
              {/* {console.log(uniqueDate.length)} */}
              {/* {filteredData?.map((data) => (
              ))} */}
              {/*  {data.length ? ( */}
              <div className="filtered-courses">
                {Object.keys(filteredData).map((singleDay) => {
                  const date = new Date(singleDay);
                  console.log(singleDay);
                  return (
                    <div className="filtered-courses__single-day">
                      <div className="filtered-courses-date">
                        {date.getDate()}{" "}
                        <span>{months[activeLang][date.getMonth()]}</span>{" "}
                        <span>{weekDays[activeLang][date.getDay()]}</span>
                      </div>
                      <div className="filtered-courses__courses-wrapper">
                        {filteredData[singleDay].map((course) => {
                          return (
                            <Link to={`/courses/${course.id}`}>
                              <div className="filtered-courses__item">
                                <span className="filtered-courses__item-hour">
                                  {moment(course.date).format("HH:mm")}
                                </span>
                                <span className="filtered-courses__item-title">
                                  {getContent(course.titleRu, course.titleUz)}
                                </span>
                                <div className="filtered-courses__item-desc">
                                  {getContent(
                                    course.descriptionRu,
                                    course.descriptionUz
                                  )
                                    .split(" ")
                                    .slice(0, 3)
                                    .join(" ")}
                                  ...
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/*  ) : (
                <h1 className="not-found">{t("calendar.notFound")}</h1>
              )}  */}
            </div>
          </div>
        </div>
      </section>
      <AsideFilter
        isActive={isActive}
        setIsActive={setIsActive}
        coursesData={coursesData}
        setFilteredData={setFilteredData}
      />
    </>
  );
};

export default CalendarPage;
