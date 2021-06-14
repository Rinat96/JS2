const API_URL =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

class BasketItem {
  constructor(title, price, id) {
    this.title = title;
    this.price = price;
    this.id = id;
    this.count = 1;
  }
  render() {
    return `<div id="${this.id}" class="goods-item" data-title="${this.title}" data-price="${this.price}">
    <h3>${this.title}</h3>
    <p>${this.price * this.count}</p>
    <p>${this.count} шт.</p>
    <button class="delItem" type="button">Удалить из Корзины</button></div>`;
  }
}

class BasketList {
  constructor() {
    this.basketList = {};
  }

  fetchBasket(id, product) {
    if ( this.basketList[id] ) {
        this.basketList[id].count++;
    } else {
        this.basketList[id] = product;
    }

    this.render();
    this.showBasketList();
}

  showBasketList(){
    console.log(this.basketList);
  }

  remove(id) {
    if ( this.basketList[id].count == 1 ) {
        delete this.basketList[id];
    } else {
        this.basketList[id].count--;
    }

    this.render();
  }

  render() {
    let cart = '';

    for (let id in this.basketList) {
        cart += this.basketList[id].render();
    }
    
    document.querySelector('.basket-list').innerHTML = cart;
    this.setDel();
  }

  setDel() {
    document.querySelectorAll('.delItem').forEach((button) => {
        button.addEventListener('click', (event) => {
            let product = event.target.closest('div');
            let productId = product.id;
            this.remove(productId);
        })
    });
}

setAdd() {
  document.querySelectorAll('.addItem').forEach((button) => {
      button.addEventListener('click', (event) => {
          let product = event.target.closest('div');
          let productId = product.id;
          let productTitle = product.dataset.title;
          let productPrice = product.dataset.price;
          // console.log(product);
          let basketItem = new BasketItem(productTitle, productPrice, productId);

          this.fetchBasket(productId, basketItem);
      })
  });
}

}  


class GoodsItem {
  constructor(title, price, id) {
    this.title = title;
    this.price = price;
    this.id = id;
  }
  render() {
    return `<div id="${this.id}" class="goods-item" data-title="${this.title}" data-price="${this.price}">
    <h3>${this.title}</h3>
    <p>${this.price}</p>
    <button class="addItem" type="button">Добавить в Корзину</button></div>`;
  }
}

class GoodsList {
  constructor() {
    this.goods = [];
  }

  async fetchGoods() {
    const responce = await fetch(`${API_URL}/catalogData.json`);
    if (responce.ok) {
      const catalogItems = await responce.json();
      this.goods = catalogItems;
    } else {
      alert("Ошибка при соединении с сервером");
    }
  }

  render() {
    let listHtml = "";
    this.goods.forEach((good) => {
      const goodItem = new GoodsItem(
        good.product_name,
        good.price,
        good.id_product
      );
      listHtml += goodItem.render();
    });
    document.querySelector(".goods-list").innerHTML = listHtml;
  }
}

const init = async () => {
  const list = new GoodsList();
  await list.fetchGoods();
  list.render();
  let basketList = new BasketList();
  basketList.setAdd();
};

window.onload = init;


