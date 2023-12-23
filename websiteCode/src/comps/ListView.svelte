<script>
	import { initializeApp } from 'firebase/app';
	import { collection, deleteDoc, getDocs, getFirestore } from 'firebase/firestore';
	const firebaseConfig = {
		apiKey: 'AIzaSyCSWiCSpUo4wWY-GL5nPxBCLOSw66gLueM',
		authDomain: 'newhacks2023.firebaseapp.com',
		projectId: 'newhacks2023',
		storageBucket: 'newhacks2023.appspot.com',
		messagingSenderId: '412525376340',
		appId: '1:412525376340:web:3105e1f4fd027edb610ec1',
		measurementId: 'G-ECFGWVHSCL'
	};
	import { v4 as uuidv4 } from 'uuid';
	$: sizeOfPostsBox = 80;
	let spotsOfUserInputs = [];
	let issueType = '';

	// Initialize Firebase
	const app = initializeApp(firebaseConfig);
	const db = getFirestore(app);
	import { doc, setDoc } from 'firebase/firestore';

	import { createEventDispatcher, onMount } from 'svelte';
	import Page from '../routes/+page.svelte';
	let showForm = false;
	let fileUserGives;
	const dispatch = createEventDispatcher();
	let avatar = null;
	let fileinput;
	import UpVoteAndDownvote from './UpVoteAndDownvote.svelte';

	$: places = [];
	$: things = [];
	let input;
	let container;
	let image;
	let placeholder;
	let placeName = '';
	let issueText = '';
	let descriptionText = '';
	export let locationCords = { x: 0, y: 0 };
	let showImage = false;


	const onFileSelected = (e) => {
		let image = e.target.files[0];
		let reader = new FileReader();
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			avatar = e.target.result;
		};
		showImage = true;
	};

	const addSmth = () => {
		console.log('SMTH TO ADD');
		showForm = true;
		sizeOfPostsBox = 50;
	};

    const deleteBtn = async (e, postss) => {
        console.log(postss)
        await deleteDoc(doc(db, "spots", postss.uid ));
        
    }

	const postPost = async () => {
		let lat = locationCords.lat;
		let lng = locationCords.lng;
		const apiKey = 'AIzaSyAIoQuZnz5INyO7CIs2m-gopo3lsQM8nCo';
		const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;
		const res = await fetch(url);
		let moddedLocCords = {
			lat: locationCords.lat.toFixed(5),
			lng: locationCords.lng.toFixed(5)
		};
		const data = await res.json().then(async (dataagain) => {
			console.log(dataagain);
            let UIDTOUSE = uuidv4()
			console.log('THIS HPAPENED AFTER I GOT THE THING');
			let properAddressFr = dataagain.results[0].formatted_address;
			console.log(properAddressFr);
			let postObj = {
				name: 'User',
				issue: issueText,
				description: descriptionText,
				locationCords: locationCords,
				img: avatar,
				issueType: issueType,
				properAddress: properAddressFr,
				datePosted: getCurrentDateTime(),
                uid:UIDTOUSE
			};
			dispatch('addCords', postObj);
			console.log(postObj);
			await setDoc(doc(db, 'spots', UIDTOUSE), postObj).then ( () =>{
                console.log("YUHH WE SET IN DB AND THIS SHIT COMES AFTER")
            } );
			spotsOfUserInputs = [...spotsOfUserInputs, postObj];
		});
	};

	function getCurrentDateTime() {
		const now = new Date();
		const year = now.getFullYear();
		const date = now.getDate();
		const month = now.getMonth() + 1; // January is 0!
		const hours = now.getHours();
		const minutes = now.getMinutes();
		const seconds = now.getSeconds();

		// Padding single digit minutes and seconds with leading zero
		const paddedMonth = month.toString().padStart(2, '0');
		const paddedDate = date.toString().padStart(2, '0');
		const paddedHours = hours.toString().padStart(2, '0');
		const paddedMinutes = minutes.toString().padStart(2, '0');
		const paddedSeconds = seconds.toString().padStart(2, '0');

		return `${year}-${paddedMonth}-${paddedDate} ${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
	}

	const getCordsFromTextBasedAdress = async () => {
		const apiKey = 'AIzaSyAIoQuZnz5INyO7CIs2m-gopo3lsQM8nCo';
		const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${placeName}&key=${apiKey}`;

		const res = await fetch(url);
		const data = await res.json();
		locationCords = data.results[0].geometry.location;
		console.log(locationCords);
	};

	onMount(async () => {
		const querySnapshot = await getDocs(collection(db, 'spots'));
		querySnapshot.forEach((doc) => {
			// doc.data() is never undefined for query doc snapshots
			console.log(doc.id, ' => ', doc.data());
			spotsOfUserInputs = [...spotsOfUserInputs, doc.data()];
		});

		dispatch('onDataGot', spotsOfUserInputs);
	});

	const TESTWTF = () => {
		console.log(places);
		places = places;
		console.log(things);
		things = things;
		for (let i = 0; i < places.length; i++) {
			things.push(places[i].formattedAddress);
		}
		console.log(things);
	};

	const postPressed = (e, input) => {
		console.log(input);
		dispatch('postClicked', input);
		sizeOfPostsBox = 80;
	};

	const getCords = () => {
		console.log(locationCords);
	};

	const newverMindPost = () => {
		showForm = false;
		sizeOfPostsBox = 80;
	};
	const textChanged = () => {
		locationCords = null;
	};
	let buttonText = '👍'; // Initial button text
	let count = 0; // Initial count

	function handleClick() {
		// Update the component's state
		count += 1;
		buttonText = ` 👍${1}`;
	}
	let buttonTextdown = '👎'; // Initial button text
	let count2 = 0; // Initial count

	function handleClick1() {
		// Update the component's state
		count2 += 1;
		buttonTextdown = ` 👎${1}`;
	}
</script>

<div class=" mw-3 listViewBox">
	{#if !showForm}
		<button class="f3 w-100 link dim br1 ph3 pv2 mb2 dib white bg-black" on:click={addSmth}>
			Post an Issue
		</button>
	{/if}
	{#if showForm}
		<div class="ba border-box b--black w-80 ml-auto mr-auto tl">
			<div class="flex items-center">
				<p class="tc w-30">Issue:</p>
				<input
					bind:value={issueText}
					on:change={() => textChanged()}
					class="h-100 ml-auto w-80"
					type="text"
				/>
			</div>

			<div class="flex content-center justify-center items-center">
				<p class="tc w-30">Description:</p>
				<input bind:value={descriptionText} class="h-100 ml-auto w-80" type="text" />
			</div>
			<div class="db content-center justify-center items-center">
				<div class="flex items-center">
					<p class="w-30 tc">Where did this happen</p>
					<div class="db tc ml-auto mr-auto w-90">
						<input
							class="w-100"
							list="places"
							type="text"
							bind:value={placeName}
							on:focusout={getCordsFromTextBasedAdress}
						/>
						<div class="db">
							<small class="">
								{#if locationCords}
									X: {locationCords.lat}
									Y: {locationCords.lng}
								{/if}
							</small>
						</div>
					</div>
				</div>

				<datalist id="places">
					{#each things as thing}
						<option>{thing}</option>
					{/each}
					<!-- {#await things}
                    <p>Loading...</p>
                    {:then things}
                    {/await} -->
				</datalist>
			</div>

			<div class="flex content-center justify-center items-center">
				<p class="w-50">Categorize Issue:</p>
				<select bind:value={issueType} class="h-100 w-100" type="text">
					<option>wheelchair friendly</option>
					<option>wheelchair inaccessible</option>
					<option>construction</option>
					<option>animal crossing</option>
					<option>elavator</option>
					<option>slipping</option>
					<option>steep incline</option>
					<option>steep stairs</option>
					<option>snowy area</option>
					<option>uneven pavement</option>
				</select>
			</div>

			<div class="block w-80 tl">
				<div class="flex ml-auto w-80">
					{#if !showImage}
						<input
							type="file"
							accept=".jpg, .jpeg, .png"
							on:change={(e) => onFileSelected(e)}
							bind:this={fileinput}
						/>
					{:else}
						<div class="w-50 ml-auto mr-auto">
							<img class=" " src={avatar} alt="d" />
						</div>
					{/if}
				</div>
			</div>

			<button
				class="ml-auto mr-auto w-100 f6 link dim br1 ph3 pv2 dib white bg-black pt3 mt3"
				on:click={postPost}>Post</button
			>
			<button
				class="ml-auto mr-auto w-100 f6 link dim br1 pv2 dib white bg-red"
				on:click={newverMindPost}>Nevermind</button
			>
		</div>
	{/if}

	<div class="contain">
		<div class="post" style={`max-height: ${sizeOfPostsBox}vh;`}>
			{#each spotsOfUserInputs as input}
				<div
					on:keydown={(e) => {
						console.log('do nothing');
					}}
					class="db b--black bb w-80 ml-auto mr-auto border-box ba pa2 ma2"
				>
					<div class="flex">
						<p>Date: {input.datePosted}</p>
					</div>

					<div class="flex">
						<strong>Issue: {input.issue}</strong>
					</div>
					<div class="flex">
						<p>Description: {input.description}</p>
					</div>
					<div class="flex">
						<p>Where did it happen:</p>
						<p>{input.properAddress}</p>
					</div>
					{#if input.img}
						<img src={input.img} />
					{/if}
					<div class="flex justify-around">
						<button
							class="w-50"
							on:click={(e) => {
								postPressed(e, input);
							}}>View On Map</button
						>
						<button on:click={(e) => deleteBtn(e,input)} class="w-50"> Delete🗑️ </button>
					</div>
					<UpVoteAndDownvote />
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	/* file upload button */
	input[type='file']::file-selector-button {
		border-radius: 4px;
		padding: 0 16px;
		height: 40px;
		cursor: pointer;
		background-color: white;
		border: 1px solid rgba(0, 0, 0, 0.16);
		box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.05);
		margin-right: 16px;
		transition: background-color 200ms;
	}

	/* file upload button hover state */
	input[type='file']::file-selector-button:hover {
		background-color: #f3f4f6;
	}

	/* file upload button active state */
	input[type='file']::file-selector-button:active {
		background-color: hsl(220, 13%, 91%);
	}

	img {
	}
	.listViewBox {
		max-height: 5em;
	}
	.post {
		background-color: lightgray;
		overflow-x: scroll;
	}
</style>
