<script lang="ts">
  import logo from '/public/assets/terraphim_gray.png';
  import { writable } from 'svelte/store';
  import Shortcuts from './lib/Shortcuts.svelte';
  import '@fortawesome/fontawesome-free/css/all.css';
  import Search from './lib/Search/Search.svelte';
  import ThemeSwitcher from './lib/ThemeSwitcher.svelte';
  import { theme } from './lib/stores';
  import configStore from './lib/ThemeSwitcher.svelte';
  import { Route, router, active } from 'tinro';
  import FetchTabs from './lib/Fetchers/FetchTabs.svelte';
</script>

<svelte:head>
  <meta
    name="color-scheme"
    content={$theme == 'spacelab' ? 'lumen darkly' : $theme}
  />
  <link
    rel="stylesheet"
    href={`./assets/bulmaswatch/${$theme}/bulmaswatch.min.css`}
  />
</svelte:head>

<main>
  <ThemeSwitcher />
  <Search />

  <br />
  <ul>
    {#if Array.isArray(configStore)}
      {#each configStore as item}
        <li>{item.name} {item.theme}</li>
      {/each}
    {/if}
  </ul>
  <!-- <nav class="navbar ">

    <a class="navbar-item " href="/" use:active exact>Home</a>
    <a class="navbar-item " href="/fetch" use:active>Fetchers</a>
  </nav> -->
  <Route path="/fetch"><FetchTabs /></Route>
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
