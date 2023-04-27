import "./Courses.scss";
import i18next from "i18next";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import { Card } from "../../";
import { getContent } from "../../../utils/changeLang";
import { Box, Skeleton } from "@mui/material";

const staticData = {
	data: [
		{
			img: "/images/grape1.png",
			title_ru: "Porem ipsum dolor ",
			title_uz: "Porem ipsum dolor",
			link: "",
			created_on: Date.now(),
			short_content_ru: "Morem ipsum dolor sit amet, consectetur",
			short_content_uz: "Morem ipsum dolor sit amet, consectetur",
		},
		{
			img: "/images/grape2.png",
			title_ru: "Porem ipsum dolor ",
			title_uz: "Porem ipsum dolor",
			link: "",
			created_on: Date.now(),
			short_content_ru: "Morem ipsum dolor sit amet, consectetur",
			short_content_uz: "Morem ipsum dolor sit amet, consectetur",
		},
		{
			img: "/images/grape3.png",
			title_ru: "Porem ipsum dolor ",
			title_uz: "Porem ipsum dolor",
			link: "",
			created_on: Date.now(),
			short_content_ru: "Morem ipsum dolor sit amet, consectetur",
			short_content_uz: "Morem ipsum dolor sit amet, consectetur",
		},
		{
			img: "/images/grape4.png",
			title_ru: "Porem ipsum dolor ",
			title_uz: "Porem ipsum dolor",
			link: "",
			created_on: Date.now(),
			short_content_ru: "Morem ipsum dolor sit amet, consectetur",
			short_content_uz: "Morem ipsum dolor sit amet, consectetur",
		},
		{
			img: "/images/grape5.png",
			title_ru: "Porem ipsum dolor ",
			title_uz: "Porem ipsum dolor",
			link: "",
			created_on: Date.now(),
			short_content_ru: "Morem ipsum dolor sit amet, consectetur",
			short_content_uz: "Morem ipsum dolor sit amet, consectetur",
		},
		{
			img: "/images/grape6.png",
			title_ru: "Porem ipsum dolor ",
			title_uz: "Porem ipsum dolor",
			link: "",
			created_on: Date.now(),
			short_content_ru: "Morem ipsum dolor sit amet, consectetur",
			short_content_uz: "Morem ipsum dolor sit amet, consectetur",
		},
	],
};

const Courses = () => {
	const [current, setCurrent] = useState(0);
	const [data, setData] = useState([]);
	const [showCoursesData, setShowCoursesData] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [tab, setTab] = useState(["tab1", "tab2", "tab3", "tab4"]);

	useEffect(() => {
		axios.get(`https://winejet-uz.herokuapp.com/api/courses`).then((res) => {
			console.log(res);
			setFilteredData(
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
			setFilteredData(res.data.data.result);
			setData(res.data.data.result);
		});
	}, []);
	useEffect(() => {
		axios
			.get(`https://winejet-uz.herokuapp.com/api/courses-showcase`)
			.then((res) => {
				setShowCoursesData(res.data);
				// console.log("ShowCoursesData >>> ", res.data);
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
	return (
		<>
			<section
				className="courses"
				style={{
					background:
						"linear-gradient(90deg, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(/images/courses-back.png)",
				}}
			>
				<div className="courses__container">
					<div className="courses__wrapper">
						<h1 data-aos="flip-up">{showCoursesData?.titleRu}</h1>
						<p data-aos="flip-down">{showCoursesData?.descriptionRu}</p>
					</div>
				</div>
			</section>

			<section className="courses-items">
				<div className="courses-items__container">
					<div>
						<h1 data-aos="fade-down" className="courses-items__title">
							все курсы
						</h1>

						<ul className="courses-items__tab-wrapper">
							<li
								onClick={() => handleTabClick(0)}
								className={`${current === 0 ? "active-tab" : ""}`}
							>
								Все
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
