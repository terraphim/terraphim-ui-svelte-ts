<script lang="ts">
  import { Tabs, Tab } from 'svelma';
  import { Button, Field, Icon, Input } from 'svelma';
  let data;
  let fetchUrl = 'https://raw.githubusercontent.com/terraphim/terraphim-cloud-fastapi/main/data/ref_arch.json';
  let postUrl = 'http://localhost:8000/article/';
  // const handleClickUrl = async () => {
  //   data = await fetch(fetchUrl).then(x => x.json());
  // };

  const handleClickUrl = async () => {
    loadWorker();
  };
  // import fetchStore from './fetch.js';
  // const [data, loading, error, get] = fetchStore(url)
  import type {
    PostMessage,
    PostMessageDataRequest,
    PostMessageDataResponse,
  } from '$workers/postmessage.ts';

  const onWorkerMessage = ({
    data: { msg, data },
  }: MessageEvent<PostMessage<PostMessageDataResponse>>) => {
    console.log(msg, data);
  };

  let syncWorker: Worker | undefined = undefined;

  const loadWorker = async () => {
    const SyncWorker = await import('$workers/fetcher.worker?worker');
    syncWorker = new SyncWorker.default();

    syncWorker.onmessage = onWorkerMessage;

    const message: PostMessage<PostMessageDataRequest> = {
      msg: 'fetcher',
      data: {
        url: fetchUrl,
        postUrl: postUrl,
      },
    };
    syncWorker.postMessage(message);
  };
  import { store } from '@tomic/svelte';
  // import { getResource, getValue } from '@tomic/svelte';
  // import { urls } from '@tomic/lib';
  
  const resource = $store.getResourceLoading('http://localhost:9883/config/y3zx5wtm0bq');
  // const resource1 = getResource('https://atomicdata.dev/documents/tgzamh5hk2t');
  // const name = getValue<string>(resource1, urls.properties.name);
  console.log(resource);
</script>

<Tabs style="is-boxed">
  <Tab label="JSON">
    <Field>
      <Input
        type="search"
        placeholder="Fetch JSON"
        icon="search"
        bind:value={fetchUrl}
      />
      <Input
        type="search"
        placeholder="Post JSON"
        icon="search"
        bind:value={postUrl}
      />
      <p class="control">
        <Button
          type="is-primary"
          on:click={handleClickUrl}
          on:submit={handleClickUrl}>Fetch</Button
        >
      </p>
    </Field>
    <pre>
            {JSON.stringify(data, null, 2)}
          </pre>
  </Tab>
  <Tab label="JSON-AD">Is good</Tab>
  <Tab label="WikiMedia">lol no</Tab>
</Tabs>
