new Vue({
    el: '#app',
    data: {
      bookNameInput: "",
      priceInput: "",
      bookCollection: [],
      isInputMissing: false,
      bookSelected: {
        name: "",
        price: ""
      }
    },
    
    methods:{
      addBook: function() {
        this.isInputMissing = false;
        if(this.bookNameInput && this.priceInput) {
          const book = {
            name: this.bookNameInput,
            price: this.priceInput
          }
          this.bookCollection.push(book);
          this.bookNameInput = "";
          this.priceInput = "";
        }
        else {
          this.isInputMissing = true;
        }
      },
      removeBook: function(bookIndex) {
        if(this.bookCollection[bookIndex] === this.bookSelected) {
          this.bookSelected.name = "";
          this.bookSelected.price = "";
        }
        this.bookCollection.splice(bookIndex, 1);
      }
    },
  computed: {
  }
  })