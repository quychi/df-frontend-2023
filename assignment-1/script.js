// Your JS code goes here
const dummyData = [
    { id: 0, name: "Refactoring", author: 'Martin Fowler', topic: "Programming" }, 
    { id: 1, name: "Designing Data-Intensive Applications", author: 'Martin Kleppmann', topic: "Database" }, 
    { id: 2, name: "The Phoenix Project", author: 'Gene Kim', topic: "DevOps" }, 
];
let booksData;
let currentSearch = ''
let selectedBookId;

init()

window.addEventListener('beforeunload', function (event) {
    localStorage.setItem("booksData", JSON.stringify(booksData));
});

function init () {
    const savedBooksData = localStorage.getItem("booksData");
    if (savedBooksData) {
        booksData =  JSON.parse(savedBooksData);
    } else {
        booksData = dummyData
    }

    generateBookTable(booksData);

    const input = document.getElementById("search-input");
    input.addEventListener("input", function() {
        currentSearch = input.value;
        updateTableOnSearch()
    });
}

function updateTableOnSearch() {
    const filteredBooks = booksData.filter((data) => {
        return data.name.toLowerCase().includes(currentSearch.toLowerCase());
    })
    generateBookTable(filteredBooks);
}

function generateBookTable (books) {
    let html = `<table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Author</th>
                            <th>Topic</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                `;
    for (let i = 0; i < books.length; i++) {
        html += "<tr>";
        html += "<td>" + books[i].name + "</td>";
        html += "<td>" + books[i].author + "</td>";
        html += "<td>" + books[i].topic + "</td>";
        html += "<td><button class='button-link' type='button' onclick='handleDeleteBook(\"" + books[i].id + "\")'>Delete</button></td>"
        html += "</tr>";
    }
    html += "</tbody></table>";
    const tableDiv = document.getElementById("book-table");
    if (tableDiv) {
        tableDiv.innerHTML = html;
    }
}

const getCreateBookModalElements = () => {
    const nameInputEle = document.getElementById('name');
    const authorInputEle = document.getElementById('author');
    const topicSelectEle = document.getElementById('topic');
    return { nameInputEle, authorInputEle, topicSelectEle };
}

const handleResetCreateBookModal = () => {
    const { nameInputEle, authorInputEle } = getCreateBookModalElements();
    nameInputEle.value = '';
    authorInputEle.value = '';
}

const handleDeleteBook = (bookId) => {
    selectedBookId = parseInt(bookId);
    handleOpenModal('deleteBookModal');
    const selectedBookNameEle = document.getElementById('selectedBookName');
    if (selectedBookNameEle){
        selectedBookNameEle.innerHTML = getSelectedBookName();
    }
}

const onDelete = () => {
    const newBooks = booksData.filter(item => item.id !== selectedBookId)
    booksData = newBooks;
    // localStorage.setItem("booksData", JSON.stringify(booksData));
    generateBookTable(booksData);
    handleCLoseModal('deleteBookModal')
}

const createBook = () => {
    const { nameInputEle, authorInputEle, topicSelectEle } = getCreateBookModalElements();
    if (!(nameInputEle.value || authorInputEle.value)) {
        return;
    }
    const newBook = { 
        id: parseInt(Math.random().toString(36).slice(2), 36), 
        name: nameInputEle.value, 
        author: authorInputEle.value, 
        topic: topicSelectEle.value
    }
    booksData.push(newBook)
    // localStorage.setItem("booksData", JSON.stringify(booksData));
    if (currentSearch) {
        updateTableOnSearch();
    } else {
        generateBookTable(booksData);
    }
    handleCLoseModal('createBookModal');
}

const handleOpenModal = (modalElementId) => {
    const modal = document.getElementById(modalElementId);
    modal.style.display = "block";

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            handleResetCreateBookModal();
        }
    }
}

const handleCLoseModal = (modalElementId) => {
    const modal = document.getElementById(modalElementId);
    modal.style.display = "none";

    if (modalElementId === 'createBookModal') {
        handleResetCreateBookModal();
    }
}

const getSelectedBookName = () => {
    const selectedBook = booksData.find(item => item.id === selectedBookId);
    return selectedBook.name;
}