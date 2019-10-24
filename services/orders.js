const MongoLib = require('../lib/mongo');

class OrdersService {
  constructor() {
    this.collection = 'orders';
    this.mongoDB = new MongoLib();
  }

  async getOrders(id) {
    const query = id && { userId: id };
    const orders = await this.mongoDB.getAll(this.collection, query);
    return orders || [];
  }

  async getOrder({ productId }) {
    const products = await this.mongoDB.get(this.collection, productId);
    return products || {};
  }

  async createOrder({ order }) {
    const createdOrder = await this.mongoDB.create(this.collection, order);
    return createdOrder;
  }
}

module.exports = OrdersService;
