const searchInput = document.querySelector(".title-input");
const booksList = document.querySelector(".books-list");
const searchButton = document.querySelector("#search-btn");

const searchBooks = async (searchTerm) => {
  if (!searchTerm) {
    alert("Please enter a book title");
    return;
  }

  const url = `https://student-api-proxy.onrender.com/api/open-library2.p.rapidapi.com/search_title/${searchTerm}`;

  const options = {
    method: "GET",
    headers: {
      "X-API-Key":
        "7c5e2ffb5a92a06aeafdce17c661d80352060cbc89441ab74e82150516b2d72c",
    },
  };

  booksList.innerHTML = "Loading...";

  const response = await fetch(url, options);
  const result = await response.json();
  const books = result.data.books;

  booksList.innerHTML = "";
  books.forEach((book) => {
    const listItem = `
       <li>
  <strong>${book.title}
  ${book.author}</strong>
      </li>
    `;
    booksList.insertAdjacentHTML("beforeend", listItem);
  });
};

searchInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    const searchTerm = searchInput.value.trim();
    searchBooks(searchTerm);
  }
});

searchButton.addEventListener("click", () => {
  const searchTerm = searchInput.value.trim();
  searchBooks(searchTerm);
});

// fetch(url, options)
//   .then((response) =>
//     response.json().then((result) => {
//       console.log(result.data); // Your API data
//       console.log(`Cost: $${result.meta.cost}`);
//       console.log(`Remaining: $${result.meta.remaining_budget}`);
//     }),
//   )
//   .catch((error) => {
//     console.log(error);
//   });
