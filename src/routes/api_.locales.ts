import { type LoaderFunctionArgs } from "@remix-run/node";
import { cacheHeader } from "pretty-cache-header";
import { z } from "zod";
import { resources } from "~/config/i18n";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const languages = resources!;

  const lng = z
    .string()
    .refine((lng): lng is keyof typeof languages =>
      Object.keys(languages).includes(lng),
    )
    .parse(url.searchParams.get("lng"));

  const namespaces = languages[lng];

  const ns = z
    .string()
    .refine((ns): ns is keyof typeof namespaces => {
      return Object.keys(namespaces).includes(ns);
    })
    .parse(url.searchParams.get("ns"));

  const headers = new Headers();

  if (process.env.NODE_ENV === "production") {
    headers.set(
      "Cache-Control",
      cacheHeader({
        maxAge: "5m",
        sMaxage: "1d",
        staleWhileRevalidate: "7d",
        staleIfError: "7d",
      }),
    );
  }

  return Response.json(namespaces[ns], { headers });
}
