import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import bootstrap from "bootstrap/dist/css/bootstrap.min.css?url";
import styles from "./styles/main.css?url";

export function links() {
  return [
    { rel: "stylesheet", href: bootstrap },
    { rel: "stylesheet", href: styles }
  ];
}

export default function App() {
  return (
    <html lang="en">
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
