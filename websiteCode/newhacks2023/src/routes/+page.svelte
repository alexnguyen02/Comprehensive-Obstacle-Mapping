<script>
	import CustomFooter from '../comps/CustomFooter.svelte';
	import '../styles/main.css';
	import '../styles/fonts.css';
	import wheelchair from '../lib/images/wheelchair.jpg';
	import community from '../lib/images/community.jpg';
	import updates from '../lib/images/updates2.jpg';
	import CustomHeader from '../comps/CustomHeader.svelte';
</script>

<body>
	<CustomHeader />
	<section class="hero">
		<div class="hero-text-button">
			<h1>Accessibility App</h1>
			<p>
				We believe in a world where every journey is safe, and every path is accessible. 'Cityscape
				Monitor' illuminates the way by spotlighting road hazards that can impede accessibility.
				Join our community-driven platform where you can both report unexpected obstacles and
				discover clear, secure routes.
			</p>
			<!-- <a href="/login">Sign up <button /> </a> -->
		</div>
	</section>

	<div class="benefits-section">
		<h2 class="benefits-header">Your Benefits</h2>
		<div class="benefits-container">
			<!-- Benefit 1 -->
			<div class="benefit-item">
				<img src={wheelchair} alt="Benefit 1 Description" />
				<h3>Accessible Routes</h3>
				<p>Find routes that are wheelchair-friendly and avoid obstacles easily.</p>
			</div>
			<!-- Benefit 2 -->
			<div class="benefit-item">
				<img src={community} alt="Benefit 2 Description" />
				<h3>Community Driven</h3>
				<p>Share your own experiences and help improve route accessibility for others.</p>
			</div>
			<!-- Benefit 3 -->
			<div class="benefit-item">
				<img src={updates} alt="Benefit 3 Description" />
				<h3>Real-Time Updates</h3>
				<p>Stay up-to-date with the latest information on road conditions and closures.</p>
			</div>
		</div>
	</div>
	<div class="cta" />
</body>

<CustomFooter />

<style>
	/* Hero Section */
	.hero-text-button {
		padding: 150px;
		text-align: center;
		/* background-image: url(../lib/images/hero-background.jpg);
		background-size: 1000px; */
		background-color: #eef0f6;
	}

	.hero h1 {
		margin: 0;
		font-size: 2em;
	}

	.hero p {
		margin: 15px;
	}

	.hero a {
		padding: 10px 20px;
		font-size: 1em;
		color: #fff;
		background-color: #007bff; /* Bootstrap primary button color for example */
		border: none;
		border-radius: 5px;
		cursor: pointer;
		margin-top: 20px;
	}

	.hero a:hover {
		background-color: #0056b3;
		/* Darker shade for hover effect */
	}

	/* Benefits */
	.benefits-section {
		background-color: #fff; /* White background */
		text-align: center; /* Centering the text */
	}

	.benefits-header {
		margin-bottom: 30px; /* Space below the header */
	}

	.benefits-container {
		display: flex;
		justify-content: space-around; /* Evenly space the benefit items */
		flex-wrap: wrap; /* Allow items to wrap on small screens */
	}

	.benefit-item {
		flex-basis: 30%; /* Each item will take up roughly a third of the container */
		margin-bottom: 20px; /* Space below each item */
	}

	.benefit-item img {
		max-width: 100%; /* Make sure the image is responsive */
		height: auto; /* Maintain aspect ratio */
		margin-bottom: 10px; /* Space below the image */
	}

	@media (max-width: 800px) {
		.benefit-item {
			flex-basis: 45%; /* On smaller screens, go for half-width items */
		}
	}

	@media (max-width: 600px) {
		.benefit-item {
			flex-basis: 100%; /* On very small screens, stack the items */
		}
	}
</style>
