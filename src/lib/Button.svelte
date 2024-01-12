<script lang="ts">
	export let href: string | null = null;
	export let active = false;
</script>

<a {href} class="button" class:active>
	<button>
		<slot />
	</button>
</a>

<style lang="scss">
	button {
		background-color: $primary;
		padding: $interact-padding-y $interact-padding-x;
		border: none;
		font-family: $font-family;
		font-size: $font-size;
		color: $colour;
		text-decoration: underline;
		text-decoration-color: $primary-dimmed;
		cursor: pointer;
	}
</style>
