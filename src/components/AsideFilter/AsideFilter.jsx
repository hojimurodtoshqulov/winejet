import "./AsideFilter.scss";
import { IoIosClose } from "react-icons/io";
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { useEffect, useState } from "react";
import { FilterWrapper } from "../pages/CalendarPage/CalendarPage";
import { getContent } from "../../utils/changeLang";
import { useTranslation } from "react-i18next";
import axios from "axios";
const DayHour = ({ label, value }) => {
	return (
		<div className="asideFilter__hours-wrapper">
			<h1 className="asideFilter__titles">{label} </h1>
			<input type="text" value={value} />
		</div>
	);
};
const staticData = {
	courses: [
		{
			img: "/images/course-img1.jpg",
			titleRu: "Курс Сомелье. WineJet Diploma",
			titleUz: "Level 4 WineJet Diploma",
			link: "",
			created_on: "2023-05-04T00:00:00.000+00:00",
			short_content_ru:
				"Курс Сомелье -  для начинающих экспертов. Обладателям 3 уровня WineJet. 20 очных занятий по 2,5 часа, 20 видео-уроков.",
			short_content_uz:
				"Sommelier Course -  expert knowledge for professionals and those who have completed Level 3 WineJet. 20 face-to-face lessons of 2.5 hours each plus 20 video lessons.",
		},
		{
			img: "/images/course-img2.jpg",
			titleRu: "1 уровень WineJet",
			titleUz: "Level 1 WineJet",
			link: "",
			created_on: "2023-05-01T00:00:00.000+00:00",
			short_content_ru:
				"Как стать сомелье - для любителей. 1 занятие, 2,5 часа!",
			short_content_uz:
				"How To Become a Sommelier - expert knowledge for non professionals and fans. 1 Lesson, 2.5 hours!",
		},
		{
			img: "/images/course-img3.jpg",
			titleRu: "2 уровень WineJet",
			titleUz: "Level 2 WineJet",
			link: "",
			created_on: "2023-05-02T00:00:00.000+00:00",
			short_content_ru:
				"Однодневный винный интенсив - для любителей и профессионалов, 2 занятия по 2,5 часа.",
			short_content_uz:
				"One day wine intensive course - expert knowledge for wine lovers and trainees. 2 lessons, 2.5 hours each!",
		},
		{
			img: "/images/course-img3.jpg",
			titleRu: "4 уровень WineJet",
			titleUz: "Level 4 WineJet",
			link: "",
			created_on: "2023-05-02T00:00:00.000+00:00",
			short_content_ru:
				"Однодневный винный интенсив - для любителей и профессионалов, 2 занятия по 2,5 часа.",
			short_content_uz:
				"One day wine intensive course - expert knowledge for wine lovers and trainees. 2 lessons, 2.5 hours each!",
		},
		{
			img: "/images/course-img3.jpg",
			titleRu: "5 уровень WineJet",
			titleUz: "Level 5 WineJet",
			link: "",
			created_on: "2023-05-02T00:00:00.000+00:00",
			short_content_ru:
				"Однодневный винный интенсив - для любителей и профессионалов, 2 занятия по 2,5 часа.",
			short_content_uz:
				"One day wine intensive course - expert knowledge for wine lovers and trainees. 2 lessons, 2.5 hours each!",
		},
	],
};
const AsideFilter = ({ isActive, setIsActive }) => {
	const [filterData, setFilterData] = useState(staticData.courses);
	useEffect(() => {
		if (isActive) {
			document.querySelector("body").style.overflow = "hidden";
		} else {
			document.querySelector("body").style.overflow = "auto";
		}
	}, [isActive]);
	useEffect(() => {
		axios.get(`https://winejet-uz.herokuapp.com/api/courses`).then((res) => {
			setFilterData(res.data);
		});
	}, []);

	{
		console.log("aside filter Data >>>", filterData);
	}
	return (
		<aside
			className={`asideFilter__side-container ${
				isActive ? "asideFilter__side-active" : ""
			}`}
		>
			<div
				style={{
					textAlign: "end",
				}}
			>
				<span
					className="asideFilter__close-icons"
					onClick={() => setIsActive(false)}
				>
					<IoIosClose />
				</span>
			</div>
			<div
				style={{
					marginTop: "3rem",
				}}
			>
				<div
					style={{
						display: "flex",
						justifyContent: "center",
					}}
				>
					<FilterWrapper />
				</div>
				<div className="asideFilter__checkbox-wrapper">
					{filterData?.map((item, index) => (
						<FormGroup
							key={index}
							sx={{
								mb: "3rem",
							}}
						>
							<FormControlLabel
								control={
									<Checkbox
										sx={{
											fontSize: "24rem",
											color: "white",
											transform: "scale(1.5)",
										}}
									/>
								}
								label={
									<p
										style={{
											fontSize: "2.4rem",
											color: "white",
											marginLeft: "5rem",
										}}
									>
										{getContent(item.titleRu, item.titleUz)}
									</p>
								}
								sx={{ fontSize: "24rem", color: "white" }}
							/>
						</FormGroup>
					))}
					<DayHour value="22.00" label={getContent("время", "vaqt")} />
					{filterData?.map((item) => (
						<FormGroup
							key={item}
							sx={{
								mb: "3rem",
							}}
						>
							<FormControlLabel
								control={
									<Checkbox
										sx={{
											fontSize: "24rem",
											color: "white",
											transform: "scale(1.5)",
										}}
									/>
								}
								label={
									<p
										style={{
											fontSize: "2.4rem",
											color: "white",
											marginLeft: "5rem",
										}}
									>
										Worem ipsum
									</p>
								}
								sx={{ fontSize: "24rem", color: "white" }}
							/>
						</FormGroup>
					))}
					{/* <DayHour value="12.12.12" label="день" /> */}
				</div>
			</div>
		</aside>
	);
};

export default AsideFilter;
