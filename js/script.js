//Get the UI elements;
let form= document.querySelector('#book-form');



//Book class
class Book{
    constructor(title,author,isbn){
        this.title= title;
        this.author= author;
        this.isbn= isbn;

    }
}

// UI Class
class UI{
    constructor(){

    }
    addToBookList(book){
        let list= document.querySelector("#book-list");
        let row= document.createElement('tr');

        row.innerHTML= `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td> <a href="#" class="delete">X</a></td>`   //buit in class="delete"

        list.appendChild(row);
        
    }
    //define the function field clear
    clearFormFields(){

        // value equal to empty
        document.querySelector("#title").value= '';
        document.querySelector("#author").value= '';
        document.querySelector("#isbn").value= '';

    }
}

//add event Listener
form.addEventListener('submit',newBook);


//Define Function

function newBook(e){
    let title= document.querySelector("#title").value,
     author= document.querySelector("#author").value,
     isbn= document.querySelector("#isbn").value;

    //check form is empty or not
     if(title === '' || author === '' || isbn === ''){
         alert("All Fields!")
        }
        else{
             // create Book Class's Object
    let book= new Book(title,author,isbn);

    //create UI class's Object
    let ui= new UI();
    ui.addToBookList(book);

    //after filling form field ll be clear by calling this function
    ui.clearFormFields();
            
        }

   

    
    
 

    //remove loaded prevent
    e.preventDefault();
}