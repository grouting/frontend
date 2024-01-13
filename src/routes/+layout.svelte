<script lang="ts">
	import type { LayoutData } from './$types';
	import '../app.scss';
	import { NavItem } from '$lib';

	export let data: LayoutData;
</script>

<header>
	<div class="container">
		<nav>
			{#if !data.loggedIn}
				<ul>
					<p class="name">WWW</p>
					<NavItem href="/" strictPath>Home</NavItem>
					<NavItem href="/test">Test</NavItem>
				</ul>
				<ul>
					<NavItem href="/login">Login</NavItem>
					<NavItem href="/register">Register</NavItem>
				</ul>
			{:else}
				<ul>
					<p class="name">WWW</p>
					<NavItem href="/dashboard">Dashboard</NavItem>
					<NavItem href="/test 2">Test 2</NavItem>
				</ul>
				<ul>
					<NavItem href="/account">{data.user.email}</NavItem>
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
		<div>cool footer</div>
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
	}

	footer > div {
		padding-left: 1rem;
	}
</style>
