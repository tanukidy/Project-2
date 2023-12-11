 export function getproduct(productId) {
  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  return matchingProduct
 }
 
 export const products = [{
  id: 'i4SGizuwxQ',
  image: 'product image/athletic-cotton-socks-6-pairs.jpg',
  name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
  rating: {
    stars: 4.5,
    count: 87
  },
  pricecents: 1090
}, {
  id: 'TuPqvWEAhP',
  image: 'product image/intermediate-composite-basketball.jpg',
  name: 'Intermediate Size Basketball',
  rating: {
    stars: 4,
    count: 127
  },
  pricecents: 2095
}, {
  id: 'FsFuWhpqN2',
  image: 'product image/adults-plain-cotton-tshirt-2-pack-teal.jpg',
  name: 'Adults Plain Cotton T-Shirt - 2 Pack',
  rating: {
    stars: 4.5,
    count: 56
  },
  pricecents: 799
}];
