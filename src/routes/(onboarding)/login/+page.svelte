<script lang="ts">
	import type { ActionData } from './$types';
	import { Input, Button, Jumbotron, Form } from '$lib';

	export let form: ActionData;
</script>

<div class="row">
	<div class="col"></div>
	<div class="col-5">
		<Jumbotron>Log into your account</Jumbotron>
		<Form>
			<Input
				label="Email"
				type="email"
				name="email"
				error={form?.field === 'email' ? form?.suggestions : null}
				value={form?.return?.email}
				required
			/>
			<Input
				label="Password"
				type="password"
				name="password"
				error={form?.field === 'password' ? form?.suggestions : null}
				required
				visibilityToggle
			/>
			<button>Login</button>
		</Form>
	</div>
	<div class="col"></div>
</div>
