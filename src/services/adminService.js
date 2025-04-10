import { axiosInstance } from "../api/axiosInstance";
import { analytics } from "../api/url";

export const getRevenueService = async () => {
  try {
    const response = await axiosInstance.get(analytics.revenue);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCustomerService = async () => {
  try {
    const response = await axiosInstance.get(analytics.customers);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductService = async () => {
  try {
    const respone = await axiosInstance.get(analytics.products);
    return respone.data;
  } catch (error) {
    throw error;
  }
};
export const getOrderService = async (
  currentPage = 1,
  limit = 6,
  search = "",
  status = ""
) => {
  try {
    const response = await axiosInstance.get(analytics.orders, {
      params: { page: currentPage, limit, search, status },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const viewOrderService = async (orderId) => {
  try {
    const response = await axiosInstance.get(
      `${analytics.viewOrder}/${orderId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const reportServie = async (startDate, endDate) => {
  try {
    const response = await axiosInstance.get(analytics.report, {
      params: {
        startDate,
        endDate,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
