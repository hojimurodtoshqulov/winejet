import "./Calendar.scss";
import { useEffect, useState } from "react";
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

const items = [
	{
		alias: "link",
		created_on: new Date(),
		title_uz: "title uz",
		title_ru: "title uz",
		short_content_ru: "short content",
	},
	{
		alias: "link",
		created_on: new Date(),
		title_uz: "title uz",
		title_ru: "title uz",
		short_content_ru: "short content",
	},
	{
		alias: "link",
		created_on: new Date(),
		title_uz: "title uz",
		title_ru: "title uz",
		short_content_ru: "short content",
	},
];

const CalendarPage = () => {
	const [isActive, setIsActive] = useState(false);
	const [filteredData, setFilteredData] = useState([]);
	const [uniqueDate, setUniqueDate] = useState([]);
	const [data, setData] = useState([]);
	const { t } = useTranslation();
	useEffect(() => {
		axios.get(`https://winejet-uz.herokuapp.com/api/courses`).then((res) => {
			setData(res.data);
		});
	}, []);
	console.log("courses data in calendar >>>", data);
	useEffect(() => {
		return;
		const uniqueDates = Array.from(
			new Set(
				filteredData?.map((item) =>
					moment(item.created_on).locale("en").format("ddd, D")
				)
			)
		);
		setUniqueDate(uniqueDates);
	}, [filteredData]);
	function shortenString(inputString) {
		const words = inputString.split(" ");
		const maxLength = 5;
		let shortenedString = words.slice(0, maxLength).join(" ");
		if (words.length > maxLength) {
			shortenedString += " ...";
		}
		return shortenedString;
	}
	return (
		<>
			<section className="calendar">
				<div className="calendar__container">
					<h1 className="calendar__title">
						{getContent("Календарь", "Kalendar")}
					</h1>
					<div className="react-calendar-wrapper">
						<CalendarComponent setFilteredData={setFilteredData} />
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
							{data.length ? (
								data?.map((item) => (
									<>
										<div className="calendar__weekDay">
											{/* <p>{data?.slice(4)}</p> */}
											<p> {item.titleRu}</p>
											<span>
												{getContent(
													weekdays["ru"][item?.titleRu.slice(0, 3)],
													weekdays["uz"][item?.titleUz.slice(0, 3)]
												)}
											</span>
										</div>
										
										{data?.map((item) => (
											<Link
												to={`/courses/${item.alias}`}
												className="calendar__hour-info"
											>
												<p>{moment(item.created_on).format("LT")}</p>
												<p>{moment(item.created_on).format("LT")}</p>
												<h3>
													{
// shortenString(
														getContent(item.descriptionRu, item.descriptionUz)
													// )
}
												</h3>
												<h3>
													{
// shortenString(
														getContent(item.descriptionRu, item.descriptionUz)
													// )
}
												</h3>
												<span>
													{
// shortenString(
														getContent(
															item.short_content_ru,
															item.short_content_uz
														)
													// )
}
												</span>
												<span>
													{
// shortenString(
														getContent(
															item.short_content_ru,
															item.short_content_uz
														)
													// )
}
												</span>
											</Link>
										))}
									</>
								))
							) : (
								<h1 className="not-found">{t("calendar.notFound")}</h1>
							)}
						</div>
					</div>
				</div>
			</section>
			<AsideFilter isActive={isActive} setIsActive={setIsActive} />
		</>
	);
};

export default CalendarPage;
