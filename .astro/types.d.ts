declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"blog": {
"2017-06-15-a-simplistic-post-on-liberalism-and-christianity.md": {
	id: "2017-06-15-a-simplistic-post-on-liberalism-and-christianity.md";
  slug: "2017-06-15-a-simplistic-post-on-liberalism-and-christianity";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2017-06-18-a-simplistic-post-on-brexit-utopianism.md": {
	id: "2017-06-18-a-simplistic-post-on-brexit-utopianism.md";
  slug: "2017-06-18-a-simplistic-post-on-brexit-utopianism";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2017-07-10-a-simplistic-post-on-quick-trade-agreements.md": {
	id: "2017-07-10-a-simplistic-post-on-quick-trade-agreements.md";
  slug: "2017-07-10-a-simplistic-post-on-quick-trade-agreements";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2017-08-16-a-simplistic-post-on-remembering-your-country-s-history.md": {
	id: "2017-08-16-a-simplistic-post-on-remembering-your-country-s-history.md";
  slug: "2017-08-16-a-simplistic-post-on-remembering-your-country-s-history";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2018-01-02-how-often-is-1st-january-a-monday.md": {
	id: "2018-01-02-how-often-is-1st-january-a-monday.md";
  slug: "2018-01-02-how-often-is-1st-january-a-monday";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2018-02-07-female-composers-in-the-sacred-harp.md": {
	id: "2018-02-07-female-composers-in-the-sacred-harp.md";
  slug: "2018-02-07-female-composers-in-the-sacred-harp";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2018-04-01-how-often-does-easter-sunday-fall-on-april-fools-day.md": {
	id: "2018-04-01-how-often-does-easter-sunday-fall-on-april-fools-day.md";
  slug: "2018-04-01-how-often-does-easter-sunday-fall-on-april-fools-day";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2018-05-04-winners-and-losers-in-the-city-of-durham-parish-council-election.md": {
	id: "2018-05-04-winners-and-losers-in-the-city-of-durham-parish-council-election.md";
  slug: "2018-05-04-winners-and-losers-in-the-city-of-durham-parish-council-election";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2018-06-10-football-formations-in-sacred-harp-numbers.md": {
	id: "2018-06-10-football-formations-in-sacred-harp-numbers.md";
  slug: "2018-06-10-football-formations-in-sacred-harp-numbers";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2018-06-10-square-numbers-in-sacred-harp-song-numbers.md": {
	id: "2018-06-10-square-numbers-in-sacred-harp-song-numbers.md";
  slug: "2018-06-10-square-numbers-in-sacred-harp-song-numbers";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2018-07-06-a-better-way-of-removing-punctuation-from-a-string-in-python.md": {
	id: "2018-07-06-a-better-way-of-removing-punctuation-from-a-string-in-python.md";
  slug: "2018-07-06-a-better-way-of-removing-punctuation-from-a-string-in-python";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2018-08-26-new-website-making-it-easy-to-get-thumbnails-of-youtube-videos.md": {
	id: "2018-08-26-new-website-making-it-easy-to-get-thumbnails-of-youtube-videos.md";
  slug: "2018-08-26-new-website-making-it-easy-to-get-thumbnails-of-youtube-videos";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2018-10-08-a-dataset-for-sacred-harp-songs.md": {
	id: "2018-10-08-a-dataset-for-sacred-harp-songs.md";
  slug: "2018-10-08-a-dataset-for-sacred-harp-songs";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2018-10-09-sacred-harp-songs-that-are-also-http-status-codes.md": {
	id: "2018-10-09-sacred-harp-songs-that-are-also-http-status-codes.md";
  slug: "2018-10-09-sacred-harp-songs-that-are-also-http-status-codes";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2019-03-29-new-website-turning-off-targeted-ads.md": {
	id: "2019-03-29-new-website-turning-off-targeted-ads.md";
  slug: "2019-03-29-new-website-turning-off-targeted-ads";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2019-04-25-publishing-my-pocket-reading-list-on-this-website.md": {
	id: "2019-04-25-publishing-my-pocket-reading-list-on-this-website.md";
  slug: "2019-04-25-publishing-my-pocket-reading-list-on-this-website";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2019-05-02-new-website-durham-sacred-harp.md": {
	id: "2019-05-02-new-website-durham-sacred-harp.md";
  slug: "2019-05-02-new-website-durham-sacred-harp";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2019-05-02-new-website-newcastle-sacred-harp.md": {
	id: "2019-05-02-new-website-newcastle-sacred-harp.md";
  slug: "2019-05-02-new-website-newcastle-sacred-harp";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2019-05-04-rebuilt-website-durham-sacred-harp.md": {
	id: "2019-05-04-rebuilt-website-durham-sacred-harp.md";
  slug: "2019-05-04-rebuilt-website-durham-sacred-harp";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2019-05-04-replicating-jekylls-markdownify-filter-in-nunjucks-with-eleventy.md": {
	id: "2019-05-04-replicating-jekylls-markdownify-filter-in-nunjucks-with-eleventy.md";
  slug: "2019-05-04-replicating-jekylls-markdownify-filter-in-nunjucks-with-eleventy";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2019-07-08-some-of-my-sacred-harp-posters.md": {
	id: "2019-07-08-some-of-my-sacred-harp-posters.md";
  slug: "2019-07-08-some-of-my-sacred-harp-posters";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2019-10-01-new-website-i-made-a-test-site-to-fetch-data-from-apis-and-turn-it-into-html-using-vanilla-js-and-accidentally-made-my-main-hacker-news-reader.md": {
	id: "2019-10-01-new-website-i-made-a-test-site-to-fetch-data-from-apis-and-turn-it-into-html-using-vanilla-js-and-accidentally-made-my-main-hacker-news-reader.md";
  slug: "2019-10-01-new-website-i-made-a-test-site-to-fetch-data-from-apis-and-turn-it-into-html-using-vanilla-js-and-accidentally-made-my-main-hacker-news-reader";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2019-11-02-twitters-political-ads-ban.md": {
	id: "2019-11-02-twitters-political-ads-ban.md";
  slug: "2019-11-02-twitters-political-ads-ban";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2020-02-15-bernie-sanders-healthcare-plan-isnt-necessarily-the-best-way-to-universal-american-healthcare.md": {
	id: "2020-02-15-bernie-sanders-healthcare-plan-isnt-necessarily-the-best-way-to-universal-american-healthcare.md";
  slug: "2020-02-15-bernie-sanders-healthcare-plan-isnt-necessarily-the-best-way-to-universal-american-healthcare";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2020-03-24-development-production-favicons-eleventy.md": {
	id: "2020-03-24-development-production-favicons-eleventy.md";
  slug: "2020-03-24-development-production-favicons-eleventy";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2020-03-30-new-website-save-your-indie-high-street.md": {
	id: "2020-03-30-new-website-save-your-indie-high-street.md";
  slug: "2020-03-30-new-website-save-your-indie-high-street";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2020-04-18-on-the-whataboutery-around-the-takeover-of-newcastle-united.md": {
	id: "2020-04-18-on-the-whataboutery-around-the-takeover-of-newcastle-united.md";
  slug: "2020-04-18-on-the-whataboutery-around-the-takeover-of-newcastle-united";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2020-04-30-new-website-hammer-keys-get-trains.md": {
	id: "2020-04-30-new-website-hammer-keys-get-trains.md";
  slug: "2020-04-30-new-website-hammer-keys-get-trains";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2020-05-17-websites-and-allotments-why-do-i-write-code.md": {
	id: "2020-05-17-websites-and-allotments-why-do-i-write-code.md";
  slug: "2020-05-17-websites-and-allotments-why-do-i-write-code";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2020-09-07-new-website-coffee-recipes-app-to-learn-svelte.md": {
	id: "2020-09-07-new-website-coffee-recipes-app-to-learn-svelte.md";
  slug: "2020-09-07-new-website-coffee-recipes-app-to-learn-svelte";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2020-10-01-new-website-first-draft-dont-let-editing-slow-down-your-first-draft.md": {
	id: "2020-10-01-new-website-first-draft-dont-let-editing-slow-down-your-first-draft.md";
  slug: "2020-10-01-new-website-first-draft-dont-let-editing-slow-down-your-first-draft";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2021-01-02-new-website-find-the-nearest-tailwind-colour.md": {
	id: "2021-01-02-new-website-find-the-nearest-tailwind-colour.md";
  slug: "2021-01-02-new-website-find-the-nearest-tailwind-colour";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2021-01-13-re-written-website-get-youtube-thumbnails.md": {
	id: "2021-01-13-re-written-website-get-youtube-thumbnails.md";
  slug: "2021-01-13-re-written-website-get-youtube-thumbnails";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2022-09-08-i-attended-a-funeral-on-youtube.md": {
	id: "2022-09-08-i-attended-a-funeral-on-youtube.md";
  slug: "2022-09-08-i-attended-a-funeral-on-youtube";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2022-09-11-i’m-making-a-react-native-phone-app-and-omg-i-miss-svelte-stores.md": {
	id: "2022-09-11-i’m-making-a-react-native-phone-app-and-omg-i-miss-svelte-stores.md";
  slug: "2022-09-11-im-making-a-react-native-phone-app-and-omg-i-miss-svelte-stores";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2022-11-02-big-uk-mountains.md": {
	id: "2022-11-02-big-uk-mountains.md";
  slug: "2022-11-02-big-uk-mountains";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2022-11-05-very-slightly-smaller-uk-mountains.md": {
	id: "2022-11-05-very-slightly-smaller-uk-mountains.md";
  slug: "2022-11-05-very-slightly-smaller-uk-mountains";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2023-02-02-announcing-draft-one.md": {
	id: "2023-02-02-announcing-draft-one.md";
  slug: "2023-02-02-announcing-draft-one";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2023-02-16-ive-set-up-a-microblog-that-uses-github-issues-as-a-cms.md": {
	id: "2023-02-16-ive-set-up-a-microblog-that-uses-github-issues-as-a-cms.md";
  slug: "2023-02-16-ive-set-up-a-microblog-that-uses-github-issues-as-a-cms";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2023-11-20-chess-variants.md": {
	id: "2023-11-20-chess-variants.md";
  slug: "2023-11-20-chess-variants";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2023-12-10-svelte-unstyled-tags-input.md": {
	id: "2023-12-10-svelte-unstyled-tags-input.md";
  slug: "2023-12-10-svelte-unstyled-tags-input";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2024-06-03-announcing-nearest-color.md": {
	id: "2024-06-03-announcing-nearest-color.md";
  slug: "2024-06-03-announcing-nearest-color";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2024-06-04-deploy-laravel-11-for-free-on-vercel-in-2024.md": {
	id: "2024-06-04-deploy-laravel-11-for-free-on-vercel-in-2024.md";
  slug: "2024-06-04-deploy-laravel-11-for-free-on-vercel-in-2024";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"2024-07-19-launching-nearest-color.md": {
	id: "2024-07-19-launching-nearest-color.md";
  slug: "2024-07-19-launching-nearest-color";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		"stuff": {
"coding": {
	id: "coding";
  collection: "stuff";
  data: InferEntrySchema<"stuff">
};
"hobbies": {
	id: "hobbies";
  collection: "stuff";
  data: InferEntrySchema<"stuff">
};
};

	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("./../src/content/config.js");
}
