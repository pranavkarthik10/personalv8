type SignatureLetter = {
	key: string;
	variant: "up" | "lo" | "space";
	width?: number;
	viewBox?: string;
	path?: string;
	dash?: number;
	margin?: string;
};

const letters: SignatureLetter[] = [
	{
		key: "P",
		variant: "up",
		width: 52,
		viewBox: "0 0 52 51",
		path: "M6.17969 47.4213C13.346 34.4334 17.26 27.7753 26.1804 13.4212C15.6807 22.9212 7.17969 26.4211 1.17969 30.4214C15.1797 10.4213 55.1797 -3.07861 50.1799 7.42125C45.1801 17.9211 24.6017 34.3749 19.6797 37.4214C7.56237 44.9214 28.6797 21.4214 35.1797 24.9213",
		dash: 203,
		margin: "0 -12px 0 -3px",
	},
	{
		key: "r",
		variant: "lo",
		width: 13,
		viewBox: "0 0 13 51",
		path: "M4.04688 23.3381L1.02539 30.1005C7.1047 22.5828 11.8527 19.8132 11.2412 24.1654",
		dash: 24,
		margin: "0 -3px 0 -1px",
	},
	{
		key: "a",
		variant: "lo",
		width: 13,
		viewBox: "0 0 13 51",
		path: "M5.99958 25C5.73591 21.1582 1.99899 25.5 1.49941 28C1.00013 30.5 7.65454 23.3545 7.65454 23.3545C3.5802 27.3691 3.29278 30.5313 4.09638 30.7478C5.08629 31.0263 12.2012 24.7466 12.2012 24.7466",
		dash: 36,
		margin: "0 -4px 0 0",
	},
	{
		key: "n",
		variant: "lo",
		width: 15,
		viewBox: "0 0 15 51",
		path: "M4.42188 23.1724L1.16211 28.4658C3.87099 25.9122 7.65167 23.2024 8.42922 23.7108C8.87781 23.9799 6.69468 26.9705 7.8311 27.4191C8.96753 27.8677 11.8983 25.565 14.0814 24.7575",
		dash: 27,
		margin: "0 -5px 0 0",
	},
	{
		key: "a2",
		variant: "lo",
		width: 13,
		viewBox: "0 0 13 51",
		path: "M5.99958 25C5.73591 21.1582 1.99899 25.5 1.49941 28C1.00013 30.5 7.65454 23.3545 7.65454 23.3545C3.5802 27.3691 3.29278 30.5313 4.09638 30.7478C5.08629 31.0263 12.2012 24.7466 12.2012 24.7466",
		dash: 36,
		margin: "0 -4px 0 0",
	},
	{
		key: "v",
		variant: "lo",
		width: 9,
		viewBox: "0 0 9 51",
		path: "M3.3522 23.8316C1.86784 24.4052 0.653752 28.489 0.990061 28.894C1.93472 29.1302 3.78484 26.7863 7.70664 21.334",
		dash: 17,
		margin: "0 -4.5px 0 0",
	},
	{ key: "space", variant: "space" },
	{
		key: "K",
		variant: "up",
		width: 59,
		viewBox: "0 0 59 51",
		path: "M30.6585 5.69873C20.8873 19.471 15.4101 28.7219 5.65848 46.1987C22.4604 13.4133 39.6585 11.6987 53.1585 9.69873C64.6585 8.19873 51.1585 20.1987 51.1585 20.1987C80.6585 -7.30127 -1.22332 24.1987 1.15848 37.6987C2.39349 44.6987 37.1585 35.6987 37.1585 35.6987",
		dash: 244,
		margin: "0 -23px 0 -3px",
	},
	{
		key: "a3",
		variant: "lo",
		width: 13,
		viewBox: "0 0 13 51",
		path: "M5.99958 25C5.73591 21.1582 1.99899 25.5 1.49941 28C1.00013 30.5 7.65454 23.3545 7.65454 23.3545C3.5802 27.3691 3.29278 30.5313 4.09638 30.7478C5.08629 31.0263 12.2012 24.7466 12.2012 24.7466",
		dash: 36,
		margin: "0 -4px 0 0",
	},
	{
		key: "r2",
		variant: "lo",
		width: 13,
		viewBox: "0 0 13 51",
		path: "M4.04688 23.3381L1.02539 30.1005C7.1047 22.5828 11.8527 19.8132 11.2412 24.1654",
		dash: 24,
		margin: "0 -3px 0 -1px",
	},
	{
		key: "t",
		variant: "lo",
		width: 24,
		viewBox: "0 0 24 51",
		path: "M0.966797 16.3342C6.66806 14.1572 15.5438 14.1786 22.957 15.9795C12.1532 14.4252 15.852 9.92493 18.1685 5.96021C9.87226 17.3225 -0.709346 36.7351 1.78362 36.9101C3.40185 37.0413 9.39371 29.0376 13.8793 24.8435",
		dash: 91,
		margin: "0 -12.5px 0 -3.5px",
	},
	{
		key: "h",
		variant: "lo",
		width: 18,
		viewBox: "0 0 18 51",
		path: "M14.75 6.08472C8.75724 15.6124 5.74081 20.6113 1.16797 28.7222C2.27051 26.7174 7.40879 23.7648 9.19185 23.8223C10.4381 23.8798 8.46919 26.815 9.75037 27.5733C11.2054 28.4346 16.3726 24.6677 16.3726 24.6677",
		dash: 48,
		margin: "0 -4px 0 -1px",
	},
	{
		key: "i",
		variant: "lo",
		width: 9,
		viewBox: "0 0 9 51",
		path: "M3.7548 22.9229C2.60207 23.529 -0.752212 29.5295 1.61166 28.7618C3.97553 27.994 5.61205 25.8726 7.67374 24.721",
		dash: 16,
		margin: "0 -3.5px 0 0",
	},
	{
		key: "k",
		variant: "lo",
		width: 17,
		viewBox: "0 0 17 51",
		path: "M15.7207 6.04492C9.81615 15.6875 6.702 20.8513 1.7832 29.2278C6.71346 22.5005 7.97044 24.3967 8.53371 25.0963C6.93134 22.6684 3.19642 26.693 4.13275 27.9568C5.06907 29.2205 9.96155 26.6057 13.3705 24.8444",
		dash: 54,
		margin: "0 -6.5px 0 0",
	},
];

export default function AnimatedSignature() {
	return (
		<div className="signature-card">
			{/* <div className="signature-label">signed by,</div> */}
			<div className="signature-main" aria-label="Pranav Karthik signature">
				{letters.map((letter, index) => {
					if (letter.variant === "space") {
						return <span key={letter.key} className="signature-space" />;
					}

					return (
						<span
							key={letter.key}
							className={`signature-letter ${letter.variant}`}
							style={
								{
									margin: letter.margin,
									"--dash": letter.dash,
									"--delay": `${index * 75}ms`,
								} as CSSProperties
							}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox={letter.viewBox}
								height="51"
								width={letter.width}
							>
								<path d={letter.path} />
							</svg>
						</span>
					);
				})}
			</div>
		</div>
	);
}
import type { CSSProperties } from "react";
