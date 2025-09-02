import fetch from "node-fetch";

const TOKEN = "YOUR_TOKEN";

async function testPosts() {
  const res = await fetch("http://localhost:5000/posts", {
    headers: {
      "Authorization": `Bearer ${TOKEN}`
    }
  });
  const data = await res.json();
  console.log(data);
}

testPosts();
