<script>
	import smartcity2 from '../lib/images/smartcity2.png';
</script>

<nav>
	<div class="brand-name">
		<div class="nav-logo">
			<a href="/">
				<img src={smartcity2} alt="Logo" width="50" height="50" />
			</a>
		</div>
		Cityscape Monitor
	</div>
	<div class="nav-links">
		<!-- Add your nav items here -->
		<a href="/">Home</a>
		<a href="/dashboard">View Map</a>
		<!-- <a href="#about">About</a> -->
		<a href="/login">Login</a>
		<a href="/login">Sign Up</a>
	</div>
</nav>

<style>
	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #333;
		color: white;
		padding: 0 20px;
	}

	.nav-logo {
		margin-top: 10px;
		margin-bottom: 5px;
		margin-right: 10px;
		font-size: 1.5em; /* Logo size */
	}

	.nav-links {
		display: flex;
		gap: 15px; /* Space between nav items */
	}

	.nav-links a,
	.nav-links button {
		background: none;
		border: none;
		color: white;
		padding: 10px 15px;
		text-decoration: none;
		font-size: 1em;
		cursor: pointer;
	}

	.nav-links button:hover,
	.nav-links a:hover {
		background-color: #555; /* Slight highlight on hover */
	}

	.brand-name {
		display: flex;
		align-items: center;
	}
</style>
