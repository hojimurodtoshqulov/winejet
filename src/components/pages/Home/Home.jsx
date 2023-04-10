import "./Home.scss";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, Landing, Section3, Section5, Section6, Teachers } from "../../";
import axios from "axios";
import { Link } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
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

	useEffect(() => {
		axios
			.get("http://192.168.0.154:8080/api/courses/get-main")
			.then((res) => console.log(res));
	}, []);
	const { t } = useTranslation();
	const [data, setData] = useState(staticData.courses);
	const isDesktop = useMediaQuery("(min-width:900px)");

	const animateCard = {
		opacity: inView ? 1 : 0,
		y: inView ? 0 : 50,
	};

	// useEffect(() => {
	// 	axios
	// 		.get(`${process.env.REACT_APP_API_URL}courses/get-main`)
	// 		.then((res) => {
	// 			setData(res?.data?.data?.result);
	// 		});
	// }, []);

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
					{data
						? data
								?.filter((item, i) => i < 3)
								.map((item, i) =>
									isDesktop ? (
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
												link={item.alias}
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
												link={item.alias}
												date={item.created_on}
												short_content_ru={item.short_content_ru}
												short_content_uz={item.short_content_uz}
											/>
										</div>
									)
								)
						: ""}
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
