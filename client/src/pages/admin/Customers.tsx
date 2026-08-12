import { useEffect, useMemo, useState } from "react";

import "./Customers.css";

import CustomerHero from "../../components/admin/customers/CustomerHero";
import CustomerToolbar from "../../components/admin/customers/CustomerToolbar";
import CustomerTable from "../../components/admin/customers/CustomerTable";
import CustomerDetailsModal from "../../components/admin/customers/CustomerDetailsModal";

import {
  getCustomers,
  deleteCustomer,
  toggleBlockCustomer,
} from "../../services/customerService";

interface Customer {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  isBlocked: boolean;
  createdAt: string;
  orders?: number;
  totalSpent?: number;
}

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedCustomer, setSelectedCustomer] =
    useState<Customer | null>(null);

  const [showDetails, setShowDetails] = useState(false);

  const fetchCustomers = async () => {
    try {
      setLoading(true);

      const data = await getCustomers();

      setCustomers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const matchesSearch =
        customer.name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        customer.email
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All"
          ? true
          : statusFilter === "Blocked"
          ? customer.isBlocked
          : !customer.isBlocked;

      return matchesSearch && matchesStatus;
    });
  }, [customers, search, statusFilter]);

  const handleView = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowDetails(true);
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Delete this customer?"
    );

    if (!confirmDelete) return;

    try {
      await deleteCustomer(id);

      fetchCustomers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleBlock = async (id: string) => {
    try {
      await toggleBlockCustomer(id);

      fetchCustomers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="customers-page">

      <CustomerHero customers={customers} />

      <CustomerToolbar
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <CustomerTable
        customers={filteredCustomers}
        loading={loading}
        onView={handleView}
        onDelete={handleDelete}
        onBlock={handleBlock}
      />

      <CustomerDetailsModal
        show={showDetails}
        customer={selectedCustomer}
        onHide={() => setShowDetails(false)}
      />

    </div>
  );
};

export default Customers;