
<script>
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

<div>
	<button class="w-100" on:click={handleClick}>{buttonText}</button>
	<button class ="w-100" on:click={handleClick1}>{buttonTextdown}</button>
</div>
