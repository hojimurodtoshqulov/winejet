import { useEffect } from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "./Section6.scss";
import { useMediaQuery } from "@mui/material";

const Section6 = () => {
	const { ref, inView } = useInView({
		threshold: 0.3,
	});

	const isDesktop = useMediaQuery("(min-width:900px)");

	const controls1 = useAnimation();
	const controls2 = useAnimation();

	const handleAnimation = () => {
		if (inView) {
			controls1.start({ x: 0, opacity: 1 });
			controls2.start({ x: 0, opacity: 1 });
		} else {
			controls1.start({ x: -50, opacity: 0 });
			controls2.start({ x: 50, opacity: 0 });
		}
	};

	useEffect(() => {
		handleAnimation();
	}, [inView]);
	return (
		<section className="section6" ref={ref}>
			<div className="section6__container">
				<h1 className="section6__title">
					Миссия и цели Учебного центра Виноградарства!
				</h1>
				<div className="section6__img-wrapper">
					{isDesktop ? (
						<motion.div
							className="section6__img"
							initial={{ x: -50, opacity: 0 }}
							animate={controls1}
							transition={{ duration: 0.4, type: "tween" }}
						>
							<img src="/images/missiyaImg1.jpg" alt="" />
						</motion.div>
					) : (
						<div className="section6__img">
							<img src="/images/missiyaImg1.jpg" alt="" />
						</div>
					)}
					{isDesktop ? (
						<motion.div
							className="section6__img"
							initial={{ x: 50, opacity: 0 }}
							animate={controls2}
							transition={{ duration: 0.4, type: "tween" }}
						>
							<img src="/images/missiyaImg2.jpg" alt="" />
						</motion.div>
					) : (
						<div className="section6__img">
							<img src="/images/missiyaImg2.jpg" alt="" />
						</div>
					)}
					<div className="section6__card1">
						<p>
							Улучшить развитие отрасли виноградарства в Узбекистане. Повышение
							качества обслуживания и культуры пития; Развитие барного искусства
							и барной индустрии; Разработка и реализация новых более
							качественных правил и стандартов профессиональной деятельности
							барменов, официантов и других работников индустрии гостеприимства;
						</p>
					</div>
				</div>
				<div className="section6__img-wrapper">
					{isDesktop ? (
						<motion.div
							initial={{ x: -50, opacity: 0 }}
							animate={controls1}
							transition={{ duration: 0.4, type: "tween", delay: 0.4 }}
							className="section6__img2"
						>
							<img src="/images/missiyaImg3.jpg" alt="" />
						</motion.div>
					) : (
						<div className="section6__img2">
							<img src="/images/missiyaImg3.jpg" alt="" />
						</div>
					)}
					{isDesktop ? (
						<motion.div
							initial={{ x: 50, opacity: 0 }}
							animate={controls2}
							transition={{ duration: 0.4, type: "tween", delay: 0.4 }}
							className="section6__img2"
						>
							<img src="/images/missiyaImg4.jpg" alt="" />
						</motion.div>
					) : (
						<div className="section6__img2">
							<img src="/images/missiyaImg4.jpg" alt="" />
						</div>
					)}
					<div className="section6__card2">
						<p>
							Впервые в Узбекистане, наиболее полная программа о виноделии нашей
							страны, который познакомит вас с историей и современным развитием
							виноделия Узбекистана! Откройте для себя мир виноградарство,
							вместе с нами
						</p>
					</div>
				</div>
				<div className="section6__footer-card-wrapper">
					<div className="section6__footer-card">
						<p>
							Впервые в Узбекистане, наиболее полная программа о виноделии нашей
							страны, который познакомит вас с историей и современным развитием
							виноделия Узбекистана! Откройте для себя мир виноградарство,
							вместе с нами
						</p>
					</div>
					<div className="section6__footer-card">
						<p>
							Улучшить развитие отрасли виноградарства в Узбекистане. Повышение
							качества обслуживания и культуры пития; Развитие барного искусства
							и барной индустрии; Разработка и реализация новых более
							качественных правил и стандартов профессиональной деятельности
							барменов, официантов и других работников индустрии гостеприимства;
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Section6;
