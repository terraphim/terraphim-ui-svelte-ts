<!-- src/lib/components/ThemeSwitch.svelte -->
<script lang="ts">
    import { Field,Select } from 'svelma';
    import { theme,role} from './stores';
    import { Button } from 'svelma';
    import { invoke } from "@tauri-apps/api/tauri";

export let configStore=[];

invoke("get_config").then((res) => {
                    configStore=(JSON.parse(res));
                    role.set(Object.keys(configStore)[0]); 
                    
                  }
                    )
                    .catch((e) => console.error(e));

let themes ="";
//  FIXME: DO the for loop for theme
// $: if (role === configStore[0].name) {
//     themes = configStore[0].theme;
// }
$: if (themes) {
    role.set(themes);
    theme.set(configStore[themes].theme)
    console.log(configStore[themes].theme);
}
</script>
<Field grouped position="is-right">
    <Select bind:selected={themes}>
      {#each Object.values(configStore) as role_value}
      <option value={role_value.name}>{role_value.name}</option>
      {/each}
</Select>
</Field>
Selected Role {$role} 
Selection {themes}
Theme {$theme}
