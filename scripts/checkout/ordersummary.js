import{cart, removefromcart, calculatequantity, updatequantity, updateDeliveryOption} from '../../data/cart.js';
import{products, getproduct} from '../../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import {deliveryoptions, getdeliveryoption} from '../../data/deliveryoption.js';
import {formatCurrency} from '../utils/currency.js';
import { renderpaymentsummary } from './paymentsummary.js';


export function renderordersummary() {
  let cartsummary= '';

  cart.forEach((cartitem) => {
    const productId = cartitem.productid;

    const matchingProduct = getproduct(productId)

    const deliveryoptionId = cartitem.deliveryoptionid;
    
    const deliveryoption = getdeliveryoption(deliveryoptionId)

    const today = dayjs()
    const deliverydate = today.add(
      deliveryoption.deliverydays, 'days'
    )
    const datestring = deliverydate.format(
      'dddd, MMMM D'
    )
    
    cartsummary += `
      <div class="checkout-container js-checkout-container-${matchingProduct.id}">
        <div class="checkout-delivery-date js-checkout-delivery-date">
          Delivery date: ${datestring}
        </div>

        <div class="cart-item-grid">
          <img class="product-image" src="${matchingProduct.image}">

          <div class="cart-item-detail">
            <div class="product-name">${matchingProduct.name}</div>
            <div class="product-price">${(matchingProduct.pricecents /100).toFixed(2)}</div>
            <div class="product-quantity">
            <span>
              Quantity:<span class="quantity-label js-quantity-label-${matchingProduct.id}"> ${cartitem.quantity}</span> 
            </span>
            <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
              Update
            </span>
            <input class="quantity-input js-quantity-input-${matchingProduct.id}" value="${cartitem.quantity}">
            <span class="save-quantity-link js-save-link link-primary" data-product-id="${matchingProduct.id}">Save</span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
              Delete
            </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-option-title">Choose a delivery option:</div>
            ${deliveryoptionHTML(matchingProduct, cartitem)}
          </div>
        </div>
      </div>
    `;
  });

  function deliveryoptionHTML(matchingProduct, cartitem) {
    let html = ''

    deliveryoptions.forEach((deliveryoption) => {
      const today = dayjs()
      const deliverydate = today.add(
        deliveryoption.deliverydays, 'days'
      )
      const datestring = deliverydate.format(
        'dddd, MMMM D'
      )
      
      const pricestring = deliveryoption.pricecents === 0 ? 'FREE' : `$${formatCurrency(deliveryoption.pricecents)} -` 

      const ischecked = deliveryoption.id === cartitem.deliveryoptionid
      html += `
      <div class="delivery-option js-delivery-option"
      data-product-id="${matchingProduct.id}"
      data-delivery-option-id="${deliveryoption.id}">
        <input type="radio" ${ischecked ? 'checked': ''} class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">${datestring}</div>
          <div class="delivery-option-price">${pricestring} Shipping</div>
        </div>
      </div>
      `
    })

    return html
  }

  document.querySelector('.js-cart-summary').innerHTML = cartsummary

  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      const container = document.querySelector(`.js-checkout-container-${productId}`)
      removefromcart(productId)
      container.remove()
      updatecartquantity()
      renderpaymentsummary()
    })
  })

  function updatecartquantity() {
    const cartquantity = calculatequantity()
    document.querySelector('.js-return-to-home').innerHTML = `${cartquantity} Items`
    }
    updatecartquantity()

  document.querySelectorAll('.js-update-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;

      const container = document.querySelector(`.js-checkout-container-${productId}`)
      container.classList.add('is-editing-quantity')
    })
  })

  document.querySelectorAll('.js-save-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      
      const quantityinput = document.querySelector(`.js-quantity-input-${productId}`)
      const newquantity = Number(quantityinput.value)
      
      if (newquantity <0 || newquantity >= 1000) {
        alert('Quantity must be at least 0 and less than 1000');
        return
      }

      updatequantity(productId, newquantity)

      const container = document.querySelector(`.js-checkout-container-${productId}`)
      container.classList.remove('is-editing-quantity')
      
      const quantitylabel = document.querySelector(`.js-quantity-label-${productId}`)
      quantitylabel.innerHTML = newquantity
      
      updatecartquantity()
      renderpaymentsummary()
    })
  })
      document.querySelectorAll('.js-delivery-option').forEach((element) => {
      element.addEventListener('click', () => {
        const {productId, deliveryOptionId} = element.dataset;
        updateDeliveryOption(productId, deliveryOptionId);
        renderordersummary()
        renderpaymentsummary()
      });
    });
}
