new Vue({
    el: '#app',
    data: {
      bookNameInput:"",
      priceInput:"",
      bookCollection: [],
      isInputMiss: false
    },
    
    methods:{
      addBook: function() {
        this.isInputMiss = false;
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
          this.isInputMiss = true;
        }
      }
    }
  })