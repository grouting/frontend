<script lang="ts">
	import { Eye } from '$lib/icons';

	export let label: string;
	export let name: string;
	export let type: string;
	export let required = false;
	export let visibilityToggle = false;
	export let error = false;

	export let value = '';

	let passwordVisible = false;

	let id = 'input-' + Math.random().toString(36);
	let labelId = 'input-' + Math.random().toString(36);

	function handleInput(e: any): void {
		error = false;
		if (!visibilityToggle) {
			e.target.type = type;
		} else {
			e.target.type = passwordVisible ? 'text' : 'password';
		}
	}

	function toggleVisibility(e: any): void {
		const input = e.currentTarget.previousElementSibling;
		if (!input) return;
		passwordVisible = !passwordVisible;
		input.type = passwordVisible ? 'text' : 'password';
	}
</script>

<div>
	<label for={id} id={labelId}>
		{label}
		{#if !required}
			(optional)
		{/if}
	</label>
	<div class="elements">
		<input
			{name}
			{required}
			bind:value
			on:input={handleInput}
			data-invalid={error}
			aria-invalid={error}
			class:error
			class:with-visibility-toggle={visibilityToggle}
			{id}
			aria-describedby={labelId}
		/>
		{#if visibilityToggle}
			<button class="visibility-toggle" type="button" on:click={toggleVisibility}>
				<Eye open={passwordVisible} />
			</button>
		{/if}
	</div>
</div>

<style lang="scss">
	label {
		display: flex;
		flex-direction: column;
	}

	input {
		border: 1px solid $primary-dimmed;
		border-radius: 0;
		background-color: $background-colour;
		color: $colour;
		font-size: $font-size;
		font-family: $font-family;
		padding: $interact-padding-y $interact-padding-x;
		width: 100%;
	}

	input.error {
		border-color: $error;
	}

	input.with-visibility-toggle {
		padding-right: 2.5rem;
	}

	.visibility-toggle {
		position: absolute;
		right: 0;
		display: flex;
		width: 2.5rem;
		height: 100%;
		align-items: center;
		justify-content: center;
		padding: 0;
		border: 0;
		cursor: pointer;
		border-radius: 0.375rem;
		background: none;
	}

	.elements {
		position: relative;
		display: flex;
		width: 100%;
		flex: 1 1 auto;
	}
</style>
