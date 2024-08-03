<script lang="ts">
	import { enhance } from '$app/forms';
	import { createEventDispatcher } from 'svelte';
	import type { Post } from '@prisma/client';

	export let replyingToPostId: string | undefined = undefined;
	export let inputPlaceholder: string;
	export let buttonLabel: string;
	export let rows = 10;

	const dispatch = createEventDispatcher();

	const maxLength = 500;
	let value = '';
	let remainingCharacters = -1;

	$: value, assessCharacterCount();

	function assessCharacterCount() {
		remainingCharacters = maxLength - value.length;
	}

	function onPostSubmitted() {
		dispatch('postSubmitted');
	}
</script>

<form
	method="POST"
	use:enhance={({ formData }) => {
		if (replyingToPostId) {
			formData.append('replyingTo', replyingToPostId);
		}

		return async ({ update }) => {
			onPostSubmitted();
			update();
		};
	}}
>
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
</form>

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
