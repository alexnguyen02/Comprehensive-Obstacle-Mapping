<script>
	import CustomFooter from '../../comps/CustomFooter.svelte';
	import CustomHeader from '../../comps/CustomHeader.svelte';
	import '../../styles/main.css';
	import '../../styles/fonts.css';
	import { onMount } from 'svelte';
	import auth from './authService';
	import { isAuthenticated, user } from './store';
	import { goto } from '$app/navigation';
	import smartcity2 from '../../lib/images/smartcity2.png';

	let auth0Client;
	let newTask;

	
	
	onMount(async () => {
		auth0Client = await auth.createClient();
		
		isAuthenticated.set(await auth0Client.isAuthenticated());
		user.set(await auth0Client.getUser());
	
	});

	function login() {
		auth.loginWithPopup(auth0Client).then(() => redirectToDashboard());
	}

	function redirectToDashboard() {
		if (isAuthenticated) {
			goto('/dashboard');
		} else {
			alert('Login failed. Please try again');
		}
	}

	function logout() {
		auth.logout(auth0Client);
	}
</script>

<main>
	{#if $isAuthenticated}
		<nav>
			<div class="brand-name">
				<div class="nav-logo">
					<img src={smartcity2} alt="Logo" width="50" height="50" />
				</div>
				Cityscape Monitor
			</div>
			<div class="nav-links">
				<a href="/">Home</a>
				<a href="/dashboard">View Map</a>
			</div>
			<div class="button-container">
				<div class="column">
					<h1 class="title">Welcome back, {$user.name}!</h1>
					<a class="button" href="/#" on:click={logout}>Log Out</a>
				</div>
			</div>
		</nav>
	{/if}

	{#if !$isAuthenticated}
		<nav>
			<div class="brand-name">
				<div class="nav-logo">
					<img src={smartcity2} alt="Logo" width="50" height="50" />
				</div>
				Cityscape Monitor
			</div>
			<div class="nav-links">
				<a href="/">Home</a>
				<a href="/dashboard">View Map</a>
			</div>
		</nav>
		<div class="button-container">
			<div class="column">
				<a class="button" href="/#" role="button" on:click={login}>Login</a>
				<a class="button" href="/#" role="button" on:click={login}>Sign Up</a>
			</div>
		</div>
	{/if}
</main>

<style>
	#main-application {
		margin-top: 50px;
	}

	.button-container {
		top: 45%;
		border: none;
		display: flex;
		transform: translateY(-55%);
		left: 50%;
      	transform: translateX(-50%);
		position: absolute;
	}

	.button {
		margin: 15px;
		padding: 10px 20px;
		background-color: #333;
		color: #fff;
		border: none;
		border-radius: 5px;
		cursor: pointer;
	}

	.column {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}
	.title{
		text-align: right;
		font-weight: bold;
		color: black;
		size: 20px; 
	}

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
