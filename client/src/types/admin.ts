export interface Customer {
  _id: string;
  name: string;
  email: string;

  phone?: string;

  createdAt: string;

  isBlocked?: boolean;

  orders?: number;

  totalSpent?: number;
  
  address?: {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
};
}

export interface ShippingAddress {
  fullName?: string;
  phone?: string;
  address?: string;
  street?: string;
  city?: string;
  state?: string;
  pincode?: string;
  postalCode?: string;
  zipCode?: string;
  country?: string;
}

export interface OrderProduct {
  product?: {
    _id?: string;
    name?: string;
    brand?: string;
    image?: string;
    category?: string;
  };

  quantity: number;
  price: number;
}

export interface Order {
  _id: string;

  totalAmount: number;

  status: string;

  createdAt: string;

  paymentMethod: string;

  paymentStatus: string;

  shippingAddress?: ShippingAddress;

  user?: {
    _id?: string;
    name?: string;
    email?: string;
  };

  products: OrderProduct[];
}