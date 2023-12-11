import {cart, addtocart, calculatequantity} from '../data/cart.js';
import {products} from '../data/products.js'
let productsHTML = '';

        products.forEach((product) => {
          productsHTML += `
            <div class="product-container">
              <div class="product-image-container">
                <img class="product-image" src="${product.image}">
              </div>
              <div class="product-name">
                ${product.name}
              </div>
              <div class="product-rating">
                <img class="product-star" src="Icon/rating-${product.rating.stars * 10}.png">
                <div class="rating-count">${product.rating.count}</div>
              </div>
              <div class="product-price">
                ${(product.pricecents /100).toFixed(2)}
              </div>
              <div class="product-quantity">
                <select class="js-quantity-selector-${product.id}">
                  <option selected value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>
              <div class="product-spacer">
              </div>
              <div class="added-to-cart js-added-to-cart-${product.id}">
                <img class="checkmark-icon" src="Icon/checkmark.png">
                " Added "
              </div>
              <button class="add-to-cart-button js-add-to-cart-button" data-product-id="${product.id}">
                Add to Cart
              </button>
            </div>
            `;
        });

        document.querySelector('.js-product-grid').innerHTML = productsHTML

        function updatecartquantity() {
        const cartquantity = calculatequantity()
        document.querySelector('.js-cart-quantity').innerHTML = cartquantity
        }
        updatecartquantity()

       

        document.querySelectorAll('.js-add-to-cart-button').forEach((button) => {
          button.addEventListener('click', () => {
            const productid = button.dataset.productId;
            addtocart(productid);
            updatecartquantity()
          })
        })