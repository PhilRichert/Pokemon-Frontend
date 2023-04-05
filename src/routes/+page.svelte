<script>

</script>

<svelte:head>
	<title>Home</title>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css">
	<meta name="description" content="Pokefight Simulator" />
</svelte:head>

<section>
	<h1>
		<span class="welcome">
			<h1>Pokefight</h1>
		</span>
	</h1>

	<h2>Choose a Pokemon and Fight</h2>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		padding: 0 0 calc(100% * 495 / 2048) 0;
	}
</style>
