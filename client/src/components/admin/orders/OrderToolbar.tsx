import "./OrderToolbar.css";

interface Props {
  search: string;
  setSearch: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
}

const OrderToolbar = ({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
}: Props) => {
  return (
    <div className="order-toolbar">

      <div className="search-box">
        <input
          type="text"
          placeholder="Search by Order ID, Customer, Payment..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="filter-box">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Orders</option>
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

    </div>
  );
};

export default OrderToolbar;