import {
	json,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";

import { useChangeLanguage } from "remix-i18next/react";
import { useTranslation } from "react-i18next";
import { isSupportedLanguage } from "./localization/i18n";
import i18next from "./localization/i18next.server";

import spriteHref from "./assets/icons/sprite.svg?url";
import "./tailwind.css";

const fonts = {
	inter: "family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900",
	playfair: "family=Playfair+Display:ital,wght@0,400..900;1,400..900",
	jost: "family=Jost:ital,wght@0,100..900;1,100..900",
	josefinSans: "family=Josefin+Sans:ital,wght@0,100..700;1,100..700",
};

export const links: LinksFunction = () => [
	{ rel: "preconnect", href: "https://fonts.googleapis.com" },
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous",
	},
	{
		rel: "stylesheet",
		href: `https://fonts.googleapis.com/css2?${Object.values(fonts).join("&")}&display=swap`,
	},
	{ rel: "preload", href: spriteHref, as: "image", type: "image/svg+xml" },
];

export async function loader({ request, params }: LoaderFunctionArgs) {
	if (!params.lang) return json({ lang: "en" });

	const lang = isSupportedLanguage(params.lang)
		? params.lang
		: await i18next.getLocale(request);

	return json({ lang });
}

export const handle = { i18n: "common" };

export default function App() {
	const { lang } = useLoaderData<typeof loader>();
	const { i18n } = useTranslation();
	useChangeLanguage(lang);

	return (
		<html lang={lang} dir={i18n.dir()}>
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				<h1>Lang {lang}</h1>
				<Outlet />
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}
