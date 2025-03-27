async function getPosts() {
  const response = await fetch("http://localhost:3000/posts", {
    method: "GET",
  });
  const result = await response.json();
  console.log(result);
  return result;
}

async function displayStuff() {
  const display = document.querySelector(".posts");
  const arr = await getPosts();
  display.textContent = JSON.stringify(arr);
}

displayStuff();
