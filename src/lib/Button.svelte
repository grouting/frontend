<script lang="ts">
	export let href: string | null = null;
	export let active = false;
</script>

<a {href} class="button" class:active>
	<button>
		<slot />
	</button>
</a>
