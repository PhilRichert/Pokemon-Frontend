<script>
import { Button } from "sveltestrap";
import { pokemonnpc,pkdex,pokemonplayer,npcpoints,playerpoints } from "../store.js"
import { onMount } from "svelte";
import Loading from "../Loading.svelte";

import axios from 'redaxios';






let pointsplayer;
let pointsnpc;
let playerpkmn;
let npcpkmn;
let winner;
let loser;
let pokedex;
let showImages = false;
let showWinner = false;
let isLoading = false;




onMount(() => 

{
	showImages = true;
 calculatewinner()
 
}
)


  function calculatewinner(){
	isLoading = true;

	

	playerpoints.subscribe(value => {
pointsplayer = value
})

npcpoints.subscribe(value => {
pointsnpc = value
})

pokemonplayer.subscribe(value => {
	playerpkmn = value
})

pokemonnpc.subscribe(value => {
	npcpkmn = value
})
pkdex.subscribe(data => {pokedex = data})



		if(pointsplayer > pointsnpc){
		winner = playerpkmn
		loser = npcpkmn
	}
	else if (pointsnpc > pointsplayer){
		winner = npcpkmn
		loser = playerpkmn
	}
	else if (pointsnpc == pointsplayer)
	{  "Draw"};
	
	let winnername = pokedex.filter((e) => 
		e.id == winner
		) 
let losername = pokedex.filter((e) => 
		e.id == loser
		) 
	
console.log(pokedex, winner)
	
	if(!winnername[0].name.english && !winner ){
		console.log("warte auf Daten")
		 return 
	}
	else{
		function postwinner(){

		

		const options = {
      url: "https://pokefight-backend-jpjl.onrender.com/game/save",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: {
		winnername: winnername[0].name.english ,
  winnerid: winner,
  losername: losername[0].name.english,
  loserid: loser,
        
      },
    };
    axios(options).then((res) => {	
      console.log(res.data);
	  isLoading = false;
    })
	.catch(error => {
      console.log('Fetch error:', error);
    });

	}
	postwinner()
	;
	}
	
    
	
	
	
  ;
}



$: console.log(showImages, showWinner)


</script>

<svelte:head>
	<title>pokedex</title>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css"
	/>
	<meta name="description" content="About this app" />
</svelte:head>

<main>
	<div class="arena"  >
		{#if isLoading && !showImages}
		<Loading isLoading = {isLoading} />
		{/if}
		{#if showImages && !showWinner}
		<div class="container">
		
	
		<div class="d-flex justify-content-around align-items-center">
				<img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${playerpkmn}.png`}
				alt="Pokemonimg"
				height="450px"
				width="450px"
				class="image animation-left left"
				>
				<img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${npcpkmn}.png`}
				alt="Pokemonimg"
				height="450px"
				width="450px"
				class="image animation-right right"
				>
			
		
		</div>
		
	</div>
	
		<div class="d-flex  justify-content-center pt-5">
			<Button type="button" color="danger" size="lg" on:click = {() => {showWinner = true}}> Fight</Button>
		</div>
		{:else if showImages && showWinner}
		<div class="d-flex flex-column">
		<div class="winner-text d-flex justify-content-center align-items-center mt-3">
			<span class="winner-letter">W</span>
			<span class="winner-letter">i</span>
			<span class="winner-letter">n</span>
			<span class="winner-letter">n</span>
			<span class="winner-letter">e</span>
			<span class="winner-letter">r</span>
		  </div>
		  
		<div class="d-flex justify-content-center align-items-center">
			<img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${winner}.png`}
			alt="Pokemonimg"
			height="450px"
			width="450px"
			class="image animation-winner"
			>
			</div>
			<div class="d-flex justify-content-center align-items-center">
				<Button type="button" color="danger" size="lg" ><a href="/scoreboard" >To Scoreboard</a></Button>
			</div>
		</div>
		{/if}
	</div>
	
</main>

<style>

	/* .arena{
		background-image: url(https://c.pxhere.com/photos/07/1e/bullfight_arena_spanish_pride_bullfighting_spectacle_fight_folklore-953274.jpg!d);
		background-size: 75vw;
		background-repeat: no-repeat;
	} */

	
  .container {
    position: relative;
    width: 100%;
    height: 100%;
  }
  
  .image {
    position: absolute;
    top: 25%;
  }

  .animation-left{
	transform: translateY(-50%);
    animation: slide-in-left 1s ease-out forwards;
  }

  .animation-right{
	transform: translateY(-50%);
    animation: slide-in-right 1s ease-out forwards;
  }

  .animation-winner{
	transform: translateY(-50%);
	animation: show-winner 2s ease-out forwards;
  }
  
  .image.left {
    left: -150px;
  }
  
  .image.right {
    right: -150px;
  }
  .winner-text {
    display: inline-block;
    font-family: Arial, sans-serif;
    font-size: 48px;
    font-weight: bold;
    color: #fff;
    text-shadow: 2px 2px #000;
  }

  .winner-letter {
    display: inline-block;
    transform: rotate(-5deg);
    margin-right: 5px;
    text-shadow: 2px 2px #000;
  }

  .winner-letter:nth-child(2n) {
    transform: rotate(5deg);
  }
  
  @keyframes slide-in-left {
    from { transform: translateX(-200px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }

  @keyframes slide-in-right {
    from { transform: translateX(200px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }

  @keyframes show-winner {
    from { transform: translateY(200px); opacity: 0; animation-delay: 1s; }
    to { transform: translateY(0); opacity: 1; }
  }

</style>

