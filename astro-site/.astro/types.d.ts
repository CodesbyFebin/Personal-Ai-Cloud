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
"multi-channel/subclusters/future-ambient-computing-and-ai.md": {
	id: "multi-channel/subclusters/future-ambient-computing-and-ai.md";
  slug: "multi-channel/subclusters/future-ambient-computing-and-ai";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"multi-channel/subclusters/handling-interruptions-across-devices.md": {
	id: "multi-channel/subclusters/handling-interruptions-across-devices.md";
  slug: "multi-channel/subclusters/handling-interruptions-across-devices";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"multi-channel/subclusters/migrating-from-single-channel-bots-to-unified-ai.md": {
	id: "multi-channel/subclusters/migrating-from-single-channel-bots-to-unified-ai.md";
  slug: "multi-channel/subclusters/migrating-from-single-channel-bots-to-unified-ai";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"multi-channel/subclusters/multi-channel-indian-freelancers.md": {
	id: "multi-channel/subclusters/multi-channel-indian-freelancers.md";
  slug: "multi-channel/subclusters/multi-channel-indian-freelancers";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"multi-channel/subclusters/offline-sync/offline-sync.md": {
	id: "multi-channel/subclusters/offline-sync/offline-sync.md";
  slug: "multi-channel/subclusters/offline-sync/offline-sync";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"multi-channel/subclusters/push-notifications/push-notifications.md": {
	id: "multi-channel/subclusters/push-notifications/push-notifications.md";
  slug: "multi-channel/subclusters/push-notifications/push-notifications";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"multi-channel/subclusters/security-encryption/security-encryption.md": {
	id: "multi-channel/subclusters/security-encryption/security-encryption.md";
  slug: "multi-channel/subclusters/security-encryption/security-encryption";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"multi-channel/subclusters/syncing-ai-context-between-mobile-and-desktop.md": {
	id: "multi-channel/subclusters/syncing-ai-context-between-mobile-and-desktop.md";
  slug: "multi-channel/subclusters/syncing-ai-context-between-mobile-and-desktop";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"multi-channel/subclusters/tech-stack/tech-stack.md": {
	id: "multi-channel/subclusters/tech-stack/tech-stack.md";
  slug: "multi-channel/subclusters/tech-stack/tech-stack";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"multi-channel/subclusters/unified-identity-graph.unified-identity-graph.md": {
	id: "multi-channel/subclusters/unified-identity-graph.unified-identity-graph.md";
  slug: "multi-channel/subclusters/unified-identity-graphunified-identity-graph";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"multi-channel/subclusters/whatsapp-ai-agents.md": {
	id: "multi-channel/subclusters/whatsapp-ai-agents.md";
  slug: "multi-channel/subclusters/whatsapp-ai-agents";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"voice-first/subclusters/hinglish-prompting.md": {
	id: "voice-first/subclusters/hinglish-prompting.md";
  slug: "voice-first/subclusters/hinglish-prompting";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
"voice-first/subclusters/on-device-stt.md": {
	id: "voice-first/subclusters/on-device-stt.md";
  slug: "voice-first/subclusters/on-device-stt";
  body: string;
  collection: "blog";
  data: any
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = never;
}
