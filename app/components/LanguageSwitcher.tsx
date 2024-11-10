import { Link, useParams } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { supportedLngs } from "~/localization/i18n";

export const LanguageSwitcher = () => {
	const { i18n } = useTranslation();
	const params = useParams();
	return (
		<div className="flex gap-1">
			{supportedLngs.map((language) => (
				<Link
					to={`/${language}`}
					key={language}
					className={`border rounded px-1 border-sky-700  ${params.lang === language ? "bg-sky-200 text-bg-sky-700" : "bg-sky-700 text-white"}`}
					onClick={() => i18n.changeLanguage(language)}
				>
					{language}
				</Link>
			))}
		</div>
	);
};
