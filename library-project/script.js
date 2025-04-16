"use strict";

const bookShelf = document.querySelector("tbody");
const modal = document.querySelector(".modal");
const inputs = document.querySelectorAll("input");
const addBookBtn = document.getElementById("add-book-btn");
const form = document.querySelector("form");
const formInputsEl = document.querySelectorAll(".form-elements");

let myLibrary = [];
/*======================================================*/
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

//? Add functionality for retrieving and deplaying form data
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = Array.from(formInputsEl).reduce((acc, element) => {
    let value;

    if (element.type === "file") {
      const file = element.files[0];
      //creates a temporary URL for it so it can be displayed
      value = file ? URL.createObjectURL(file) : "";
    } else if (element.type === "select-one") {
      value = element.value.trim() === "read" ? true : false;
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

  console.log(myLibrary);

  modal.classList.remove("active");
});

/*======================================================*/
//? Add functionality for changing read state and deleting row

bookShelf.addEventListener("click", (e) => {
  const statusBtn = e.target.closest(".toggle-read-btn");
  const deleteBtn = e.target.closest("#delete");
  if (!statusBtn && !deleteBtn) return;

  //? target row based on its data-id and change its state
  if (e.target === statusBtn) {
    const bookObject = GetRelavantBook(rowID);
    bookObject.read = !bookObject.read;

    statusBtn.textContent = `${bookObject.read ? "Read" : " Not read"}`;
    statusBtn.classList.toggle("read");
  }

  //? Remove book from DOM and library object
  if (e.target === deleteBtn) {
    const bookObject = GetRelavantBook(deleteBtn);
    const bookRow = deleteBtn.closest("tr");
    const updatedLibrary = myLibrary.filter(
      (book) => book.id !== bookObject.id
    );

    myLibrary = updatedLibrary;
    bookRow.remove();
  }
});
/*======================================================*/

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

// Function that retrieves and displays data from myLibrary
function insertIntoDom(library) {
  bookShelf.textContent = "";
  library.forEach((book) => {
    const { id, title, author, pages, cover, read } = book;
    const bookRowHTML = `
      <tr data-id="${id}">
          <td>${title}</td>
          <td>${author}</td>
          <td>${pages}</td>
          <td><img src="${cover}" alt="Cover image"></td>
          <td>
            <button class="toggle-read-btn ${read ? "read" : ""}">
            ${read ? "Read" : "Not read"}
            </button>
          </td>
          <td>
            <button id="delete">
              <i class="fas fa-delete-left"></i>
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

function GetRelavantBook(statusBtn) {
  const row = statusBtn.closest("tr");
  const rowID = row.dataset.id;
  return myLibrary.filter((book) => book.id === rowID)[0];
}

//! 1. Implement read button state change ✅
//! 2. Implement form validation ✅
//! 3. Implement book deletion feature
