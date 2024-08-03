<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import { Post, PostInput } from '$lib';

	export let data: PageData;
	// export let form: ActionData;

	let posts = data.posts;

	function getExecutionTime(): string {
		const actor = data.user.activeActor;
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
</script>

<div class="container no-padding">
	<div class="row">
		<div class="col">
			<aside>
				<h1 class="username">Hello, you are {data.user.activeActor?.username}.</h1>
				<p class="expiry-time">
					{data.user.activeActor?.username} is scheduled for execution {getExecutionTime()}.
				</p>
				<!-- <form method="POST">
					<textarea
						name="post"
						cols="30"
						rows="10"
						maxlength="500"
						placeholder="Enter your insightful comments here you fucking idiot"
					></textarea>
					<button>Post as {data.user.activeActor?.username}</button>
				</form> -->
				<PostInput
					inputPlaceholder="Enter your insightful comments here you fool"
					buttonLabel="Post as {data.user.activeActor?.username}"
				/>
			</aside>
		</div>
		<div class="col-8">
			<article>
				{#each posts as post}
					<Post {...post} actorUsername={data.user.activeActor?.username} />
				{:else}
					<p>No posts to display</p>
				{/each}
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
