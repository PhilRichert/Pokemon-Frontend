<script>
import axios from "axios";
import { onMount } from "svelte";
import { Button } from "sveltestrap";
import Icon from 'svelte-icons-pack/Icon.svelte';
import AiFillDelete from "svelte-icons-pack/ai/AiFillDelete";

let scoreboard = [];

const options = {
		url: 'https://pokefight-backend-jpjl.onrender.com/game/leaderboard',
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json;charset=UTF-8'
		}
	};



	onMount(() => {
		axios(options).then((response) => {
			if (!scoreboard) {
				return null;
			} else if (scoreboard !== response.data) {
				scoreboard = response.data;
				console.log(response.data)
			}
		});
		
	})


	function handleclick(id){
		axios( `https://pokefight-backend-jpjl.onrender.com/game/leaderboard/${id}`,
		{method: 'DELETE'}
		).then((response) => {
				console.log(response.data)
				
			
		})
		scoreboard = scoreboard.filter(scoreb => scoreb._id !== id )
	}
</script>

<svelte:head>
	<title>Home</title>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css">
	<meta name="description" content="Pokefight Simulator" />
</svelte:head>

<main>
	<div >
	<table class="table tabelle w-50">
		<thead>
		  <tr>
			<th scope="col">ID</th>
			<th scope="col">Winner</th>
			<th scope="col">Loser</th>
			<th scope="col">ID</th>
		  </tr>
		</thead>
		{#each scoreboard as battle(battle._id)}
		<tbody>
			<tr>
			  <th scope="row">{battle.winnerid}</th>
			  <td>{battle.winnername}</td>
			  <td>{battle.losername}</td>
			  <td>{battle.loserid}</td>
			  <td><Button on:click={() => handleclick(battle._id)} ><Icon src={AiFillDelete}/></Button></td>
			</tr>
		  
		  </tbody>
{/each}
		
	  </table>
	</div>

</main>

<style>
.tabelle{
	position: absolute;
	top:25%
}
</style>
