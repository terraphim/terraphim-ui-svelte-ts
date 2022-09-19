import { writable } from 'svelte/store'
import { invoke } from '@tauri-apps/api/tauri';

const theme = writable('spacelab')
const role = writable('selected');
export { theme, role };