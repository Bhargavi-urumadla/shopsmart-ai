import API from "../api/api";

export interface Recommendation {
  type: string;
  severity: string;
  title: string;
  description: string;
}

export interface SalesOverview {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  totalProducts: number;
  activeProducts: number;
  totalCustomers: number;
}

export interface ProductInsight {
  productId: string;
  name: string;
  category: string;
  image?: string;
  quantitySold: number;
  revenue: number;
}

export interface CategoryInsight {
  category: string;
  quantitySold: number;
  revenue: number;
}

export interface MonthlySales {
  month: string;
  revenue: number;
  orders: number;
}

export interface InventoryInsight {
  totalProducts: number;
  lowStock: any[];
  outOfStock: any[];
}

export interface DashboardInsights {
  generatedAt: string;
  healthScore: number;
  overview: SalesOverview;
  aiSummary: string;
  recommendations: Recommendation[];
  revenueForecast: number;
  monthlySales: MonthlySales[];
  topProducts: ProductInsight[];
  topCategories: CategoryInsight[];
  inventory: InventoryInsight;
}

export const getDashboardInsights =
  async (): Promise<DashboardInsights> => {
    const response = await API.get(
      "/admin-ai/dashboard"
    );

    return response.data.data;
  };