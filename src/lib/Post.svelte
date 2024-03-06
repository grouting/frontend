<script lang="ts">
	import { formatDate } from '$lib';

	export let author: { username: string };
	export let content: string;
	export let postedAt: Date;
	export let tags: { name: string }[];
	export let id: string;
	export let _count = { children: -1 };

	$: content, addAnchorTagsToHashtags();

	function addAnchorTagsToHashtags() {
		for (const tag of tags) {
			const pattern = new RegExp(`(#${tag.name})`, 'gi');
			content = content.replaceAll(pattern, `<a href="/tags/${tag.name}">#${tag.name}</a>`);
		}
	}
</script>

<div class="post">
	<div class="content">
		{@html content}
	</div>
	<div class="footer">
		<div class="left">
			{#if _count.children > -1}
				<a href="/posts/{id}#comments" class="dimmed">{_count.children} comments</a>
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
</style>
