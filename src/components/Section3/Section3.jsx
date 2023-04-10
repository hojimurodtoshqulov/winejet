import "./Section3.scss";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";

const Section3 = () => {
	const isDesktop = useMediaQuery("(min-width:900px)");
	const { ref, inView } = useInView({
		threshold: 0.4,
	});

	const { t } = useTranslation();

	const animate1 = {
		opacity: inView ? 1 : 0,
		x: inView ? 50 : -100,
	};

	return (
		<section className="section3-page" ref={ref} id="section3-page">
			<div className="section3-page__container">
				<div className="section3-page__wrapper">
					<div className="section3-page__right">
						{isDesktop ? (
							<motion.div
								initial={{ x: -50, opacity: 0 }}
								animate={animate1}
								transition={{ duration: 0.4, type: "tween" }}
								className="section3-wrapper"
							>
								<span
									style={{ fontWeight: 900 }}
									className="section3-card-header"
								>
									{t("aboutus.header")}
								</span>
								<div className="section3-card">
									<h1>{t("aboutus.title")}</h1>
									<p className="section3-page__desc">{t("aboutus.info")}</p>
								</div>
							</motion.div>
						) : (
							<div className="section3-wrapper">
								<span className="section3-card-header">
									{t("aboutus.header")}
								</span>
								<div className="section3-card">
									<h1>{t("aboutus.title")}</h1>
									<p className="section3-page__desc">{t("aboutus.info")}</p>
								</div>
							</div>
						)}
					</div>
					<div className="section3-page__left">
						<div className="section3-left-imgWrapper">
							<img src="/images/w.png" alt="" />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Section3;
