<script>
	import '../../styles/main.css';
	import '../../styles/main.css';
	import { v4 as uuidv4 } from 'uuid';
	import CustomHeader from '../../comps/CustomHeader.svelte';
	import wheelchairImage from '../../lib/images/wheelchair.jpg';
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import ListView from '../../comps/ListView.svelte';
	let bigL;
	let mapElement;
	let map;
	let L;
	onMount(async () => {
		if (browser) {
			L = await import('leaflet');
			//map = L.map(mapElement).setView([43.655, -79.391], 13);
			map = L.map(mapElement).setView([43.655, -79.391], 13);
			L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution:
					'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			}).addTo(map);
			// var marker = L.marker([43.655, -79.391]).addTo(map);
			// var circle = L.circle([51.508, -0.11], {
			// 	color: 'red',
			// 	fillColor: '#f03',
			// 	radius: 500
			// }).addTo(map);
			// marker.bindPopup('<b>    Hello world!</b><br>I am a popup.').openPopup();
			map.on('click', onMapClick);
		}
	});
	onDestroy(async () => {
		if (map) {
			console.log('Unloading Leaflet map.');
			map.remove();
		}
	});
	const addAMarker = (e) => {
		console.log('YES', e.detail);
		let dataobj = e.detail;
		var marker = L.marker([dataobj.locationCords.lat, dataobj.locationCords.lng]).addTo(map);
		marker.bindPopup(`${dataobj.issue}<br>${dataobj.description}`).openPopup();
	};
	const showSavedMarkerData = (dataOfMarkers) => {
		let dataOfObjects = dataOfMarkers.detail;
		console.log('SDFSD');
		for (let i = 0; i < dataOfObjects.length; i++) {
			let dataobj = dataOfObjects[i];
			let myIcon = L.icon({
				iconSize: [32, 32],
				iconUrl: '../wheelchairBootleg.png'
			});
			if (dataobj.hasOwnProperty('issueType')) {
				if (dataobj.hasOwnProperty('issueType')) {
					let pathToUseLOL = '';
					switch (dataobj.issueType) {
						case 'wheelchair friendly':
							pathToUseLOL = '../wheelchair accessible.jpg';
							break;
						case 'wheelchair inaccessible':
							pathToUseLOL = '../wheelchairBadPlace.jpg';
							break;
						case 'construction':
							pathToUseLOL = '../construction sign.jpg';
							break;
						case 'animal crossing':
							pathToUseLOL = '../AnimalCrossing.jpg';
							break;
						case 'elevator':
							pathToUseLOL = '../elevatorBetter.png';
                            console.log('YIOAEOIJDSFIOJDSFIODFSIOFSGJ')
							break;
						case 'slipping':
							pathToUseLOL = '../PersonSlipping.jpg';
							break;
						case 'steep incline':
							pathToUseLOL = '../Steep incline.jpg';
							break;
						case 'steep stairs':
							pathToUseLOL = '../SteepStairs.jpg';
							break;
                        case "uneven pavement":
                            pathToUseLOL = "../UnevenPavement.jpg"
                        case "snowy area":
                            pathToUseLOL = "../SnowHazard.jpg"
                        
						default:
							pathToUseLOL = '../errrorIcon.png';
					}

					myIcon = L.icon({
						iconSize: [32, 32],
						iconUrl: pathToUseLOL
					});
				}
			}
			var marker = L.marker([dataobj.locationCords.lat, dataobj.locationCords.lng], {
				icon: myIcon
			}).addTo(map);
			let popUpHtml = '';
			if (dataobj.img) {
				popUpHtml = `<strong>Issue: ${dataobj.issue}</strong><br>Description: ${dataobj.description}<br><img src=${dataobj.img} />`;
			} else {
				popUpHtml = `<strong>Issue: ${dataobj.issue}</strong><br>Description: ${dataobj.description}<br>`;
			}

			marker.bindPopup(popUpHtml).openPopup();
		}
	};

	const moveToTheLocationOfPostClicked = (dataOfPressedPost) => {
		console.log(dataOfPressedPost.detail);
		map.setView(
			[dataOfPressedPost.detail.locationCords.lat, dataOfPressedPost.detail.locationCords.lng],
			12,
			{ animate: true }
		);
	};
	let cordsToForceIn;
	const onMapClick = (e) => {
		console.log(e.latlng);
        let b = {
            lat: e.latlng.lat,
            lng: e.latlng.lng,
        }
		cordsToForceIn = b;
	};
</script>

<CustomHeader />
<main>
	<div class="flex-l db-m">
		<div on:click={(e) => onMapClick(e)} class="mapView" bind:this={mapElement} />
		<div class="mw6-l listViewBox">
			<ListView
				locationCords={cordsToForceIn}
				on:postClicked={(dataOfPost) => moveToTheLocationOfPostClicked(dataOfPost)}
				on:onDataGot={(e) => {
					showSavedMarkerData(e);
				}}
				on:addCords={(e) => addAMarker(e)}
			/>
		</div>
	</div>
</main>

<style>
	@import 'leaflet/dist/leaflet.css';
	.mapView {
		height: 100vw;
		width: 100vw;
	}
	.listViewBox {
	}
</style>
