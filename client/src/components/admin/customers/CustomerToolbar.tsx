import "./CustomerToolbar.css";

interface Props {
  search: string;
  setSearch: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
}

const CustomerToolbar = ({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
}: Props) => {
  return (
    <div className="customer-toolbar">

      <div className="customer-search">
        <input
          type="text"
          placeholder="Search by Name or Email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="customer-filter">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Customers</option>
          <option value="Active">Active</option>
          <option value="Blocked">Blocked</option>
        </select>
      </div>

    </div>
  );
};

export default CustomerToolbar;