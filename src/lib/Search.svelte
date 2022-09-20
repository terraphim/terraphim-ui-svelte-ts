<script lang="ts">
    import { Tag, Taglist, Field, Input} from 'svelma';
    import { invoke } from '@tauri-apps/api/tauri';
    import logo from '/src/assets/terraphim_gray.png';
    import { fade } from 'svelte/transition'
    import { role,is_tauri, input } from './stores';
    let result: string = '';
  

    
    function handleClick() {
      if($is_tauri){
        invoke("search", {
        needle: input,
        role: $role,
      })
    }else{
      console.log(input);
      fetch('http://127.0.0.1:8000/search',
      {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "search":$input,
          "skip": 0,
          "limit": 10
        })
      }
      ).then(response => response.json())
          .then(data => {
              console.log(data);
              result=data;
          }).catch((e) => console.error(e));

    }
  }
    
//  (res) => {
  // configStore=(JSON.parse(res));
  //                   role.set(configStore[0].name); 
  //                 }
                    
</script>
  

  
<Field>
    <Input type="search" bind:value={$input} placeholder="Search" icon="search" expanded autofocus on:click={handleClick} on:submit={handleClick} on:keyup={e=>e.key==='Enter' && handleClick()}/>
</Field>
  {#if result.length !== 0}
  
    
    {#each Object.values(result) as result_item}
    <div class="box">
    <article class="media">
      <div class="media-content">
      <div class="content">
        <div class="level-right">
        <Taglist>
          <Tag rounded>{result_item.pk}</Tag>
          <Tag >Tag1</Tag>
          <Tag type='is-info'>Tag2</Tag>
        </Taglist>
      </div>
        <p transition:fade>
              <strong>{result_item.title}</strong>
              <br />

              <small>Description</small>
              <small />
              <br /> 
        </p>
      </div>
            <div class="level-right">      
              <nav class="level is-mobile" transition:fade>
                <div class="level-right">
                  <a href="{result_item.url}" target="_blank" class="level-item" aria-label="URL">
                    <span class="icon is-medium">
                      <i class="fas fa-link"></i>
                  </span>
                </a>
                  

                  <a href class="level-item" aria-label="download/save">
                      <span class="icon is-medium">
                      <i class="fas fa-download" aria-hidden="true" />
                    </span>
                  </a>
                  <a href class="level-item" aria-label="like">
                    <span class="icon is-medium">
                      <i class="fas fa-plus" aria-hidden="true" />
                    </span>
                  </a>
                  <a href class="level-item" aria-label="like">
                    <span class="icon is-medium">
                      <i class="fas fa-bookmark" aria-hidden="true" />
                    </span>
                  </a>
                </div>
              </nav>
            </div>
      </div>
   
    </article>
  </div>
    {/each}

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