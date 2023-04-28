import styles from "./style.module.scss";
import CustoMap from "../CustomMap/CustomMap";
import { useTranslation } from "react-i18next";
import { getContent } from "../../utils/changeLang";
const SectionMap = () => {
	return (
		<div className={styles.container}>
			<h1 className={styles.title}> {getContent("КАРТА", "Joylashuv")}</h1>
			<div className={styles.cardWrapper}>
				<CustoMap />
			</div>
		</div>
	);
};

export default SectionMap;
