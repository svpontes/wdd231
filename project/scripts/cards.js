
export async function loadProducts(dataFile) {
    try {
        const data = await getDataInfo(dataFile);
        displayProducts(data);
    } catch (error) {
        console.error("ERROR loading or displaying data: ", error);
        alert("Error trying to get data. Try later.");
    }
}

// Função para buscar os dados do JSON
async function getDataInfo(dataJSON) {
    const response = await fetch(dataJSON);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}

// Função para exibir produtos na página
const displayProducts = (products) => {
    const cards = document.getElementById("cards");
    cards.innerHTML = "";

    products.forEach(product => {
        const card = document.createElement("section");
        card.classList.add("product-card");

        const productImg = document.createElement("img");
        const productName = document.createElement("h2");
        const productDescription = document.createElement("p");
        const productPrice = document.createElement("p");
        const productSizeButtons = document.createElement("div");
        const cartMessage = document.createElement("div"); // Div para a mensagem

        // Atributos da imagem do produto
        productImg.setAttribute("src", product.icon);
        productImg.setAttribute("alt", product.productName);
        productImg.setAttribute("loading", "lazy");
        productImg.setAttribute("width", "383");
        productImg.setAttribute("height", "384");

        productName.innerHTML = product.productName;
        productDescription.innerHTML = product.description;

        // Mostra o preço inicial (S)
        productPrice.classList.add("price-display");
        productPrice.innerHTML = `$${product.priceS}`;

        // Adiciona botões de tamanhos dinâmicos a partir do JSON
        productSizeButtons.classList.add("size-buttons");

        // Obtenção dos tamanhos do JSON
        const sizes = product.additionsInfo.sizes;
        Object.keys(sizes).forEach(sizeKey => {
            const sizeLabel = sizes[sizeKey]; // 'S', 'M', etc.
            const sizeButton = document.createElement("button");
            sizeButton.innerHTML = sizeLabel;
            sizeButton.classList.add("size-button");

            // Configura o evento de clique para mudar o preço
            sizeButton.addEventListener("click", () => {
                let selectedPrice;
                switch (sizeKey) {
                    case "small": selectedPrice = product.priceS; break;
                    case "medium": selectedPrice = product.priceM; break;
                    case "large": selectedPrice = product.priceL; break;
                    case "extraLarge": selectedPrice = product.priceXL; break;
                }
                productPrice.innerHTML = `$${selectedPrice}`;
            });

            productSizeButtons.appendChild(sizeButton);
        });

        // Ícone do carrinho com evento de clique para adicionar ao carrinho
        const cartIcon = document.createElement("img");
        cartIcon.setAttribute("src", "./images/cart.png"); // Defina o caminho para o ícone do carrinho
        cartIcon.setAttribute("alt", "Add to the cart");
        cartIcon.classList.add("cart-icon");

        // Configura o evento de clique para exibir a mensagem
        cartIcon.onclick = () => {
            cartMessage.innerHTML = "Product Added to the Cart";
            cartMessage.classList.add("cart-message", "show");

            setTimeout(() => {
                cartMessage.classList.remove("show");
                cartMessage.innerHTML = "";
            }, 1000); // Exibe a mensagem por 1 segundo
        };

        // Adiciona todos os elementos ao cartão
        card.appendChild(productImg);
        card.appendChild(productName);
        card.appendChild(productDescription);
        card.appendChild(productPrice);
        card.appendChild(productSizeButtons);
        card.appendChild(cartIcon);
        card.appendChild(cartMessage); // Adiciona a mensagem abaixo do carrinho

        cards.appendChild(card);
    });
};

