import App from './App.svelte'
import { initStore } from '@tomic/svelte';
  import { Store, Agent, properties, importJsonAdString} from '@tomic/lib';
    const agent = Agent.fromSecret("eyJjbGllbnQiOnt9LCJzdWJqZWN0IjoiaHR0cDovL2xvY2FsaG9zdDo5ODgzL2FnZW50cy95VWxONlgyZ1JBUTVZWDRxTWpDMFJkQTdMS08xcEh1cFdqd2FSeTE0SWZrPSIsInByaXZhdGVLZXkiOiJYZXBldm1US0lpUEpmcWZBZ1JMUDkwOVovTWJOWTF2eXVhNnRNQVFib3RnPSIsInB1YmxpY0tleSI6InlVbE42WDJnUkFRNVlYNHFNakMwUmRBN0xLTzFwSHVwV2p3YVJ5MTRJZms9In0=");
    // This is where you configure your atomic data store.
    const store = new Store({
      serverUrl: 'http://localhost:9883',
      agent,
    });
    initStore(store);
const app = new App({
  target: document.getElementById('app')
})

export default app
