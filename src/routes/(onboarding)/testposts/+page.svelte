<script lang="ts">
	import { Post, Button } from '$lib';

	const username = 'Jeremy12';

	const posts = [
		{
			content:
				" Women, women, sex. I want to have sex for some reason. Women sleep around. I should be allowed to sleep around but the people I sleep with should not be allowed because I'm a man, feminism something something gone too far something something... Women grr. Men rise up! Andrew tate top G top shagger. I will become rich like him but don't ask me how because all he's taught me is how to dropship",
			username: 'EatonMess',
			postedAt: new Date(2024, 1, 17, 11, 23),
			tags: [
				'deep',
				'thought',
				'i consider myself a philosopher because I read jordan petersons book'
			]
		},
		{
			content: 'check out this album of 67 pictures of my dog from the last 2 days!',
			username: 'MyAmazingDog',
			postedAt: new Date(2024, 1, 17, 11, 30),
			tags: ['dog', 'woof', 'i never aged after 13']
		},
		{
			content: "I rewrote the firmware for my uncle's sleep apnea ventilator in rust!",
			username: 'EdgySciencePun',
			postedAt: new Date(2024, 1, 17, 11, 27),
			tags: ['rust', 'programming', 'webdev']
		},
		{
			content:
				'watch me play subway surfers while I read out posts from askreddit! this is the future of content and the internet',
			username: 'AskRedditTrueFactsNSFW',
			postedAt: new Date(2024, 1, 17, 10, 13),
			tags: ['true', 'dopamine', 'nsfw']
		},
		{
			content:
				'hey check out this edgy meme compilation I found. I found this myself, I did not get it from my friends who are edgier than me ',
			username: 'InsideDog',
			postedAt: new Date(2024, 1, 17, 10, 10),
			tags: ['memes', 'offensive', 'neglects to be funny because its preoccupied being offensive']
		},
		{
			content: 'I hate everyone equally',
			username: 'GenuineRacistInDenial',
			postedAt: new Date(2024, 1, 17, 9, 48),
			tags: ['4chan isnt that bad', 'military porn', 'guns']
		},
		{
			content: 'ed balls',
			username: 'EdBalls',
			postedAt: new Date(2024, 1, 17, 9, 30),
			tags: ['ed balls', 'ed balls', 'ed balls']
		},
		{
			content: 'hello this is another post',
			username: 'InsideDog',
			postedAt: new Date(2024, 1, 17, 11, 27),
			tags: ['rust', 'programming', 'webdev']
		},
		{
			content: 'hello this is another post',
			username: 'InsideDog',
			postedAt: new Date(2024, 1, 17, 11, 27),
			tags: ['rust', 'programming', 'webdev']
		}
	];
</script>

<div class="container no-padding">
	<div class="row">
		<div class="col">
			<aside>
				<h1 class="username">Hello, you are {username}.</h1>
				<p class="expiry-time">{username} is scheduled for execution in 3 days.</p>
				<form>
					<textarea
						name="content"
						cols="30"
						rows="10"
						placeholder="Enter your insightful comments here you fucking idiot"
					></textarea>
					<button>Post as {username}</button>
				</form>
			</aside>
		</div>
		<div class="col-8">
			<article>
				{#each posts as post}
					<Post {...post} />
				{:else}
					<p>No posts to display</p>
				{/each}
			</article>
		</div>
	</div>
</div>

<style lang="scss">
	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	textarea {
		border: 1px solid $primary-dimmed;
		border-radius: 0;
		background-color: $background-colour;
		color: $colour;
		font-size: $font-size;
		font-family: $font-family;
		padding: $interact-padding-y $interact-padding-x;
		min-height: 2rem;
		flex: 1 1 auto;
		resize: vertical;
	}

	h1.username {
		margin: 0;
	}

	p.expiry-time {
		margin-top: 0.25rem;
	}

	aside {
		padding-top: 0.5rem;
		position: -webkit-sticky; /* Safari */
		position: sticky;
		top: 0;
	}

	.container.no-padding {
		padding-left: 0 !important;
		padding-right: 0 !important;
	}
</style>
