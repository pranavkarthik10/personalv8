import type { Metadata } from "next";
import StartPage from "@/components/start/start-page";

export const metadata: Metadata = {
	title: "home",
	description: "Browser start page — arrow keys to move, enter to open, type to search.",
};

export default function HomeStartRoute() {
	return <StartPage />;
}
