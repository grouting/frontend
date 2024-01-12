<script lang="ts">
	import '../app.scss';
	import { NavItem } from '$lib';
</script>

<header>
	<div class="container">
		<nav>
			<ul>
				<p class="name">Website Name</p>
				<NavItem href="/" strictPath>Home</NavItem>
				<NavItem href="/test">Test</NavItem>
			</ul>
			<ul>
				<NavItem href="/login">Login</NavItem>
				<NavItem href="/register">Register</NavItem>
			</ul>
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

	main {
		flex: 1;
	}

	footer {
		width: 100vw;
		min-height: 2.5rem;
		margin-bottom: 0;
		display: flex;
		align-items: center;
	}

	footer > div {
		padding-left: 1rem;
	}
</style>
