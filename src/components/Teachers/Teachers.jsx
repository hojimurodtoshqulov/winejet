import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  IoMdArrowDroprightCircle,
  IoMdArrowDropleftCircle,
} from "react-icons/io";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import "./Teachers.scss";
import { Box, Skeleton, useMediaQuery } from "@mui/material";
import Slider from "react-slick";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { getContent } from "../../utils/changeLang";

const images = [
  {
    id: 1,
    src: "/images/america1.jpg",
    alt: "Image 1",
    title: "Title 1",
    description:
      "fldaskfjls fdslfjs kdlf safjakfl sdfjsd lfdjkfl asfdjf saldflj",
    date: "Date 1",
    fullname: "Алексей Петрович",
  },
  {
    id: 2,
    src: "/images/america2.png",
    alt: "Image 2",
    title: "Title 2",
    description:
      "fijldsajfsl fdfjl affjsl fdjsfl ksadjflf dsjlfk sdjfdsl  jfd fdajfkl afj lj alsfjd fls",
    date: "Date 2",
    fullname: "Михаил Алевич",
  },
  {
    id: 2,
    src: "/images/america3.jpg",
    alt: "Image 2",
    title: "Title 2",
    description:
      "fijldsajfsl fdfjl affjsl fdjsfl ksadjflf dsjlfk sdjfdsl  jfd fdajfkl afj lj alsfjd fls",
    date: "Date 2",
    fullname: "Владимир Влович",
  },
  {
    id: 2,
    src: "/images/america4.jpg",
    alt: "Image 2",
    title: "Title 2",
    description:
      "fijldsajfsl fdfjl affjsl fdjsfl ksadjflf dsjlfk sdjfdsl  jfd fdajfkl afj lj alsfjd fls",
    date: "Date 2",
    fullname: "Игорь Дмитриевич",
  },
  {
    id: 1,
    src: "/images/america5.jpg",
    alt: "Image 1",
    title: "Title 1",
    description:
      "fldaskfjls fdslfjs kdlf safjakfl sdfjsd lfdjkfl asfdjf saldflj",
    date: "Date 1",
    fullname: "Сергей Александрович",
  },
  // add more image objects as needed
];
const staticTecherUnder = {
  titleRu: "Курс 'Производство столового винограда'",
  titleUz: "'Stol uzumlarini ishlab chiqarish' kursi",
  descriptionRu1:
    "Современная программа обучения и постоянная поддержка экспертов-преподавателей позволит вам продуктивно и быстро освоить данную сферу.",
  descriptionUz1:
    "Eng zamonaviy o'quv dasturi va doimiy qo'llab-quvvatlash tajribali o'qituvchilar sizga samarali va tez yordam beradi bu sohani o'zlashtiring.",
  descriptionRu2:
    "СОСТАВЛЕНВИНОГРАДАРЯМИ И ВИНОДЕЛАМИ С ОПЫТОМ РАБОТЫ В УЗБЕКИСТАНЕ, РОССИИ И ФРАНЦИИ.",
  descriptionUz2:
    "O'ZBEKISTON, ROSSIYA VA FRANSADA TAJRIBASI BO'LGAN UZIMCHILAR VA VINOCHILAR TOMONIDAN TUZILGAN.",
};
function CustomLeftArrow({ className, style, onClick }) {
  return (
    <IoMdArrowDropleftCircle
      style={{
        ...style,
      }}
      className={className}
      onClick={onClick}
    />
  );
}
function CustomRightArrow({ className, style, onClick }) {
  return (
    <IoMdArrowDroprightCircle
      style={{
        ...style,
      }}
      className={className}
      onClick={onClick}
    />
  );
}
const Teachers = () => {
  const [data, setData] = useState([...images]);
  const [techerUnderData, setTecherUnderData] = useState(staticTecherUnder);
  //   const [teachersData, setTeachersData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const { ref, inView } = useInView({
    threshold: 0.5,
  });
  // useEffect(() => {
  // 	setSelectedImage(data[0]);
  // }, [data]);

  let slidesShow = data?.length >= 5 ? 5 : data?.length;
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slidesShow,
    centerMode: true,
    slidesToScroll: 1,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 1260,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1052,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 570,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          variableWidth: true,
          variableHeight: true,
        },
      },
    ],
  };

  const { t } = useTranslation();
  const isDesktop = useMediaQuery("(min-width:900px)");
  const controls1 = useAnimation();
  const controls2 = useAnimation();
  const handleAnimation = async () => {
    if (inView) {
      await controls1.start({ y: 0, opacity: 1 });
      await controls2.start({ y: 0, opacity: 1 });
    } else {
      await controls1.start({ y: 50, opacity: 0 });
      await controls2.start({ y: 50, opacity: 0 });
    }
  };
  // const { id } = useParams();
  const [data1, setData1] = useState([]);
  const [count, setCount] = useState(1);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  function handleClick(image) {
    setSelectedImage(image);
  }
  function handleHover(image) {
    setSelectedImage(image);
  }
  useEffect(() => {
    handleAnimation();
  }, [inView]);
  // useEffect(() => {
  // 	axios.get(`https://winejet-uz.herokuapp.com/api/teachers`).then((res) => {
  // 		setData1(res.data);
  // 	});
  // }, [count]);
  useEffect(() => {
    axios
      .get(`https://winejet-uz.herokuapp.com/api/teachers`)
      .then((res) => {
        setData(
          res.data.map((item) => {
            return {
              id: item.id,
              src: `https://winejet-uz.herokuapp.com/api/files/${item.attachmentContentId}`,
              alt: item.fullName,
              description: item.infoRu,
              date: " ",
              fullname: item.fullName,
            };
          })
        );
        // const imageAttachment = res.data.attachmentContent;
        // const base64Data = imageAttachment.data;
        // const imageUrl = `data:image/png;base64,${base64Data}`;
        // setImage(imageUrl);
        // setData({
        //   fullName: res.data.fullName,
        //   infoRu: res.data.infoRu,
        //   infoUz: res.data.infoUz,
        //   attachmentId: res.data.attachment.id,
        //   id: res.data.id,
        // });
        // console.log("attachment >>> ", base64Data);
      })
      .then((data) => setLoading(false));
  }, []);
  useEffect(() => {
    axios
      .get(`https://winejet-uz.herokuapp.com/api/teacher-under-case`)
      .then((res) => {
        setTecherUnderData(res.data);
      })
      .then((data) => setLoading(false));
  }, []);
  console.log("techerUnderData >>> ", techerUnderData);

  return (
    <section className="teachers" ref={ref}>
      <div className="teachers__container">
        <h1 className="teachers__title">{t("teacher.header")}</h1>
      </div>
      <div className="teachers__img-wrapper">
        {data.length ? (
          data.map((img, i) =>
            isDesktop ? (
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={controls1}
                transition={{ duration: 0.5, type: "tween" }}
                className="teachers__img"
                key={i}
              >
                <img src={img.src} alt="teachers" />
                <p>{img.fullname}</p>
              </motion.div>
            ) : (
              <div className="teachers__img" key={i}>
                <img src={img.src} alt="teachers" />
                <p>{img.fullname}</p>
              </div>
            )
          )
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
      </div>
      {/* <div className="slider-container">
				<div className="teachers__img-wrapp">
					<Slider
						{...settings}
						nextArrow={<CustomRightArrow />}
						prevArrow={<CustomLeftArrow />}
					>
						{data?.map((img, i) => (
							<div
								className={`teachers__img`}
								key={i}
								onClick={() => handleClick(img)}
								onMouseOver={() => handleHover(img)}
							>
								<img
									// src={process.env.REACT_APP_FILE_URL + img?.file_name}
									src={process.env.REACT_APP_FILE_URL + img?.file_name}
									alt="teachers"
								/>
							</div>
						))}
					</Slider>
				</div>
			</div> */}
      <div className="teachers__container">
        {isDesktop ? (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={controls2}
            transition={{ duration: 0.5, type: "tween" }}
            className="teachers__info-wrapper"
          >
            <div className="teachers__info-left">
              <h1>
                {getContent(techerUnderData.titleRu, techerUnderData.titleUz)}
              </h1>
              <p className="teachers__info-p">
                {/* {getContent(
									selectedImage?.short_content_ru,
									selectedImage?.short_content_uz
								)} */}
                {getContent(
                  techerUnderData.descriptionRu1,
                  techerUnderData.descriptionUz1
                )}
              </p>
            </div>
            <div className="teachers__info-right">
              <p>
                {getContent(
                  techerUnderData.descriptionRu2,
                  techerUnderData.descriptionUz2
                )}
              </p>
            </div>
          </motion.div>
        ) : (
          <div className="teachers__info-wrapper">
            <div className="teachers__info-left">
              <h1>
                {getContent(
                  "Курс 'Производство столового винограда'",
                  "'Stol uzumlarini ishlab chiqarish' kursi"
                )}
              </h1>
              <p className="teachers__info-p">
                {getContent(
                  "Современная программа обучения и постоянная поддержка экспертов-преподавателей позволит вам продуктивно и быстро освоить данную сферу.",
                  "Eng zamonaviy o'quv dasturi va doimiy qo'llab-quvvatlash tajribali o'qituvchilar sizga samarali va tez yordam beradi bu sohani o'zlashtiring."
                )}
              </p>
            </div>
            <div className="teachers__info-right">
              <p>{t("teacher.info")}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Teachers;
