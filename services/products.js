const MongoLib = require('../lib/mongo');

class ProductsService {
  constructor() {
    this.collection = 'products';
    this.mongoDB = new MongoLib();
  }
  async getProducts({ categories }) {
    const query = categories && { categories: { $in: categories } };
    const products = await this.mongoDB.getAll(this.collection, query);
    return products || [];
  }

  async getProduct({ productId }) {
    const products = await this.mongoDB.get(this.collection, productId);
    return products || {};
  }

  async createProduct({ product }) {
    const createdProduct = await this.mongoDB.create(this.collection, product);
    return createdProduct;
  }

  async updateProduct({ productId, product } = {}) {
    const createdProduct = await this.mongoDB.update(
      this.collection,
      productId,
      product
    );
    return createdProduct;
  }

  async deleteProduct({ productId }) {
    const deletedProduct = await this.mongoDB.delete(
      this.collection,
      productId
    );
    return deletedProduct;
  }
}

module.exports = ProductsService;
