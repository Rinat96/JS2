class GoodsItem {
    constructor(pic, title, price) {
      this.pic = pic;
      this.title = title;
      this.price = price;
    }
    render() {
      return `<div class="goods-item"><img src="${this.pic}" alt="photo"><h3>${this.title}</h3><p>${this.price}</p></div>`;
    }
  }

 
  
  class GoodsList {
    constructor() {
      this.goods = [];
    }
  
    fetchGoods() {
      this.goods = [
        {pic: "img/shirt.jpeg",  title: 'Shirt', price: 150 },
        {pic: "img/socks.jpg", title: 'Socks', price: 50 },
        {pic: "img/jacket.jpg", title: 'Jacket', price: 350 },
        {pic: "img/shoes.jpg", title: 'Shoes', price: 250 },
        {pic: "img/shirt.jpeg",  title: 'Shirt', price: 150 },
        {pic: "img/socks.jpg", title: 'Socks', price: 50 },
      ];
    }
  
    render() {
      let listHtml = "";
      this.goods.forEach((good) => {
        const goodItem = new GoodsItem(good.pic, good.title, good.price);
        listHtml += goodItem.render();
      });
          document.querySelector(".goods-list").innerHTML = listHtml;
    }

    cost() {
        let cost = 0;
        this.goods.forEach((good) => {
          cost += good.price;
        });
        document.querySelector(".cost").innerHTML = `<h2>Общая стоимость товаров - ${cost}</h2>`;
      }
  }

// классы для корзины:

  class BasketItem {
    constructor(pic, title, price) {
      this.pic = pic;
      this.title = title;
      this.price = price;
    }
    render() {
      return `<div class="goods-item"><img src="${this.pic}" alt="photo"><h3>${this.title}</h3><p>${this.price}</p></div>`;
    }
  }  
  
  class BasketList {
    constructor() {
      this.goods = [];
    }
  
    cost() {
      let cost = 0;
      this.goods.forEach((good) => {
        cost += good.price;
      });
    }
  
    render() {
      let listHtml = "";
      this.goods.forEach((good) => {
        const goodItem = new Baskettem(good.pic, good.title, good.price);
        listHtml += goodItem.render();
        cost += good.price;
      });
      document.querySelector(".goods-list").innerHTML = listHtml;
    }
  }
  
  const init = () => {
      const list = new GoodsList();
      list.fetchGoods();
      list.render();
      list.cost();
  };
  
  window.onload = init;
  