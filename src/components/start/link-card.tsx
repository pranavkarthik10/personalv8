"use client";

import type { StartItem } from "@/components/start/start-links";
import ScrambleText from "@/components/start/scramble-text";

export default function LinkCard({
	item,
	active,
	query,
}: {
	item: StartItem;
	active: boolean;
	query: string;
}) {
	const searching = Boolean(query.trim()) && Boolean(item.search);

	return (
		<article className={`start-card${active ? " is-active" : ""}`} aria-label={item.label}>
			<span className="start-badge" aria-hidden="true">
				<span className="start-badge-window">
					<span className="start-monogram">{item.monogram}</span>
				</span>
			</span>
			<div className="start-card-body" aria-hidden={!active}>
				<div className="start-card-heading">
					<span className="start-card-name">
						<ScrambleText text={item.label} active={active} />
					</span>
					<span className="start-card-title">
						<ScrambleText
							text={searching ? `search “${query.trim()}”` : item.description}
							active={active}
							duration={460}
						/>
					</span>
				</div>
			</div>
		</article>
	);
}
