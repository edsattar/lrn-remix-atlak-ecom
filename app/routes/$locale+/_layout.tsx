import { LoaderFunctionArgs } from "@remix-run/node";
import { json, Outlet, useLoaderData } from "@remix-run/react";

export async function loader({ params }: LoaderFunctionArgs) {
	const locale = params.locale;
	return json({ locale });
}
export default function Layout() {
	const { locale } = useLoaderData<typeof loader>();
	return (
		<div>
			<h1>From $locale+/_layout.tsx locale:{locale}</h1>
			<Outlet />
		</div>
	);
}
