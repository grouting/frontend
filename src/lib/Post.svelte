<script lang="ts">
	import { formatDate } from '$lib';
	import PostInput from './PostInput.svelte';

	export let actorUsername: string | undefined;

	export let author: { username: string };
	export let content: string;
	export let postedAt: Date;
	export let tags: { name: string }[];
	export let id: string;
	export let _count = { children: -1 };

	export let inlineCommentView = false;
	export let commentField = false;

	$: content, addAnchorTagsToHashtags();

	function addAnchorTagsToHashtags() {
		for (const tag of tags) {
			const pattern = new RegExp(`(#${tag.name})`, 'gi');
			content = content.replaceAll(pattern, `<a href="/tags/${tag.name}">#${tag.name}</a>`);
		}
	}

	let awaitingCommentLoad = false;
	function handleInlineCommentToggle() {
		awaitingCommentLoad = !awaitingCommentLoad;
	}

	let showCommentReplyForm = false;
	function handleCommentReply() {
		showCommentReplyForm = !showCommentReplyForm;
	}

	let commentLoadFailed = false;

	type Comments = {
		id: string;
		postedAt: Date;
		voteScore: number;
		content: string;
		author: {
			username: string;
		};
		tags: {
			name: string;
		}[];
		_count: {
			children: number;
		};
	}[];

	async function loadComments(): Promise<Comments | null> {
		const response = await fetch(`/api/posts/${id}/comments`, {
			method: 'GET'
		});

		if (!response.ok) {
			commentLoadFailed = true;
			return null;
		}

		return (await response.json()) as Comments;
	}
</script>

<div class="post">
	<div class="content">
		{@html content}
	</div>
	<div class="footer">
		<div class="left">
			{#if _count.children > -1}
				{#if inlineCommentView}
					<a href="#comments" class="dimmed" on:click={handleInlineCommentToggle}
						>{_count.children} comment{_count.children !== 1 ? 's' : ''}</a
					>
				{:else}
					<a href="/posts/{id}#comments" class="dimmed"
						>{_count.children} comment{_count.children !== 1 ? 's' : ''}</a
					>
				{/if}
			{/if}
			{#if commentField}
				<a href="#reply" class="dimmed" on:click={handleCommentReply}>Reply</a>
			{/if}
		</div>
		<div class="spaced">
			<div class="date">
				<a href="/posts/{id}" class="dimmed">{formatDate(postedAt)}</a>
			</div>
			<div class="username">
				<a href="/actors/{author.username}" class="dimmed">
					{author.username}
				</a>
			</div>
		</div>
	</div>
	{#if showCommentReplyForm}
		<div id="reply" class="comment-reply-block">
			<PostInput
				inputPlaceholder="Reply to {author.username} as {actorUsername}"
				buttonLabel="Reply as {actorUsername}"
				replyingToPostId={id}
				rows={1}
			/>
		</div>
	{/if}

	<!-- TODO: fix scrolling on opening comments, caused by #comment in url -->
	{#if awaitingCommentLoad && _count.children > 0}
		<div id="comment" class="comment-block">
			{#await loadComments()}
				<p>fetching comments...</p>
			{:then comments}
				{#if !comments}
					<p>an error occurred while fetching the comments</p>
				{:else}
					{#each comments as comment}
						<svelte:self {...comment} {actorUsername} inlineCommentView {commentField} />
					{/each}
				{/if}
			{:catch error}
				<p>failed to fetch comments ({error})</p>
			{/await}
		</div>
	{/if}
</div>

<style lang="scss">
	.post {
		border: 1px solid $primary;
		margin: 1rem 0;
	}

	.content {
		padding: 1rem;
	}

	.date {
		color: $primary-dimmed;
	}

	.spaced {
		display: flex;
		gap: 1rem;
	}

	.footer {
		padding: 0.65rem 1rem;
		border-top: 1px solid $primary;
		display: flex;
		justify-content: space-between;
	}

	.comment-block,
	.comment-reply-block {
		padding: 0.65rem 1rem;
		border-top: 1px solid $primary;
	}
</style>
