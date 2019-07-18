let counter = 0;

new Vue({
    el: '#app',
    data: {
      bookNameInput: "",
      priceInput: "",
      bookCollection: [],
      isInputMissing: false,
      selectedBookId: null
    },
    
    computed: {
      selectedBook: function(){
        
        return this._getBookFromDataModelById(this.selectedBookId);      
      },

      visibleBooksArray: function(){
        return this.bookCollection;
      }
    },

    methods:{
      _addBookToDataModel({name,price}){
        const book = {
          name: name,
          price: price,
          id: counter
        }
        counter++;
        this.bookCollection.push(book);
        //this.bookCollection[book.id] = book;
        //this.$set(this.bookCollection,book.id,book)
      },

      _getBookFromDataModelById(id){
        const selectedBook = this.bookCollection.filter((book)=>(book.id==this.selectedBookId));
        if(selectedBook.length==0){
          return;
        }
        return selectedBook[0];
      },

      _deleteBookFromDataModelById(id){
        this.bookCollection = this.bookCollection.filter(  (book)=>(book.id !== id   ))
      },

      _clearInputs(){
        this.bookNameInput = "";
        this.priceInput = "";
        this.isInputMissing = false;
      },
      addBook: function() {
        //validation


        //1. validation
        if(!this.bookNameInput || !this.priceInput) {
          this.isInputMissing = true;
          return;
        }

        //2. add to data model
        this._addBookToDataModel({name: this.bookNameInput, price: this.priceInput});


        //3. clear inputs
        this._clearInputs();
  

        //this.bookCollection[book.id] = book;
        
      },
      removeBook: function(bookId) {
        this._deleteBookFromDataModelById(bookId);
      },

      selectBook: function(bookId){
        this.selectedBookId = bookId
      },

      getBookStyleById: function(id) {
        return this.selectedBookId == id ? "book selected-book" : "book";
      }
    }
  })