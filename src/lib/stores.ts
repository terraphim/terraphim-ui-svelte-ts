import { writable } from 'svelte/store';
import { invoke } from '@tauri-apps/api/tauri';

const theme = writable('spacelab');
const role = writable('selected');
const is_tauri = writable(false);
let input = writable('');
export { theme, role, is_tauri, input };
