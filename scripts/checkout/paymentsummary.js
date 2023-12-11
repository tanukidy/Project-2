import {cart, calculatequantity} from "../../data/cart.js";
import {getdeliveryoption} from "../../data/deliveryoption.js";
import {getproduct} from "../../data/products.js";
import {formatCurrency} from "../utils/currency.js"

export function renderpaymentsummary() {
  let paymentsummaryHTML= ''
  let productpricescents = 0
  let Shippingpricescents = 0
  let cartquantity = 0


  cart.forEach((cartitem) => {
    const product = getproduct(cartitem.productid)
    productpricescents += product.pricecents * cartitem.quantity
    
    const deliveryoption = getdeliveryoption(cartitem.deliveryoptionid)
    Shippingpricescents += deliveryoption.pricecents
  

  const totalbeforetaxcents = productpricescents + Shippingpricescents

  const taxcents = totalbeforetaxcents * 0.1

  const totalcents = totalbeforetaxcents + taxcents

  const totalquantity = cartquantity += cartitem.quantity

  paymentsummaryHTML = `
  <div class="js.payment-info">
    <div class="payment-summary-title">Order Summary</div>

    <div class="payment-summary-row">
      <div class="js-quantity-label">Item (${totalquantity}):</div>
      <div class="payment-summary-money" data-testid="product-cost">$${formatCurrency(productpricescents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping & handling:</div>
      <div class="payment-summary-money" data-testid="product-cost">$${formatCurrency(Shippingpricescents)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money" data-testid="sub-total">$${formatCurrency(totalbeforetaxcents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money" data-testid="product-cost">$${formatCurrency(taxcents)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money" data-testid="product-cost">$${formatCurrency(totalcents)}</div>
    </div>

  </div>
  <div class="paypal-toggle">
    Use Paypal
    <input type="checkbox" class="paypal-toggle-input" false>
  </div>
  <div class="js-payment-buttons-container false" data-testid="payment-buttons-container">
    <div class="js-paypal-button-container paypal-button-container" data-testid="paypal-button-container"></div>
    <button class="js-place-order-button place-order-button button-primary" data-testid="place-order-button"> Place your order</button>
  </div>
  `
})
  document.querySelector('.js-payment-summary').innerHTML = paymentsummaryHTML
}