<script lang="ts">
  import logo from './assets/terraphim_gray.png'
  import { writable } from "svelte/store";
  import Shortcuts from "./lib/Shortcuts.svelte";
  import Communication from "./lib/Communication.svelte";
  import Cli from './lib/Cli.svelte';
  import '@fortawesome/fontawesome-free/css/all.css';
  import Search from './lib/Search.svelte';
  import ThemeSwitcher from './lib/ThemeSwitcher.svelte';
  import { theme }from './lib/stores';
  import configStore from './lib/ThemeSwitcher.svelte';
  

  

  const views = [
    {
      label: "CLI",
      component: Cli,
    },
    {
      label: "Shortcuts",
      component: Shortcuts,
    },
    {
      label: "Messages",
      component: Communication,
    },
    
];

let selected = views[0];
let responses = writable([]);
function select(view) {
    selected = view;
  }
 


function onMessage(value) {
    responses.update(r => [{ text: `[${new Date().toLocaleTimeString()}]` + ': ' + (typeof value === "string" ? value : JSON.stringify(value)) }, ...r])
  }

// this function is renders HTML without sanitizing it so it's insecure
  // we only use it with our own input data
  function insecureRenderHtml(html) {
    responses.update(r => [{ html }, ...r])
  }

function clear() {
  responses.update(() => []);
}
</script>
<svelte:head>
    <meta name="color-scheme" content={$theme == 'spacelab' ? 'lumen darkly' :
    $theme} /> <link rel="stylesheet" href={`/src/assets/bulmaswatch/${$theme}/bulmaswatch.min.css`} />
    
</svelte:head>

<main>
  


  <ThemeSwitcher />
  <Search />

  <br/>
  <ul>
    {#if Array.isArray(configStore)}
      {#each configStore as item}
    <li>{item.name} {item.theme}</li>
      
      {/each}
    {/if}
  </ul>

</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

</style>
