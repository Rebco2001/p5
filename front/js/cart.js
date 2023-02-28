let paniers = localStorage.getItem("panier");
let panier = JSON.parse(paniers)
let totalQuantite = 0;
let totalPrice = 0;

for (var i = 0; i <= panier.length-1; i++) {
  let id = panier[i].id
  let color = panier[i].couleur
  let quantite = panier[i].quantite

  fetch("http://localhost:3000/api/products/"+id)
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })


  .then(function(item){
    let article = document.createElement("article");
    article.classList.add("cart__item");
    article.dataset.id = id
    article.dataset.color = color

    let cart__item__img = document.createElement("div");
    cart__item__img.classList.add("cart__item__img");

    let img = document.createElement("img");
    img.src = item.imageUrl;
    img.alt = item.altTxt;

    let cart__item__content = document.createElement("div");
    cart__item__content.classList.add("cart__item__content");

    let cart__item__content__description = document.createElement("div");
    cart__item__content__description.classList.add("cart__item__content__description");

    let cart__item__content__settings = document.createElement("div");
    cart__item__content__settings.classList.add("cart__item__content__settings");

    let cart__item__content__settings__quantity = document.createElement("div");
    cart__item__content__settings__quantity.classList.add("cart__item__content__settings__quantity");

    let cart__item__content__settings__delete = document.createElement("div");
    cart__item__content__settings__delete.classList.add("cart__item__content__settings__delete");

    let h2 = document.createElement("h2");
    h2.innerText = item.name;

    let p1 = document.createElement("p");
    p1.innerText= color;

    let p2 = document.createElement("p");
    p2.innerText= item.price + ".00 €";

    let p3 = document.createElement("p");
    p3.innerText="Qté: "

    let input = document.createElement("input");
    input.classList.add("itemQuantity")
    input.setAttribute ('name', "itemQuantity")
    input.min = 1
    input.max = 100
    input.setAttribute('type', 'number')
    input.setAttribute ('value', quantite)

    let deleteItem = document.createElement("p");
    deleteItem.classList.add("deleteItem");
    deleteItem.innerText = "Suppimer";

    cart__item__img.appendChild (img);
    article.appendChild(cart__item__img);

    cart__item__content.appendChild(cart__item__content__description);
    cart__item__content__description.appendChild(h2);
    cart__item__content__description.appendChild(p1);
    cart__item__content__description.appendChild(p2);
    article.appendChild(cart__item__content);

    cart__item__content__settings.appendChild(cart__item__content__settings__quantity);
    cart__item__content__settings__quantity.appendChild(p3);
    cart__item__content__settings__quantity.appendChild(input)
    input.addEventListener("change", function(c){
      c.preventDefault();
      c.stopPropagation();
      if (c.target.value >100 || c.target.value <1 ){
        alert('Veuillez saisir une valeur comprise entre 1 et 100'); 
      }
      else{
        quantite = c.target.value;
        input.setAttribute ('value', quantite);
      }
      const r2 = input.closest('article');
      let previousId = r2.dataset.id
      let previousColor =r2.dataset.color;

      let previousValue=JSON.parse( localStorage.getItem("panier"));
      for (var j = 0; j <= previousValue.length-1; j++) {
        if ( panier[j].id == previousId && panier[j].couleur==previousColor){
          verif = true;
          indice = j;
        }
      }

      previousValue[indice].quantite=quantite;

      if (previousValue[indice].quantite == 0){
        previousValue.splice(indice, 1);
      }

      localStorage.setItem("panier",JSON.stringify(previousValue));
      window.location.reload();
    })

    

    totalQuantite = totalQuantite + Number (quantite);
    totalPrice = totalPrice + Number (quantite) * Number (item.price)


    cart__item__content__settings.appendChild(cart__item__content__settings__delete);
    cart__item__content__settings__delete.appendChild(deleteItem);
    deleteItem.addEventListener("click", function(d){
      d.preventDefault();
      d.stopPropagation();
      const r3 = input.closest('article');
      let previousId_s = r3.dataset.id
      let previousColor_s =r3.dataset.color;

      let previousValue=JSON.parse( localStorage.getItem("panier"));
      for (var k = 0; k <= previousValue.length-1; k++) {
        if ( panier[k].id == previousId_s && panier[k].couleur==previousColor_s){
          verif = true;
          indice_s = k;
        }
      }

      previousValue.splice(indice_s, 1);
      localStorage.setItem("panier",JSON.stringify(previousValue));
      window.location.reload();    
    })
    cart__item__content.appendChild(cart__item__content__settings);

    document
    .getElementById("cart__items")
    .appendChild(article)


    document
      .getElementById("totalQuantity")
      .innerText=(totalQuantite)

    document
      .getElementById("totalPrice")
      .innerText=(totalPrice);

  })
}


document
  .getElementById("order")
  .addEventListener("click", function(){
    let mailRegex = new RegExp("[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}");
    let nameRegex = new RegExp("[a-zA-Z\-]{2,64}");
    let adresseRegex = new RegExp("[0-9a-z'àâéèêôùûçÀÂÉÈÔÙÛÇ\s-]{1,50}");
    let cityRegex = new RegExp("([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]{2,50}")

    let inputName = document.getElementById("firstName").value;
    let inputLastName = document.getElementById("lastName").value;
    let inputAdress = document.getElementById("address").value;
    let inputCity = document.getElementById("city").value;
    let inputMail = document.getElementById("email").value;

    var form  = document.getElementsByTagName('form')[0];

    form.addEventListener("submit", function (event) {
      if (!nameRegex.test(inputName)) {
        alert ("entrez un prenom valide");
        document.getElementById("firstName").addEventListener("change", function(prenom) {
          inputName = prenom.target.value;
        }); 
      }

      else if (!nameRegex.test(inputLastName)) {
        alert ("entrez un nom valide");
        document.getElementById("lastName").addEventListener("change", function(nom) {
          inputLastName = nom.target.value;
        }); 
      }

      else if (!adresseRegex.test(inputAdress)) {
        alert ("entrez une adresse valide");
        document.getElementById("address").addEventListener("change", function(adress) {
          inputAdress = adress.target.value;
        }); 
      }

      else if (!cityRegex.test(inputCity)) {
        alert ("entrez une ville valide");
        document.getElementById("city").addEventListener("change", function(city) {
          inputCity = city.target.value;
        }); 
      }

      else if (!mailRegex.test(inputMail)) {
        alert ("entrez un mail valide");
        document.getElementById("email").addEventListener("change", function(mail) {
          inputMail = mail.target.value;
        }); 
      }

      event.preventDefault();
    }, false);

    if (mailRegex.test(inputMail) && cityRegex.test(inputCity) && adresseRegex.test(inputAdress) && nameRegex.test(inputLastName) &&nameRegex.test(inputName)){
      let products =[];
      for (var i = 0; i <= panier.length-1; i++) {
        let id = panier[i].id
        products.push(id)
      }

      const contact_product ={
        contact: {
          firstName: inputName,
          lastName: inputLastName,
          address: inputAdress,
          city: inputCity,
          email: inputMail,
        },
        products: products,      
      }


      fetch("http://localhost:3000/api/products/order",{
        method: "POST",
        headers: {
          'Accept': 'application/json', 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contact_product)
      })

      .then(function(res) {
        if (res.ok) {
          return res.json();
        }
      })

      .then(function (item){
        window.location.href = "confirmation.html?orderId="+item.orderId;
      });

      localStorage.clear();
    }      
  });