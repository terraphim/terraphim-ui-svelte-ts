<script lang="ts">
    import { Button, Field, Input } from 'svelma';
    import { invoke } from '@tauri-apps/api/tauri';
    import logo from '/src/assets/terraphim_gray.png';
    import { role } from './stores';
    let result: string = '';
    let input: string = "test";

    
    function handleClick() {
    invoke("search", {
      needle: input,
      role: $role,
    })
      .then(onMessage)
      .catch(onMessage);
  }
    
//  (res) => {
  // configStore=(JSON.parse(res));
  //                   role.set(configStore[0].name); 
  //                 }
                    
</script>
  

  
<Field>
    <Input type="search" bind:value={input} placeholder="Search" icon="search" expanded autofocus on:click={handleClick} on:submit={handleClick} on:keyup={e=>e.key==='Enter' && handleClick()}/>
</Field>
  {#if result.length !== 0}
{result}
{:else}
<section class="section">
  <div class="content has-text-grey has-text-centered">
    <img src={logo} alt="Terraphim Logo"/>
  </div>
  <div class="content has-text-grey has-text-centered">
    <p>
      I am Terraphim, your personal assistant.
    <p>
    </div>
</section>
{/if}
<style>
img {
  width: 16rem;
}
</style>