import type { PostMessage, PostMessageDataRequest } from './postmessage';
let result;

async function fetcher(url, postUrl) {
  let fetched;
  try {
    const response = await fetch(url)
    fetched = await response.json();
    console.log(fetched);
    console.log('fetched now post');
    let obj = fetched;
    // loop over list of article in fetched object
    for (let i = 0; i < obj.length; i++) {
      let article = obj[i];
      console.log(article);
      console.log('posting');
      console.log(JSON.stringify(article));
      try {
        const res = await fetch(postUrl, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(article)
        })
        const json = await res.json()
        console.log('posted');
        console.log(json);
      } catch (e) {
        console.log(e);
        result = e;
      }
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