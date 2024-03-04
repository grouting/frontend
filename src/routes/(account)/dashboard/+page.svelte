<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>Good morning {data?.user?.email}</h1>

{@debug data}
