let counter = 0;
Vue.component()
var vm = new Vue({
  el: '#app',
  data: {
    bookNameInput: "",
    priceInput: "",
    bookCollection: {},
    isInputMissing: false,
    selectedBookId: null
  },

  computed: {
    selectedBook: function () {
      return this._getBookFromDataModelById(this.selectedBookId);
    },

    visibleBooksArray: function () {
      return Object.values(this.bookCollection);
    }
  },

  methods: {
    _addBookToDataModel({ name, price }) {
      const book = {
        name: name,
        price: price,
        id: counter
      }
      counter++;
      vm.$set(vm.bookCollection, book.id, book)
    },

    _getBookFromDataModelById(id) {
      return this.bookCollection[id];
    },

    _deleteBookFromDataModelById(id) {
      vm.$delete(vm.bookCollection, id);
    },

    _clearInputs() {
      this.bookNameInput = "";
      this.priceInput = "";
      this.isInputMissing = false;
    },

    addBook: function () {

      //1. validation
      if (!this.bookNameInput || !this.priceInput) {
        this.isInputMissing = true;
        return;
      }

      //2. add to data model
      this._addBookToDataModel({ name: this.bookNameInput, price: this.priceInput });

      //3. clear inputs
      this._clearInputs();

    },

    removeBook: function (bookId) {
      this._deleteBookFromDataModelById(bookId);
    },

    selectBook: function (bookId) {
      this.selectedBookId = bookId
    },

    getBookStyleById: function (bookId) {
      return this.selectedBookId == bookId ? "book selected-book" : "book";
    }
  }
})