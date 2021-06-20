const API_URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

Vue.component('goods-list', {
  props: ['goods'],
  template: `
      <div class="goods-list">
        <p v-if="goods.length == 0">Нет данных!</p>
        <goods-item v-for="goodEntity in goods" :goodProp="goodEntity"></goods-item>
      </div>
    `
})

Vue.component('goods-item', {
  props: ['goodProp'],
  methods: {
    addBasket: function (event) {
      this.$root.addToBasket(event);
    }
  },
  template: `
      <div class="goods-item">
        <h3>{{goodProp.product_name}}</h3>
        <p>{{goodProp.price}}</p>
        <button class="goods-item__add-basket" 
        v-bind:data-id="goodProp.id_product"
        v-on:click="addBasket"
        >В корзину</button>
      </div>
    `
})

// Вынес поиск в отдельный компонент
Vue.component('search', {
  data() {
    return {
      searchLine: '',
    }
  },
  methods: {
    filtered: function (searchLine) {
      this.$root.filterGoods(searchLine);
    }
  },
  template:
    `<div>
      <input type="text" class="goods-search" v-model="searchLine">
      <button class="search-button" type="button" v-on:click="filtered(searchLine)">Искать</button>
    </div>`,
});

// Вынес корзину в отдельный компонент
Vue.component('basket-list', {
  props: ['basket'],
  data() {
    return {
      isVisibleCart: false,
    }
  },
  methods: {
    deleteItem: function (event) {
      this.$root.deleteItem(event);
    },
    showBasket: function () {
      if (this.isVisibleCart == false) {
        this.isVisibleCart = true;
      } else {
        this.isVisibleCart = false;
      }
    },
  },
  template: `
    <div>
      <button class="basket-button" type="button" v-on:click="showBasket">Корзина</button>
      
      <div class="basket-section" v-if="isVisibleCart">
        <div class="basket-list">  
          <h3 v-if="basket.length == 0">Корзина пуста</h3>
          <div class="basket-item" v-for="basketItem in basket">
            <h3 class="basket-item__title">{{basketItem.title}}</h3>
            <p class="basket-item__price">{{basketItem.price * basketItem.count}} руб.</p>
            <p class="basket-item__count">{{basketItem.count}} шт.</p>
            <div class="basket-item__delete" 
                        v-bind:item-id="basketItem.id"
                        v-on:click="deleteItem"
                    >Удалить</div>
          </div>
        </div>
      </div>
    </div>  

  `,
});


const app = new Vue({
  el: "#app",
  data: {
    goods: [],
    filteredGoods: [],
    inVisibleCart: false,
    basket: [],
    count: 1,
  },

  methods: {
    async getProducts() {
      const responce = await fetch(`${API_URL}/catalogData.json`);
      if (responce.ok) {
        const catalogItems = await responce.json();
        this.goods = catalogItems;
        this.filteredGoods = catalogItems;
      } else {
        alert('Ошибка при соединении с сервером');
      }
    },
    filterGoods(searchLine) {
      const regExpItem = new RegExp(searchLine, "i");
      this.filteredGoods = this.goods.filter((elem) => (regExpItem.test(elem.product_name)));
      console.log(this.filteredGoods);
    },

    deleteItem: function(event) {
      const itemId = event.target.getAttribute('item-id');
      for (let i = 0; i < this.basket.length; i++) {
          if (this.basket[i].id == itemId) {
              if (this.basket[i].count > 1) {
                  this.basket[i].count -= 1;
              } else {
                  this.basket.splice(i, 1);
              }
          } 
      }
  },
  
  addToBasket: function(event) {
    const dataId = event.target.getAttribute('data-id');
    let product = this.goods.find(item => item.id_product == dataId);
    const obj = { id: product.id_product, title: product.product_name, price: product.price, count: this.count, }
    if (this.basket.find(item => item.id == dataId )){
        for (let i = 0; i < this.basket.length; i++) {
            if (this.basket[i].id == dataId) {
                this.basket[i].count += 1;
                console.log(this.basket[i].price);
            } 
        }
    } else {
        this.basket.push(obj);
    }
    console.log(this.basket);
},  

  },

  async mounted() {
    await this.getProducts()
  }
});


