function askApi() {
  fetch("http://localhost:3000/api/products")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })

  .then(function(items) {
    for (var i = 0; i <= items.length; i++) {

      let lien = document.createElement("a");
      lien.href = "product.html?id="+items[i]._id; //comment creer le lien//

      let article = document.createElement("article");

      let img = document.createElement("img");
      img.src = items[i].imageUrl;
      img.alt = items[i].altTxt;

      let name = document.createElement("h3");
      name.textContent=items[i].name;
      name.classList.add("productName");

      let text = document.createElement("p");
      text.textContent=items[i].description;
      text.classList.add("productDescription");

      document
        .getElementById("items")
        .appendChild(lien)
        .appendChild(article)
        .appendChild(img);
      img.insertAdjacentElement('afterend', name);
      name.insertAdjacentElement('afterend', text);
      
    }; 
  })

  .catch(function(err) {
    // Une erreur est survenue
  });
}

askApi();
