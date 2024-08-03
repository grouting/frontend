<script lang="ts">
	import type { PageData } from './$types';
	import { Post } from '$lib';

	export let data: PageData;

	// TODO: display comments
</script>

<div class="container no-padding">
	<div class="row">
		<div class="col">
			<aside>
				<h1 class="username">#{data.tag}</h1>
				<p>{data.count} posts</p>
			</aside>
		</div>
		<div class="col-9">
			<article>
				{#each data.posts as post}
					<Post {...post} actorUsername={data.activeActor?.username} />
				{:else}
					<p>No posts</p>
				{/each}
			</article>
		</div>
	</div>
</div>
