<script lang="ts">
  import { Field, Input } from 'svelma';
  import { invoke } from '@tauri-apps/api/tauri';
  import logo from '/src/assets/terraphim_gray.png';
  import { role, is_tauri, input, serverUrl} from '../stores';
  import type { SearchResult } from './SearchResult';
  import ResultItem from './ResultItem.svelte';
  import { CONFIG } from '../../config';
  let result: SearchResult[] = [];

  function handleClick() {
    if ($is_tauri) {
      invoke('search', {
        needle: input,
        role: $role,
      });
    } else {
      console.log(input);
      console.log("Role config");
      console.log($role);
      console.log($serverUrl);
      //   if (obj.last !== undefined) {
      //  console.log(obj.last.toUpperCase());
      // }
      fetch(`${CONFIG.ServerURL}/search`, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          search: $input,
          skip: 0,
          limit: 10,
        }),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          result = data;
        })
        .catch(e => console.error(e));
    }
  }

  //  (res) => {
  // configStore=(JSON.parse(res));
  //                   role.set(configStore[0].name);
  //                 }
</script>

<Field>
  <Input
    type="search"
    bind:value={$input}
    placeholder="Search"
    icon="search"
    expanded
    autofocus
    on:click={handleClick}
    on:submit={handleClick}
    on:keyup={e => e.key === 'Enter' && handleClick()}
  />
</Field>

{#if result.length !== 0}
  {#each result as result_item}
    <ResultItem item={result_item} />
  {/each}
{:else}
  <section class="section">
    <div class="content has-text-grey has-text-centered">
      <img src={logo} alt="Terraphim Logo" />
    </div>
    <div class="content has-text-grey has-text-centered">
      <p>I am Terraphim, your personal assistant.</p>
      <p />
    </div>
  </section>
{/if}

<style>
  img {
    width: 16rem;
  }
</style>
