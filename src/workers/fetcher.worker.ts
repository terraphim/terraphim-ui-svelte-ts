import type { PostMessage, PostMessageDataRequest } from './postmessage';
let result;
async function fetcher(url, postUrl) {
  let fetched;
  try {
    const response = await fetch(url)
    fetched = await response.json();
    console.log(fetched);
    console.log('fetched now post');
    let obj = JSON.parse(fetched);
    try {
      const res = await fetch(postUrl, {
        method: 'POST',
        body: JSON.stringify({
          fetched
        })
      })
      const json = await res.json()
      console.log(json);
    } catch (e) {
      console.log(e);
      result = e;
    }

  } catch (e) {
    console.log(e);
    result = e;
  }
}
onmessage = ({ data: { data, msg } }: MessageEvent<PostMessage<PostMessageDataRequest>>) => {
  console.log(msg, data);
  fetcher(data['url'], data['postUrl']);

  const message: PostMessage<PostMessageDataRequest> = {
    msg: 'response1',
    data: { text: result }
  };
  postMessage(message);
};

export { };