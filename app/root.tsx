import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import "./tailwind.css";
import iconHref from "~/components/icons/sprite.svg";

const fonts = {
  inter: "family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900",
  playfair: "family=Playfair+Display:ital,wght@0,400..900;1,400..900",
  jost: "family=Jost:ital,wght@0,100..900;1,100..900",
  josefinSans: "family=Josefin+Sans:ital,wght@0,100..700;1,100..700",
};

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  { rel: "stylesheet", href: `https://fonts.googleapis.com/css2?${Object.values(fonts).join("&")}&display=swap`, },
  { rel: "preload", href: iconHref, as: "image", type: "image/svg+xml" },
];

export default function App() {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
