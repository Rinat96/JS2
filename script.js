const API_URL =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";



const app = new Vue({
  el: "#app",
  data: {
    goods: [],
    filteredGoods: [],
    searchLine: '',
    inVisibleCart: false,
  },

  methods: {
    async getProducts() {
      const responce = await fetch(`${API_URL}/catalogData.json`);
      if (responce.ok) {
        const catalogItems = await responce.json();
        this.goods = catalogItems;
        this.filteredGoods = catalogItems;
      } else {
        alert("Ошибка при соединении с сервером");
      }
    },
    filterGoods(){
      const regExpItem = new RegExp(`${this.searchLine}`,"i"); 
      this.filteredGoods = this.goods.filter((elem) => (regExpItem.test(elem.product_name)));     
      console.log(this.filteredGoods);
    }
  },

  async mounted() {
    await this.getProducts()
  }
});


