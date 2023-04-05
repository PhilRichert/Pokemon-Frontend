<script>
	import { onMount } from 'svelte';
	import axios from 'axios';
	import {  Modal } from 'sveltestrap';
	import Fight from './Fight.svelte';
	import { pkdex } from '../store.js';
	import Loading from '../Loading.svelte';


	let pokedex = [];
	let expanded = null;
	let isLoading = false;
	

	const options = {
		url: 'https://pokefight-backend-jpjl.onrender.com/pokemon',
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json;charset=UTF-8'
		}
	};



	onMount(() => {
		isLoading = true;
		axios(options).then((response) => {
			if (!pokedex) {
				return null;
			} else if (pokedex !== response.data) {
				pokedex = response.data;
				pkdex.set(response.data);
				isLoading = false;
				
			}
		});
		
	}
	
	
	
	
	);





</script>

<svelte:head>
	<title>pokedex</title>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css"
	/>
	<meta name="description" content="About this app" />
</svelte:head>


{#if isLoading}
<Loading isLoading={isLoading} />
	{:else}
<main>
	
 

	<div class="d-inline-flex flex-row flex-wrap m-auto" style={"width: 75vw"}>
	{#each pokedex as pokemon(pokemon.id)}

	<div on:click={() => expanded = pokemon.id}  class="card m-2 p-2 box" style="width: 18rem;" >
		<img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} class="card-img-top" alt="Pokemonimg">
		<div class="card-body">
			{#if expanded === pokemon.id}
			<div class="d-flex justify-content-center">
			<list style="list-style-type: none;">
				<li>
					ID: {pokemon.id}
				</li>
				<li>
					Attack:{pokemon.base.Attack}
				</li>
				<li>
					Defense: {pokemon.base.Defense}
				</li>
				<li>
					HP: {pokemon.base.HP}
				</li>
				<li>
					Sp. Attack:{pokemon.base['Sp. Attack']}
				</li>
				<li>
					Sp. Defense:{pokemon.base['Sp. Defense']}
				</li>
				<li>
					Speed: {pokemon.base.Speed}
				</li>
				<Fight id={pokemon.id} base={pokemon.base} dex={pokedex} />
				
			</list>
		</div>
			{/if}
		</div>
	  </div>
	
	
	
	{/each}
</div>

</main>

{/if}

<style>
.box{
	margin:50px;
		padding: 50px
}
	.box:hover{
		transform: scale(1.1);
		
	}
</style>
