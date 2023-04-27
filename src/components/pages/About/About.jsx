import { useTranslation } from "react-i18next";
import "./About.scss";
import { useEffect, useState } from "react";
import axios from "axios";
const About = () => {
	const { t } = useTranslation();
	const [data, setData] = useState([]);
	useEffect(() => {
		axios.get(`https://winejet-uz.herokuapp.com/api/about-us`).then((res) => {
			setData(res.data);
		});
	}, []);
	return (
		<section className="about-page">
			<div className="about-page__container">
				<h1 data-aos="fade-up" className="about-page__title">
					о нас
				</h1>
				<div className="about-page__wrapper">
					<div className="about-page__right">
						<div className="about-wrapper">
							<div className="about-card">
								{/* <h1 data-aos="fade-up">{t("aboutus.title")}</h1>
								<p data-aos="fade-right" className="about-page__desc">
									{t("aboutus.info")}
								</p> */}
								<h1 data-aos="fade-up">{data.titleRu}</h1>
								<p data-aos="fade-right" className="about-page__desc">
									{data.descriptionRu}
								</p>
							</div>
						</div>
					</div>
					<div className="about-page__left">
						<div data-aos="fade-left" className="about-left-imgWrapper">
							<img
								src={`data:image/png;base64,${data?.attachmentContent?.data}`}
								alt="about-us image"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default About;
