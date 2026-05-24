import { unstable_cache } from "next/cache";
import { Suspense } from "react";
import { getTweet, type Tweet } from "react-tweet/api";
import {
	EmbeddedTweet,
	TweetNotFound,
	TweetSkeleton,
} from "react-tweet";

const tweetIds = [
	"1135700109931343872",
	"1275225681794748416",
	"1997875261669621787",
	"1282204149082230784",
];

function withEntityDefaults(entities: Tweet["entities"] | undefined) {
	return {
		hashtags: entities?.hashtags ?? [],
		user_mentions: entities?.user_mentions ?? [],
		urls: entities?.urls ?? [],
		symbols: entities?.symbols ?? [],
		...(entities?.media ? { media: entities.media } : {}),
	};
}

function normalizeTweetEntities(tweet: Tweet): Tweet {
	return {
		...tweet,
		entities: withEntityDefaults(tweet.entities),
		quoted_tweet: tweet.quoted_tweet
			? {
					...tweet.quoted_tweet,
					entities: withEntityDefaults(tweet.quoted_tweet.entities),
				}
			: undefined,
	};
}

const getCachedTweet = (id: string) =>
	unstable_cache(
		async () => {
			try {
				const tweet = await getTweet(id);
				return tweet ? normalizeTweetEntities(tweet) : null;
			} catch {
				return null;
			}
		},
		[`tweet-${id}`],
		{ revalidate: 60 * 60 * 24 },
	)();

async function MentionTweet({ id }: { id: string }) {
	const tweet = await getCachedTweet(id);
	if (!tweet) return <TweetNotFound />;
	return <EmbeddedTweet tweet={tweet} />;
}

export default function MentionsCarousel() {
	return (
		<div className="mentions-carousel">
			<div className="mentions-carousel-track scrollbar-hide">
				{tweetIds.map((id) => (
					<div key={id} className="mentions-carousel-item">
						<Suspense fallback={<TweetSkeleton />}>
							<MentionTweet id={id} />
						</Suspense>
					</div>
				))}
			</div>
		</div>
	);
}
