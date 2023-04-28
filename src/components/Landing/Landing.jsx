import "./Landing.scss";
import React from "react";
import { useState, useEffect } from "react";
import { HiOutlineCalendar } from "react-icons/hi";
import { AiOutlineClockCircle } from "react-icons/ai";
import { TiLocationOutline } from "react-icons/ti";
import { useMediaQuery } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
const leftSideSlider = [
	{
		title: "Учебный центр ",
		titleSpan: "Виноградарства!",
		desc: "Torem ipsum dolor sit amet, consectetur adipiscing elit.",
	},
	{
		title: "Учебный центр ",
		titleSpan: "Виноградарства!",
		desc: "Torem ipsum dolor sit amet, consectetur adipiscing elit.",
	},
	{
		title: "Учебный центр ",
		titleSpan: "Виноградарства!",
		desc: "Torem ipsum dolor sit amet, consectetur adipiscing elit.",
	},
];

const rightSideSlider = [
	{
		date: "6 февраля",
		hours: "12:00",
		loc: "Учебный центр Виноградарства! ",
	},

	{
		date: "6 февраля",
		hours: "12:00",
		loc: "Учебный центр Виноградарства! ",
	},

	{
		date: "6 февраля",
		hours: "12:00",
		loc: "Учебный центр Виноградарства! ",
	},
];

const Landing = () => {
	const fakeData = [
		{
			// titleRu: "Учебный центр ",
			descriptionRu: "Виноградарства!",
			dateTime: "2023-05-29T20:47:00.000+00:00",
			location: "Taшкент, ...",
			price: "700.000",
		},

		{
			// titleRu: "Учебный центр ",
			descriptionRu: "Виноградарства!",
			dateTime: "2023-06-29T20:47:00.000+00:00",
			location: "Taшкент, ...",
			price: "300.000",
		},

		{
			// titleRu: "Учебный центр ",
			descriptionRu: "Виноградарства!",
			dateTime: "2023-07-29T20:47:00.000+00:00",
			location: "Taшкент, ...",
			price: "500.000",
		},
	];
	const [showData, setShowData] = useState(fakeData);
	const [width, setWidth] = useState(0);
	const [sliderPosition, setSliderPosition] = useState(0);
	const [activeDot, setActiveDot] = useState(0);
	const matches = useMediaQuery("(min-width: 576px)");
	const { pathname } = useLocation();
	useEffect(() => {
		axios.get(`https://winejet-uz.herokuapp.com/api/show-keys`).then((res) => {
			setShowData(res.data);
		});
	}, []);
	console.log("showcase data >>> ", showData);
	function calculateSliderPositions(numSliders, width) {
		const sliderPositions = [];

		for (let i = 0; i < numSliders; i++) {
			sliderPositions.push(i * width);
		}

		return sliderPositions;
	}

	const numberOfSlides =
		rightSideSlider.length === leftSideSlider.length
			? leftSideSlider.length
			: 0;

	useEffect(() => {
		if (matches) {
			setWidth(400);
		} else {
			setWidth(330);
		}
	}, [pathname, matches]);

	const sliderPositions = calculateSliderPositions(numberOfSlides, width);

	const handleDotClick = (index) => {
		setActiveDot(index);
		setSliderPosition(-sliderPositions[index]);
	};
	useEffect(() => {
		handleDotClick(0);
	}, [pathname, matches]);
	useEffect(() => {
		// Function to update the slider position
		const updateSlider = () => {
			// Increment the active slider index
			const nextIndex = activeDot === numberOfSlides - 1 ? 0 : activeDot + 1;
			setActiveDot(nextIndex);
			setSliderPosition(-sliderPositions[nextIndex]);
		};

		// Set the interval to update the slider every 30 seconds
		const intervalId = setInterval(updateSlider, 10000);

		// Clean up the interval when the component unmounts or when the active slider changes
		return () => clearInterval(intervalId);
	}, [activeDot, numberOfSlides, sliderPositions]);
	console.log(showData);
	return (
		<section
			className="landing"
			style={{
				background: "url('/images/headerBG.png')",
			}}
		>
			<div className="landing__wrapper">
				<div className="landing__right">
					<div className="landing__slider-wrapper">
						{showData?.map((item, i) => {
							// const [firstWord, ...others] = title.split(" ");
							return (
								<div
									className={`landing__slider ${
										activeDot === i ? "active-slider" : ""
									}`}
									style={{
										transform: `translateX(${sliderPosition + 0}px)`,
									}}
									key={i}
								>
									<h1 className={`${i !== 0 ? "notFirstSlide-title" : ""}`}>
										{item.titleRu} <span>{item.descriptionRu}</span>{" "}
									</h1>
									{/* <p>{desc}</p> */}
								</div>
							);
						})}
					</div>
					<Link className="buy" to="/courses">
						Купить
					</Link>
				</div>
				<div className="landing__left">
					<div className="landing__slider-wrapper">
						{showData?.map((item, i) => (
							<ul
								key={i}
								className={`landing__slider ${
									activeDot === i ? "active-slider" : ""
								}`}
								style={{
									transform: `translateX(${sliderPosition}px)`,
								}}
							>
								<div className="li-wrap">
									<li>
										<span>
											<HiOutlineCalendar />
										</span>
										<p>{item.dateTime.slice(0, item.dateTime.length - 19)}</p>
									</li>
									<li>
										<span>
											<AiOutlineClockCircle />
										</span>
										<p>{item.dateTime.slice(11, item.dateTime.length - 13)}</p>
									</li>
									<li>
										<span>
											<TiLocationOutline />
										</span>
										<p className="landing__slider-loc">{item.location}</p>
									</li>
									<li>
										<h6>{item.price} сум</h6>
									</li>
								</div>
							</ul>
						))}
					</div>
					{/* <h6>700.000 сум</h6> */}
				</div>
			</div>
			<div className="landing__dots-container">
				<div className="landing__dots-wrapper">
					{Array.from({ length: numberOfSlides }, (_, i) => (
						<div
							className={`slider-dots ${activeDot === i ? "active-dot" : ""}`}
							key={i}
							onClick={() => handleDotClick(i)}
						></div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Landing;
