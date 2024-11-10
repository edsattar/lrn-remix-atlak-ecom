import { Icon } from "~/components/icons";
import { useTranslation } from "react-i18next";
import { Outlet, useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/node";
import { LanguageSwitcher } from "~/components/LanguageSwitcher";

export const loader = async ({ params }: LoaderFunctionArgs) => {
	const lang = params.lang || "en";
	// Load blog posts for the current language
	return { title: `Blog (${lang})`, lang };
};
export default function Layout() {
	let { t } = useTranslation();
	const { title } = useLoaderData<typeof loader>();
	return (
		<div>
			<h1 className="font-bold">Welcome to Remix</h1>
			<h1>{t("greeting")}</h1>
			<h3>TITLE {title}</h3>
      <LanguageSwitcher />
			<Icon name="rd/camera" className="w-5 h-5" />
      <Outlet />
		</div>
	);
}
