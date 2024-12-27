<script lang="ts">
	import type { PageData } from './$types';
	import Post from '$lib/Post.svelte';

	export let data: PageData;

	let posts = data.posts;
	let groupedPosts = new Map<string | null, typeof data.posts>();

	// TODO: this is probably only useful if parent.id is the root post id
	// it doesn't detect comment chains etc
	for (const post of posts) {
		const key = post.parent?.id ?? null;
		groupedPosts.set(key, [...(groupedPosts.get(key) ?? []), post]);
	}

	let commentGroups: [{ rootId: string; posts: typeof data.posts }] = [];

	for (const group in groupedPosts.entries) {
		commentGroups = [...commentGroups, { rootId: 'a', group }];
	}
</script>

<div class="container no-padding">
	<div class="row">
		<div class="col">
			<aside>
				<h1 class="username">{data.actor?.username}</h1>
				<p>{data.stats?._count} posts</p>
				<!-- add execution date -->
			</aside>
		</div>
		<div class="col-10">
			<article>
				{#each groupedPosts.get(null) ?? [] as post}
					<Post {...post} actorUsername={data.activeActor?.username} />
				{:else}
					<p>No posts</p>
				{/each}
				<hr />
				{#each groupedPosts.entries as post}
					<Post {...post} actorUsername={data.activeActor?.username} />
				{:else}
					<p>No posts</p>
				{/each}
			</article>
		</div>
	</div>
</div>
