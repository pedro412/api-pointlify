const productsMock = [
  {
    id: 1,
    name: 'Americano',
    price: 19,
    catogory: 'Café'
  },
  {
    id: 2,
    name: 'Expresso',
    price: 24,
    category: 'Café'
  },
  {
    id: 3,
    name: 'Capuchino',
    price: 26,
    category: 'Café'
  }
];

function filteredProductsMock(category) {
  return productsMock.filter(product => product.category.includes(category));
}

class ProductsServiceMock {
  async getProducts() {
    return Promise.resolve(productsMock);
  }

  async createProduct() {
    return Promise.resolve(productsMock[0]);
  }
}

module.exports = {
  productsMock,
  filteredProductsMock,
  ProductsServiceMock
};
