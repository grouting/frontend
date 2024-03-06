<script lang="ts">
	import Form from './Form.svelte';

	export let inputPlaceholder: string;
	export let buttonLabel: string;
	export let rows = 10;

	const maxLength = 500;
	let value = '';
	let remainingCharacters = -1;

	$: value, assessCharacterCount();

	function assessCharacterCount() {
		remainingCharacters = maxLength - value.length;
	}
</script>

<Form>
	<div class="text-input">
		<textarea name="post" {rows} maxlength={maxLength} placeholder={inputPlaceholder} bind:value
		></textarea>
		{#if remainingCharacters < 75}
			<p class="inline">
				{remainingCharacters} characters remaining
			</p>
		{/if}
	</div>
	<button>{buttonLabel}</button>
</Form>

<style lang="scss">
	.text-input {
		display: flex;
		flex-direction: column;
	}

	.inline {
		margin: 0;
		margin-top: 0.5rem;
	}
</style>
