"use strict";

const bookShelf = document.querySelector("tbody");
const modal = document.querySelector(".modal");
const inputs = document.querySelectorAll("input");
const addBookBtn = document.getElementById("add-book-btn");
const form = document.querySelector("form");

console.log(inputs);

/*======================================================*/
const myLibrary = [];
//? Add functionality for handling modal
document.body.addEventListener("click", (e) => {
  //* Activates modal once button is clicked
  if (e.target.closest("#add-book-btn")) {
    modal.classList.add("active");
  }

  //* removes modal once overlay is clicked
  if (e.target.classList.contains("active") && e.target.closest(".modal")) {
    modal.classList.remove("active");
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Submitted");
});

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

function insertIntoDom(library) {
  library.forEach((book) => {
    const { title, author, pages, read } = book;

    const bookRowHTML = `
      <tr>
          <td>${title}</td>
          <td>${author}</td>
          <td>${pages}</td>
          <td><img src="" alt="Cover image"></td>
          <td>
            <button class="toggle-read-btn read">
            ${read ? "Read" : "Not read"}
            </button>
          </td>
      </tr>
    `;

    bookShelf.insertAdjacentHTML("beforeend", bookRowHTML);
  });
}

insertIntoDom(myLibrary);
