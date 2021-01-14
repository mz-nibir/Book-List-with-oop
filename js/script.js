//Get the UI elements;
let form = document.querySelector('#book-form');
let booklist = document.querySelector("#book-list");



//Book class
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;

    }
}

// UI Class
class UI {
    constructor() {

    }
    addToBookList(book) {
        let list = document.querySelector("#book-list");
        let row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td> <a href="#" class="delete">X</a></td>`   //buit in class="delete"

        list.appendChild(row);

    }
    //define the function field clear
    clearFormFields() {

        // value equal to empty
        document.querySelector("#title").value = '';
        document.querySelector("#author").value = '';
        document.querySelector("#isbn").value = '';

    }
    showAlert(massage, className) {
        let div = document.createElement('div');
        div.className = `alert ${className}`;  //className = "alert error" -> this is built in class of scleton

        div.appendChild(document.createTextNode(massage)); // <div className="alert error"> Please Fill all the fields </div> 

        let container = document.querySelector(".container");
        let form = document.querySelector("#book-form");

        container.insertBefore(div, form); // container er moddhe div k insert korbo but form er age.

        // after 3second the alert msg will be hide
        setTimeout(() => {
            document.querySelector('.alert').remove(); // we call call either .alert or .error class  bcz 2 class are same

        }, 3000);
    }

    deleteFromBook(target) {

        if (target.hasAttribute('href')) {
            target.parentElement.parentElement.remove();
           
        }

    }
}

//add event Listener
form.addEventListener('submit', newBook);
booklist.addEventListener('click', removeBook);


//Define Function

function newBook(e) {
    let title = document.querySelector("#title").value,
        author = document.querySelector("#author").value,
        isbn = document.querySelector("#isbn").value;

    //create UI class's Object
    let ui = new UI();

    //check form is empty or not
    if (title === '' || author === '' || isbn === '') {

        ui.showAlert("Please Fill all the fields", "error");

    }
    else {
        // create Book Class's Object
        let book = new Book(title, author, isbn);


        ui.addToBookList(book);

        //after filling form field ll be clear by calling this function
        ui.clearFormFields();

        ui.showAlert("Book Added!", "success");

    }

    //remove loaded prevent
    e.preventDefault();
}

//define removeBook function
function removeBook(e) {

    let ui = new UI();
    ui.deleteFromBook(e.target);


    ui.showAlert("Book Remove!", "success");


    e.preventDefault();
}