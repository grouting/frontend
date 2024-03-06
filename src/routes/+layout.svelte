<script lang="ts">
	import '../app.scss';

	import type { LayoutData } from './$types';
	import { NavItem } from '$lib';

	export let data: LayoutData;
</script>

<svelte:head>
	<title>Chameleon</title>
</svelte:head>

<header>
	<div class="container">
		<nav>
			{#if !data.loggedIn}
				<ul>
					<p class="name">Chameleon</p>
					<NavItem href="/" strictPath>Home</NavItem>
					<NavItem href="/test">Test</NavItem>
				</ul>
				<ul>
					<NavItem href="/login">Login</NavItem>
					<NavItem href="/register">Register</NavItem>
				</ul>
			{:else}
				<ul>
					<p class="name">Chameleon</p>
					<NavItem href="/dashboard">Dashboard</NavItem>
					<NavItem href="/test 2">Test 2</NavItem>
				</ul>
				<ul>
					<NavItem href="/account">Account</NavItem>
					<NavItem href="/logout">Log out</NavItem>
				</ul>
			{/if}
		</nav>
	</div>
</header>

<main>
	<div class="container">
		<slot />
	</div>
</main>

<footer>
	<div class="container">
		<div>
			&copy; 2023-{new Date(Date.now()).getFullYear()} | A
			<a href="https://muesli.zone/" target="_blank">muesli.zone</a> production
		</div>
	</div>
</footer>

<style lang="scss">
	nav {
		display: flex;
		justify-content: space-between;
	}

	ul {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		list-style-type: none;
		padding-left: 0;
	}

	p.name {
		margin: 0;
		padding-right: 0.5rem;
	}

	header {
		border-bottom: 1px solid $primary;
	}

	main {
		flex: 1;
	}

	footer {
		width: 100vw;
		min-height: 2.5rem;
		margin-bottom: 0;
		display: flex;
		align-items: center;
		border-top: 1px solid $primary;
		margin-top: 1rem;
	}

	footer > div {
		padding-left: 1rem;
	}
</style>
