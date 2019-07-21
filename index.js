

///////// book component /////////

Vue.component('book', {
  props: ['book'],
  template: `
    <div @click="$emit('select-book', book.id);" >
      <p>The book name is: {{book.name}} and the price is: {{book.price}} 
          <button 
              @click.stop="$emit('remove-book', book.id)"
              class="book-button right-position">Delete Book</button>
      </p>
    </div>
  `
})

///////// end book component /////////



///////// Vue instance  /////////

var vm = new Vue({
  el: '#app',
  data: {
    bookNameInput: "",
    priceInput: "",
    bookCollection: {},
    isInputMissing: false,
    selectedBookId: null,
    filterInput: "",
    picked: "",
    counter: 0
  },

  computed: {
    selectedBook: function () {
      return this._getBookFromDataModelById(this.selectedBookId);
    },

    visibleBooksArray: function () {
      const bookCollection = Object.values(this.bookCollection); // Get an array from the data

      if (!this.filterInput && !this.picked)
        return bookCollection;
      else if (this.filterInput && !this.picked)
        return bookCollection.filter(book => book.name.includes(this.filterInput));
      else if (!this.filterInput && this.picked)
        return bookCollection.sort(this.propComparator(this.picked));
      else
        return bookCollection.filter(book => book.name.includes(this.filterInput)).sort(this.propComparator(this.picked))

    }
  },

  methods: {
    _addBookToDataModel({ name, price }) {
      const book = {
        name: name,
        price: price,
        id: this.counter
      }
      this.counter++;
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
    },

    propComparator: function (propName) {
      if (propName == 'price')
        return (a, b) => a.price - b.price;
      return (a, b) => a[propName] == b[propName] ? 0 : a[propName] < b[propName] ? -1 : 1;
    }
  }
})