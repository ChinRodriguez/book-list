class Book {
  constructor(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book){
    const list =document.querySelector('#book-list')
    // Create tr element
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">X<a></td>
    `;
    list.appendChild(row);
  }

  showAlert(message,className){
    // createDiv
    const div = document.createElement('div');
    // Add the class name
    div.className = `alert ${className}`
    div.appendChild(document.createTextNode(message))
    // Get Parent
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    // Insert Alert
    container.insertBefore(div,form);
    // Timeout after 3seconds
    setTimeout(function() {
      document.querySelector('.alert').remove();
    },3000);
  }

  deleteBook(target){
    if(target.className === 'delete'){
      target.parentElement.parentElement.remove();
    }
  }

  clearFields(){
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }
}

// Event Listeners
document.querySelector('#book-form').addEventListener('submit', function(e){
  const title = document.querySelector('#title').value,
        author = document.querySelector('#author').value,
        isbn = document.querySelector('#isbn').value

  // Instantiating a Book
  const book = new Book(title, author, isbn);

  // Instantiating UI
  const ui = new UI();

  // Validation
  if ( title === '' || author === '' || isbn === '') {
    ui.showAlert('Please Fill in all Fields','error');
  }
  else {
      // Add Book to List
      ui.addBookToList(book);

      // Clear Fields
      ui.clearFields();
  }
  e.preventDefault();
})

// Event Listeners for delete 
document.querySelector('#book-list').addEventListener('click', function(e){
  const ui = new UI();
  ui.deleteBook(e.target);

  // show alert
  ui.showAlert('Book Removed','success')
  e.preventDefault();
})