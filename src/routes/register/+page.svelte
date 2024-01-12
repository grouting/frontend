<script lang="ts">
	import type { PageData } from './$types';
	import { Input, Button, Jumbotron, Form } from '$lib';

	export let data: PageData;
</script>

<div class="row">
	<div class="col"></div>
	<div class="col-5">
		<Jumbotron>Create your account</Jumbotron>
		<Form>
			<Input label="Email" type="email" name="email" required />
			<Input label="Password" type="password" name="password" required error />
			<Button>Register</Button>
		</Form>
	</div>
	<div class="col"></div>
</div>
