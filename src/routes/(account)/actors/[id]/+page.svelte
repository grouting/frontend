<script lang="ts">
	import type { PageData } from './$types';
	import Post from '$lib/Post.svelte';

	export let data: PageData;
</script>

{#each data.posts as post}
	<Post {...post} />
{:else}
	<p>no posts</p>
{/each}
