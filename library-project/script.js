"use strict";

const bookShelf = document.querySelector("tbody");
const modal = document.querySelector(".modal");
const inputs = document.querySelectorAll("input");
const addBookBtn = document.getElementById("add-book-btn");
const form = document.querySelector("form");
const formInputsEl = document.querySelectorAll(".form-elements");
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
/*======================================================*/

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = Array.from(formInputsEl).reduce((acc, element) => {
    let value;

    if (element.type === "file") {
      const file = element.files[0];
      //creates a temporary URL for it so it can be displayed
      value = file ? URL.createObjectURL(file) : "";
    } else {
      value = element.value.trim();
    }
    acc[element.id] = value;
    return acc;
  }, {});
  clearInputFields();

  addBookToLibrary(
    data.title,
    data.author,
    data.pages,
    data["book-cover"],
    data["read-status"]
  );

  modal.classList.remove("active");
});

function Book(title, author, pages, cover, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.cover = cover;
  this.read = read;
}

function addBookToLibrary(title, author, pages, cover, read) {
  const book = new Book(title, author, pages, cover, read);
  myLibrary.push(book);
  insertIntoDom(myLibrary);
}

function insertIntoDom(library) {
  bookShelf.textContent = "";
  library.forEach((book) => {
    const { title, author, pages, cover, read } = book;

    const bookRowHTML = `
      <tr>
          <td>${title}</td>
          <td>${author}</td>
          <td>${pages}</td>
          <td><img src="${cover}" alt="Cover image"></td>
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

function clearInputFields() {
  inputs.forEach((input) => {
    input.value = "";
  });
}

//Function checks if there are no books,

function isLibraryEmpty() {
  if (myLibrary.length !== 0) return;

  const html = `
   <tr>
    <td colspan="5">
        <div class="empty-alert">
            <h2>📚 Your library is empty 📚</h2>
            <p>Start adding books to build your collection!</p>
        </div>
    </td>
  </tr>
  `;

  bookShelf.insertAdjacentHTML("beforeend", html);
}
isLibraryEmpty();
