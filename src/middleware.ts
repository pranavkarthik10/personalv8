import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

function isHomeHost(host: string) {
	const hostname = host.split(":")[0]?.toLowerCase() ?? "";
	return hostname === "home.pranavkarthik.com" || hostname.startsWith("home.");
}

export function middleware(request: NextRequest) {
	const host = request.headers.get("host") ?? "";
	const homeHost = isHomeHost(host);
	const onHomePath = request.nextUrl.pathname === "/home" || request.nextUrl.pathname.startsWith("/home/");
	const requestHeaders = new Headers(request.headers);

	if (homeHost || onHomePath) {
		requestHeaders.set("x-start-page", "1");
	}
	requestHeaders.set("x-pathname", request.nextUrl.pathname);

	if (homeHost) {
		const { pathname } = request.nextUrl;
		const passthrough =
			pathname.startsWith("/_next") ||
			pathname.startsWith("/home") ||
			pathname === "/favicon.ico" ||
			pathname.includes(".");
		if (!passthrough) {
			const url = request.nextUrl.clone();
			url.pathname = "/home";
			return NextResponse.rewrite(url, { request: { headers: requestHeaders } });
		}
	}

	return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
	matcher: ["/((?!_next/static|_next/image).*)"],
};
