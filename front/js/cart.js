function askApi() {
  fetch("http://localhost:3000/api/products")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })

  let article = document.createElement("article");
  article.classList.add("cart__item");
  /*article.data-id = {product-ID};
  article.data-color = {product-color};*/

  let cart__item__img = document.createElement("div");
  cart__item__img.classList.add("cart__item__img");

  let img = document.createElement("img");
  /*img.src = items[i].imageUrl;
  img.alt = items[i].altTxt;*/


  let cart__item__content = document.createElement("div");
  cart__item__content.classList.add("cart__item__content");

  let cart__item__content__description = document.createElement("div");
  cart__item__content__description.classList.add("cart__item__content__description");

  let h2 = document.createElement("h2");
  /*h2=nom du produit*/

  let p1 = document.createElement("p");
  /*p1=couleur du prosuit*/

  let p2 = document.createElement("p");
  /*p2= prix du produit*/


  let cart__item__content__settings = document.createElement("div");
  cart__item__content__settings.classList.add("cart__item__content__settings");

  let cart__item__content__settings__quantity = document.createElement("div");
  cart__item__content__settings__quantity.classList.add("cart__item__content__settings__quantity");

  let p3 = document.createElement("p");
  /*p3= qtt*/

  let input = document.createElement("input");
  input.classList.add("itemQuantity")
  //input.name("itemQuantity")//
  input.min = 1
  input.max = 100
  /*input.type= type
    value= value*/


  let cart__item__content__settings__delete = document.createElement("div");
  cart__item__content__settings__delete.classList.add("cart__item__content__settings__delete");

  let deleteItem = document.createElement("p");
  deleteItem.classList.add("deleteItem")

  


  document
    .getElementById("cart__items")
    .appendChild(article)
    .appendChild(cart__item__img)
    .appendChild(img);
    cart__item__img.insertAdjacentElement('afterend', cart__item__content)
    cart__item__content.insertAdjacentElement('afterend', cart__item__content__settings)


  document
    .getElementsByClassName("cart__item__content")[0]
    .appendChild(cart__item__content__description)
    .appendChild(h2)
    h2.insertAdjacentElement('afterend', p1)
    h2.insertAdjacentElement('afterend', p2);

  document
    .getElementsByClassName("cart__item__content__settings")[0]
    .appendChild(cart__item__content__settings__quantity)
    .appendChild(p3)
    p3.insertAdjacentElement('afterend', input)
    cart__item__content__settings__quantity.insertAdjacentElement('afterend', cart__item__content__settings__delete)

  document
    .getElementsByClassName("cart__item__content__settings__delete")[0]
    .appendChild(deleteItem)

}

askApi ();
