import { Icon } from "~/components/icons";
import { useTranslation } from "react-i18next";

export default function Index() {
	let { t, i18n } = useTranslation();
	return (
		<div>
			<h1 className="font-bold">Welcome to Remix</h1>
			<h1>{t("greeting")}</h1>
			<h2>Alem Tuzlak Tutorial</h2>
      <button onClick={() => i18n.changeLanguage("en") }>English</button>
      <button onClick={() => i18n.changeLanguage("es") }>Spanish</button>
			<Icon name="rd/camera" className="w-5 h-5" />
		</div>
	);
}
