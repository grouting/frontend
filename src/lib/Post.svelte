<script lang="ts">
	import { formatDate } from '$lib';

	export let author: { username: string };
	export let content: string;
	export let postedAt: Date;
	export let tags: { name: string }[];
	export let id: string;
</script>

<div class="post">
	<div class="content">{content}</div>
	<div class="footer">
		<div class="left">
			<div class="username">
				<a href="/actors/{author.username}" class="dimmed">
					{author.username}
				</a>
			</div>
			<ul>
				{#each tags as tag}
					<li>
						<a href="/tags/{tag.name}" class="dimmed">
							#{tag.name}
						</a>
					</li>
				{/each}
			</ul>
		</div>
		<div>
			<div class="date">
				<a href="/posts/{id}" class="dimmed">{formatDate(postedAt)}</a>
			</div>
			<div></div>
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

	.left {
		display: flex;
		gap: 1rem;
	}

	.footer {
		padding: 0.65rem 1rem;
		border-top: 1px solid $primary;
		display: flex;
		justify-content: space-between;
	}

	ul {
		display: flex;
		list-style: none;
		padding-left: 0;
		gap: 0.5rem;
		margin: 0;
	}
</style>
