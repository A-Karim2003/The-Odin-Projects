"use strict";
const artricleContainerEl = document.querySelector(".article");

async function getUserData() {
  try {
    const response = await fetch("https://dummyjson.com/posts");
    if (!response.ok) throw new Error("Could not fetch data");

    const { posts } = await response.json();
    const data = extractData(posts);
    insertData(data);
  } catch (error) {
    console.error(error);
  }
}

function extractData(posts) {
  const data = posts.slice(0, 16);

  return data.map((user) => {
    return {
      title: user.title,
      description: user.body,
    };
  });
}

function insertData(data) {
  data.forEach((user) => {
    const { title, description } = user;

    const html = `
    <div class="card">
        <h3 class="card-title">${title}</h3>
        <p>${description}</p>
        <div class="card-icons">
            <i class="fas fa-star"></i>
            <i class="fas fa-plus"></i>
            <i class="fas fa-share-nodes"></i>
        </div>
    </div>
    `;

    artricleContainerEl.insertAdjacentHTML("beforeend", html);
  });
}

getUserData();
