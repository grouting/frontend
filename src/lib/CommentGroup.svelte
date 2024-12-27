<script lang="ts">
	import { formatDate } from '$lib';

	export let root: {
		id: string;
		postedAt: Date;
		voteScore: number;
		content: string;
		author: {
			id: string;
			username: string;
		};
	};
</script>

<div class="wrapper">
	<div class="post">
		<div class="content">{root.content}</div>
		<div class="meta">
			<div class="date">
				<a href="/posts/{root.id}" class="dimmed">{formatDate(root.postedAt)}</a>
			</div>
			<div class="username">
				<a href="/actors/{root.author.username}" class="dimmed">
					{root.author.username}
				</a>
			</div>
		</div>
	</div>
	<div class="replies">
		<slot />
	</div>
</div>

<style lang="scss">
	.post,
	.wrapper {
		border: 1px solid $primary;
		margin: 1rem 0;
	}

	.content {
		padding: 1rem;
	}

	.date {
		color: $primary-dimmed;
	}
</style>
