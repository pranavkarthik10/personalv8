"use client";

import { useState, ReactNode } from "react";
import Link from "next/link";

interface CompanyLogoProps {
	icon: ReactNode;
	company: string;
	companyWebsite: string;
}

export default function CompanyLogo({ icon, company, companyWebsite }: CompanyLogoProps) {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<Link
			href={companyWebsite}
			target="_blank"
			className="inline-brand"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<span
				className={`inline-brand-icon ${
					isHovered ? "-translate-y-0.5 rotate-[-6deg] scale-125" : ""
				}`}
			>
				{icon}
			</span>
			<span>{company}</span>
		</Link>
	);
}
