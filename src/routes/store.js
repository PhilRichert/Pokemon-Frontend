import { writable } from 'svelte/store';

export let playerpoints = writable(0);
export let npcpoints = writable(0);
export let pokemonplayer = writable(0);
export let pokemonnpc = writable(0);
export let pkdex = writable([]);
