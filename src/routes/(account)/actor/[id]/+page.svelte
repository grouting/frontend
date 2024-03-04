<script lang="ts">
	import type { PageData } from './$types';
	import Post from '$lib/Post.svelte';

	export let data: PageData;
</script>

{#each data.posts as post}
	<Post username="aaaa" content={post.content} tags={post.tags} postedAt={new Date(0)} />
{:else}
	<p>no posts</p>
{/each}
