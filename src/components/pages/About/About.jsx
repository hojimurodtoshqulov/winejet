import "./About.scss";

const About = () => {
	return (
		<section className="about-page">
			<div className="about-page__container">
				<h1 className="about-page__title">о нас</h1>
				<div className="about-page__wrapper">
					<div className="about-page__right">
						<div className="about-wrapper">
							<div className="about-card">
								<h1>Учебный центр Виноградства</h1>
								<p className="about-page__desc">
									Это уникальный образовательный проект, созданный для тех, кто
									хочет построить серьезную карьеру в винной индустрии, повысить
									свою квалификацию или просто получить базовые знания о вине,
									чтобы испытывать еще больше удовольствия от благородного
									напитка и самостоятельно выбирать хорошее в ресторане или
									супермаркете.
								</p>
							</div>
						</div>
					</div>
					<div className="about-page__left">
						<div className="about-left-imgWrapper">
							<img src="/images/w.png" alt="" />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default About;
