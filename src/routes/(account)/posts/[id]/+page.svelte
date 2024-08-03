<script lang="ts">
	import type { PageData } from './$types';
	import { Post, PostInput } from '$lib';

	export let data: PageData;
</script>

<Post {...data.post} actorUsername={data.activeActor?.username ?? ''} />

<hr />

<section id="comments">
	<PostInput
		inputPlaceholder="Reply to {data.post.author.username}'s post"
		buttonLabel="Reply as {data.activeActor?.username}"
		rows={1}
	/>
	{#each data.post.children as comment}
		<Post
			{...comment}
			actorUsername={data.activeActor?.username ?? ''}
			inlineCommentView
			commentField
		/>
	{:else}
		<p>no comments</p>
	{/each}
</section>

<style lang="scss">
	section {
		margin-top: 1rem;
	}
</style>
