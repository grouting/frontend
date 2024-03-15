<script lang="ts">
	import type { PageData } from './$types';
	import Post from '$lib/Post.svelte';

	export let data: PageData;
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
				{#each data.posts as post}
					<Post {...post} actorUsername={data.user.activeActor?.username} />
				{:else}
					<p>No posts</p>
				{/each}
			</article>
		</div>
	</div>
</div>
