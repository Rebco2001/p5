let params = (new URL(document.location)).searchParams;
let id = params.get('id');

function afficherUnCanape() {
	fetch("http://localhost:3000/api/products/"+id)

  	.then(function(res) {
    	if (res.ok) {
      	return res.json();
    	}
  	})

  	.then(function (item) {

		let img = document.createElement("img");
		img.src = item.imageUrl;
      	img.alt = item.altTxt;

		let colors=  item.colors;
		let price=0;

		for (var i = 0; i <= colors.length-1; i++) {
			let choix = document.createElement("option");
			choix.value = colors[i];
			document
				.getElementById("colors")
				.appendChild(choix)
				.innerText = colors[i];
		}
    	
      	document
			.getElementsByClassName("item__img")[0]
        	.appendChild(img);

        document
        	.getElementById("title")
        	.innerText = item.name;

        document
        	.getElementById("price")
        	.innerText = item.price;

        document
        	.getElementById("description")
        	.innerText = item.description;	

		
  	})

  	.catch(function(err) {
    // Une erreur est survenue
  });
	
}

afficherUnCanape();

document
  	.getElementById("addToCart")
	.addEventListener("click", function(d){
		d.preventDefault();
		d.stopPropagation();

			let couleur ="";
			let quantite =0;

			if (document.getElementById("colors").value == "" ){
				alert('Veuillez choisir une couleur'); 
			}
			else{
				couleur = document.getElementById("colors").value;
			}

			

			if (document.getElementById("quantity").value >100 || document.getElementById("quantity").value <1 ){
				alert('Veuillez saisir une valeur comprise entre 1 et 100'); 
			}
			else{
				quantite = document.getElementById("quantity").value;
			}

		if (couleur != "" && quantite <=100 && quantite >=1){

			let verif = false;
			let indice = 0;
			let panier = localStorage.getItem("panier");

			if (panier == null){
				panier=[];
			}
			else {
				panier=JSON.parse(panier);
			}

			for (var i = 0; i <= panier.length-1; i++) {
				if ( panier[i].id == id && panier[i].couleur==couleur){
					verif = true;
					indice = i;
				}
			}

			if (verif && Number (quantite) + Number (panier[indice].quantite)<=100){
				panier[indice].quantite = Number (quantite) + Number (panier[indice].quantite);
				alert('Votre commande a bien été ajoutée au panier');
			}

			else if (verif && Number (quantite) + Number (panier[indice].quantite) >100){
				alert('La valeur de votre panier ne doit pas être supérieur à 100'); 
			}

			else{
				let produit = {
		        	id:id,
		        	couleur:couleur,
		        	quantite:quantite,
				}
				alert('Votre commande a bien été ajoutée au panier');

		        panier.push(produit);
			}

			
	        let product = JSON.stringify(panier);
	       	localStorage.setItem("panier", product);
	    }
        
        
	})

	//verif qtt ds panier