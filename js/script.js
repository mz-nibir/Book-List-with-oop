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
   
    static addToBookList(book) {
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
    static clearFormFields() {

        // value equal to empty
        document.querySelector("#title").value = '';
        document.querySelector("#author").value = '';
        document.querySelector("#isbn").value = '';

    }
    static showAlert(massage, className) {
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

    static deleteFromBook(target) {

        if (target.hasAttribute('href')) {
            target.parentElement.parentElement.remove();

           Store.removeBook(target.parentElement.previousElementSibling.textContent.trim());     //removeBook fn calling for remove LS ,, target-> <a> </a>,   target.parentElement -> <td>..</td>,  target.parentElement.previousElementSibling -> <td>ISBN number ashbe </td>,  target.parentElement.previousElementSibling.textContent -> only ISBN ta asbe
                                

            UI.showAlert("Book Remove!", "success");
           
        }

    }
}


//Local Storage Class
class Store {
    static getbooks(){   
        let books;
        if(localStorage.getItem('books') === null){  //kono boi LS e ase ki na.

            books= []; // if na thake then blank array ashbe

        }
        else{
            books = JSON.parse(localStorage.getItem('books')); // jodi thake tahole sei book ta json parse kore niye ashbe
        }
        return books;
    }

    static addBook(book){
        let books = Store.getbooks(); //self class er functn k call korbe je kono boi ase ki na

        books.push(book); // new book k push korbo

        localStorage.setItem('books',JSON.stringify(books)); // send to LS finally
    }

    //LS e save kora book anar jonno, page reload korar por
    static displayBook(){  //ei fn ta page jokhon load hobe tokhon call hobe DOM theke (listener er moodhe)

        let books = Store.getbooks(); //jodi kono boi LS e thake ta books er vetor ashbe.

        books.forEach(book =>{
            
            UI.addToBookList(book); // built is fn ja LS te thaka book Main page e niye asbe

        });

    }

    //Remove form LS
    static removeBook(isbn){

        let books = Store.getbooks(); //LS theke sob book niye ashbe ta book er moddhe rakhbe.
        books.forEach((book,index) => {

            if(book.isbn === isbn){
                books.splice(index,1);  //remove hobe
            }
        
        });
        localStorage.setItem('books',JSON.stringify(books)); //LS update hobe(remove)


    }

}

//add event Listener
form.addEventListener('submit', newBook);
booklist.addEventListener('click', removeBook);
document.addEventListener('DOMContentLoaded',Store.displayBook());


//Define Function

function newBook(e) {
    let title = document.querySelector("#title").value,
        author = document.querySelector("#author").value,
        isbn = document.querySelector("#isbn").value;

    //create UI class's Object
 

    //check form is empty or not
    if (title === '' || author === '' || isbn === '') {

        UI.showAlert("Please Fill all the fields", "error");

    }
    else {
        // create Book Class's Object
        let book = new Book(title, author, isbn);


        UI.addToBookList(book);

        //after filling form field ll be clear by calling this function
        UI.clearFormFields();

        UI.showAlert("Book Added!", "success");

        Store.addBook(book); // send to LS ( calling Fn)

    }

    //remove loaded prevent
    e.preventDefault();
}

//define removeBook function
function removeBook(e) {

    
    UI.deleteFromBook(e.target);

   
       
    
   e.preventDefault();
}