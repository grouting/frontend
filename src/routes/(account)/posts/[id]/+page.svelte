<script lang="ts">
	import type { PageData } from './$types';
	import { Post } from '$lib';

	export let data: PageData;
</script>

<Post {...data.post} />
