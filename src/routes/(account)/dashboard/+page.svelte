<script lang="ts">
	import type { PageData } from './$types';
	import { Post, PostInput } from '$lib';
	import type { Posts } from '../../api/posts/+server';

	export let data: PageData;

	let postLoadFailed = false;

	function getExecutionTime(): string {
		const actor = data.activeActor;
		if (!actor) return '1 week';

		const timeFromNow = new Date(actor?.executionDate.getTime() - Date.now());
		if (timeFromNow.getDate() >= 7) {
			return 'in a week';
		} else if (timeFromNow.getDate() > 1) {
			return `in ${timeFromNow.getDate()} days`;
		} else {
			return 'later today';
		}
	}

	async function loadPosts(): Promise<Posts | null> {
		const response = await fetch(`/api/posts`, {
			method: 'GET'
		});

		if (!response.ok) {
			postLoadFailed = true;
			return null;
		}

		return (await response.json()) as Posts;
	}

	let loadPromise = loadPosts();

	function refreshPosts() {
		loadPromise = loadPosts();
	}
</script>

<div class="container no-padding">
	<div class="row">
		<div class="col">
			<aside>
				<h1 class="username">Hello, you are {data.activeActor?.username}.</h1>
				<p class="expiry-time">
					{data.activeActor?.username} is scheduled for execution {getExecutionTime()}.
				</p>
				<PostInput
					inputPlaceholder="Enter your insightful comments here you fool"
					buttonLabel="Post as {data.activeActor?.username}"
					on:postSubmitted={refreshPosts}
				/>
			</aside>
		</div>
		<div class="col-8">
			<article>
				{#await loadPromise}
					<p>fetching posts...</p>
				{:then posts}
					{#if posts}
						{#each posts as post}
							<Post {...post} actorUsername={data.activeActor?.username} />
						{:else}
							<p>No posts to display</p>
						{/each}
					{:else}
						<p>failed to fetch posts</p>
					{/if}
				{:catch error}
					<p>failed to fetch comments ({error})</p>
				{/await}
			</article>
		</div>
	</div>
</div>

<style lang="scss">
	h1.username {
		margin: 0;
	}

	p.expiry-time {
		margin-top: 0.25rem;
	}

	aside {
		padding-top: 0.5rem;
		position: -webkit-sticky; /* Safari */
		position: sticky;
		top: 0;
	}

	.container.no-padding {
		padding-left: 0 !important;
		padding-right: 0 !important;
	}
</style>
