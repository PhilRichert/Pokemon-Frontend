<script>
	
import { Button } from "sveltestrap";
import { playerpoints } from "../store";
import { npcpoints } from "../store";
import { pokemonplayer } from "../store";
import { pokemonnpc } from "../store";


export let id;
export let base;
export let dex;

let pointsplayer = 0;
    let pointsnpc = 0;
    

function generateRandomPokemon(){
		let random = Math.floor(Math.random() *dex.length) + 1;
	    let randommon = dex.filter((e) => 
		e.id == random
		) 
        let savepokemon = () =>{
            pokemonplayer.update(n => 
        n = id 
      )
      pokemonnpc.update(n => 
        n = random
      )
        }
        savepokemon()
    return randommon}

function compare (player,npc){
 

    console.log(player.Attack, npc[0].base.Attack)
    function comparestat(stat,statnpc){

       if(stat > statnpc) {
        pointsplayer ++
    }
    else if(stat < statnpc)
        pointsnpc ++
    else{null}
    }
    comparestat(player.Attack,npc[0].base.Attack)
    comparestat(player.Defense,npc[0].base.Defense)
    comparestat(player.HP,npc[0].base.HP)
    comparestat(player['Sp. Attack'],npc[0].base.Attack)
    comparestat(player['Sp. Defense'],npc[0].base.Attack)
    comparestat(player.Speed,npc[0].base.Attack)
    
        let save = () =>{
            playerpoints.update(n => 
        n = pointsplayer 
      )
      npcpoints.update(n => 
        n = pointsnpc
      )
        }
      
    save()

    console.log(pointsplayer, pointsnpc)

}


</script>
<main>
    <Button type="button" outline color="info" on:click={() => compare(base,generateRandomPokemon())} ><a href="/battle" >Fight</a></Button>
</main>