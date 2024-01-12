<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib';

	export let href: string;
	export let strictPath = false;

	$: currentPath = $page.route.id?.replace(/\([^)]*\)(\/)/g, '') ?? '';
	$: selected = strictPath ? currentPath === href : currentPath.startsWith(href);
</script>

<li>
	<Button {href} active={selected}><slot /></Button>
</li>
