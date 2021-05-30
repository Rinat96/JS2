const goods = [
  {pic: "img/shirt.jpeg",  title: 'Shirt', price: 150 },
  {pic: "img/socks.jpg", title: 'Socks', price: 50 },
  {pic: "img/jacket.jpg", title: 'Jacket', price: 350 },
  {pic: "img/shoes.jpg", title: 'Shoes', price: 250 },
  {pic: "img/shirt.jpeg",  title: 'Shirt', price: 150 },
  {pic: "img/socks.jpg", title: 'Socks', price: 50 },
  {pic: "img/jacket.jpg", title: 'Jacket'},
  {title: 'Shoes', price: 250 },
]

const renderGoodsItem = (pic="img/none.jpg", title="Не найден", price="Не установлена") => {
  return `<div class="goods-item"><img src="${pic}" alt="photo"><h3>${title}</h3><p>${price}</p></div>`
}

const renderGoodsList = list => {
  let goodsList = list.map(item => renderGoodsItem(item.pic, item.title, item.price)).join('');

  //   const goodsListDiv = document.querySelector('.goods-list')
  //   goodsListDiv.innerHTML = goodsList

  document.querySelector('.goods-list').innerHTML = goodsList

}

const init = () => {
  renderGoodsList(goods)
}

window.onload = init
