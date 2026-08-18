
class Book{
    constructor(title,author,pages,read){
    this.id=crypto.randomUUID();
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.read=read;
    }
}
const myLibrary = [
    new Book("The Hobbit", "J.R.R. Tolkien", 310, true),
    new Book("1984", "George Orwell", 328, true),
    new Book("Dune", "Frank Herbert", 412, false),
    new Book("Crime and Punishment", "Fyodor Dostoevsky", 671, true),
    new Book("The Alchemist", "Paulo Coelho", 208, false),
    new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, true),
    new Book("The Catcher in the Rye", "J.D. Salinger", 277, false),
    new Book("The Name of the Wind", "Patrick Rothfuss", 662, false)
];

const bookEntry=document.querySelector(".bookEntry");
const bookForm=document.querySelector(".bookForm");
const closeForm=document.querySelector(".closeForm");

const titleInput = document.querySelector(".title");
const authorInput = document.querySelector(".author");
const pagesInput = document.querySelector(".pages");
const readInput=document.getElementById("read");


const bookGrid=document.querySelector(".bookGrid");
const addBookButton=document.querySelector(".addBook");
bookForm.addEventListener("submit",(event) => {
    event.preventDefault();

    const title=titleInput.value;
    const author=authorInput.value;
    const pages=pagesInput.value;
    const read=readInput.checked;
    addBookToLibrary(title,author,pages,read);


    bookForm.reset();
    bookEntry.style.display="none";
})

addBookButton.addEventListener("click",()=>{

    bookEntry.style.display="block";
})

document.addEventListener("click",(event)=>{
   if (
        !bookEntry.contains(event.target) &&
        event.target !== addBookButton
    ) {
        bookEntry.style.display = "none";
    }
})
function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);

    myLibrary.push(book);

    renderCard(myLibrary);

}


function renderCard(books){
    bookGrid.innerHTML="";


    books.forEach(book => {
        
    const card = document.createElement("div");
    card.classList.add("book-card");

    card.dataset.id = book.id;

    const titleElement = document.createElement("h3");
    titleElement.textContent = book.title;

    const authorElement = document.createElement("p");
    authorElement.textContent = `Author: ${book.author}`;

    const pagesElement = document.createElement("p");
    pagesElement.textContent = `Pages: ${book.pages}`;

    const readElement = document.createElement("button");
    readElement.textContent = book.read ? "Read" : "Not read";

    readElement.addEventListener("click", () => {
    book.read = !book.read;
    readElement.textContent = book.read ? "Read" : "Not read";
});


    const removeElement= document.createElement("button");
    removeElement.textContent="remove";
    
    removeElement.addEventListener("click", (event) => {
    const card = event.target.closest(".book-card"); //closest parent to target with class ".book-card"
    const id = card.dataset.id;

    const index = myLibrary.findIndex(book => book.id === id);

    myLibrary.splice(index, 1);
    renderCard(myLibrary);
});

 
    card.appendChild(titleElement);
    card.appendChild(authorElement);
    card.appendChild(pagesElement);
    card.appendChild(readElement);
    card.appendChild(removeElement);

    bookGrid.appendChild(card);
    });
}

