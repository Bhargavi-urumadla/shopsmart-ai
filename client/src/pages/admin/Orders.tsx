import { useEffect, useState } from "react";

import OrderHero from "../../components/admin/orders/OrderHero";
import OrderToolbar from "../../components/admin/orders/OrderToolbar";
import OrderTable from "../../components/admin/orders/OrderTable";
import OrderDetailsModal from "../../components/admin/orders/OrderDetailsModal";
import UpdateStatusModal from "../../components/admin/orders/UpdateStatusModal";

import {
  getAllOrders,
  deleteOrder,
} from "../../services/adminOrderService";

interface Order {
  _id: string;
  user: any;
  products: any[];
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: string;
  status: string;
  shippingAddress: any;
  createdAt: string;
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedOrder, setSelectedOrder] =
    useState<Order | null>(null);

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);

  // =========================
  // Load Orders
  // =========================

  const loadOrders = async () => {
    try {
      setLoading(true);

      const res = await getAllOrders();

      setOrders(res.orders || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  // =========================
  // Delete
  // =========================

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this order?")) return;

    try {
      await deleteOrder(id);
      loadOrders();
    } catch (error) {
      console.error(error);
    }
  };

  // =========================
  // View
  // =========================

  const handleView = (order: Order) => {
    setSelectedOrder(order);
    setDetailsOpen(true);
  };

  // =========================
  // Status
  // =========================

  const handleStatus = (order: Order) => {
    setSelectedOrder(order);
    setStatusOpen(true);
  };

  // =========================
  // Filter
  // =========================

  const filteredOrders = orders.filter((order) => {
    const keyword = search.toLowerCase();

    const matchesSearch =
      order._id.toLowerCase().includes(keyword) ||
      order.status.toLowerCase().includes(keyword) ||
      order.paymentMethod.toLowerCase().includes(keyword) ||
      order.shippingAddress?.fullName
        ?.toLowerCase()
        .includes(keyword);

    const matchesStatus =
      statusFilter === "All" ||
      order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container-fluid">

      <OrderHero orders={orders} />

      <OrderToolbar
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <OrderTable
        orders={filteredOrders}
        loading={loading}
        onView={handleView}
        onStatus={handleStatus}
        onDelete={handleDelete}
      />

      <OrderDetailsModal
        show={detailsOpen}
        onHide={() => setDetailsOpen(false)}
        order={selectedOrder}
      />

      <UpdateStatusModal
        show={statusOpen}
        onHide={() => setStatusOpen(false)}
        order={selectedOrder}
        onSuccess={loadOrders}
      />

    </div>
  );
};

export default Orders;