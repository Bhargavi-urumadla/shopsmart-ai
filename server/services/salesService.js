const Order = require("../models/Order");
const Product = require("../models/Product");

// Dashboard Overview
const getSalesOverview = async () => {
  const totalOrders = await Order.countDocuments();

  const orders = await Order.find();

  const totalRevenue = orders.reduce(
    (sum, order) => sum + order.totalAmount,
    0
  );

  const averageOrderValue =
    totalOrders === 0 ? 0 : totalRevenue / totalOrders;

  const totalProducts = await Product.countDocuments();

  const activeProducts = await Product.countDocuments({
    isActive: true,
  });

  const totalCustomers = await Order.distinct("user");

  return {
    totalRevenue,
    totalOrders,
    averageOrderValue: Number(averageOrderValue.toFixed(2)),
    totalProducts,
    activeProducts,
    totalCustomers: totalCustomers.length,
  };
};

// Revenue
const getRevenue = async () => {
  const orders = await Order.find();

  const revenue = orders.reduce(
    (sum, order) => sum + order.totalAmount,
    0
  );

  return {
    totalRevenue: revenue,
    totalOrders: orders.length,
  };
};

// Monthly Sales
const getMonthlySales = async () => {
  const orders = await Order.find();

  const months = {};

  orders.forEach((order) => {
    const month = new Date(order.createdAt).toLocaleString("default", {
      month: "short",
    });

    if (!months[month]) {
      months[month] = {
        month,
        revenue: 0,
        orders: 0,
      };
    }

    months[month].revenue += order.totalAmount;
    months[month].orders++;
  });

  return Object.values(months);
};

// Top Selling Products
const getTopProducts = async () => {
  const orders = await Order.find().populate(
    "products.product",
    "name category image"
  );

  const sales = {};

  orders.forEach((order) => {
    order.products.forEach((item) => {
      const id = item.product._id.toString();

      if (!sales[id]) {
        sales[id] = {
          productId: id,
          name: item.product.name,
          category: item.product.category,
          image: item.product.image,
          quantitySold: 0,
          revenue: 0,
        };
      }

      sales[id].quantitySold += item.quantity;
      sales[id].revenue += item.quantity * item.price;
    });
  });

  return Object.values(sales)
    .sort((a, b) => b.quantitySold - a.quantitySold)
    .slice(0, 10);
};

// Top Categories
const getTopCategories = async () => {
  const orders = await Order.find().populate(
    "products.product",
    "category"
  );

  const categories = {};

  orders.forEach((order) => {
    order.products.forEach((item) => {
      const category = item.product.category;

      if (!categories[category]) {
        categories[category] = {
          category,
          quantitySold: 0,
          revenue: 0,
        };
      }

      categories[category].quantitySold += item.quantity;
      categories[category].revenue += item.quantity * item.price;
    });
  });

  return Object.values(categories).sort(
    (a, b) => b.revenue - a.revenue
  );
};

module.exports = {
  getSalesOverview,
  getRevenue,
  getMonthlySales,
  getTopProducts,
  getTopCategories,
};