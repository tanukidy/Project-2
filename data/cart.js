export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
  cart = [{
    productid: 'i4SGizuwxQ',
    quantity: 2,
    deliveryoptionid: '1'
  }, {
    productid: 'TuPqvWEAhP',
    quantity: 1,
    deliveryoptionid: '2'
  }];
}

function savetostorage() {
  localStorage.setItem('cart', JSON.stringify(cart))
}

export function addtocart(productid) {
  let matchingitem;
    cart.forEach((cartitem) => {
      if (productid === cartitem.productid) {
        matchingitem = cartitem;
      }
    });

    const quantityselector = document.querySelector(`.js-quantity-selector-${productid}`);
    const quantity = Number(quantityselector.value);

    let timeset;
    document.querySelector(`.js-added-to-cart-${productid}`).style.opacity = '1'
      clearTimeout(timeset)
      timeset = setTimeout(() => {
      document.querySelector(`.js-added-to-cart-${productid}`).style.opacity = '0'
      } , 1000)
  

    if (matchingitem) {
      matchingitem.quantity += quantity;
    } else {
      cart.push({
        productid: productid,
        quantity: quantity,
        deliveryoptionid: '1'
      });
    }
 savetostorage()
}

 export function calculatequantity() {
  let cartquantity = 0;
    cart.forEach((cartitem) => {
      cartquantity += cartitem.quantity
    });
    return cartquantity
}

export function removefromcart(productId) {
  const newcart = [];

  cart.forEach((cartitem) => {
    if (cartitem.productid !== productId) {
      newcart.push(cartitem);
    }
  })
  cart = newcart
  savetostorage()
}

 export function updatequantity(productId, newquantity) {
  let matchingitem;

  cart.forEach((cartitem) => {
    if(productId === cartitem.productid) {
      matchingitem = cartitem
    }
  })
  matchingitem.quantity = newquantity
  savetostorage()
}

export function updateDeliveryOption(productid, deliveryoptionid) {
  let matchingitem;

  cart.forEach((cartitem) => {
    if (productid === cartitem.productid) {
      matchingitem = cartitem;
    }
  });

  matchingitem.deliveryoptionid = deliveryoptionid

  savetostorage()
}
