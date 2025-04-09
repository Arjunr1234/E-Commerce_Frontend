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

export const getOrderService = async () => {
  try {
    const respone = await axiosInstance.get(analytics.orders);
    return respone.data;
  } catch (error) {
    throw error;
  }
};

export const viewOrderService = async(orderId) => {
   try {

       const response = await axiosInstance.get(`${analytics.viewOrder}/${orderId}`);
       return response.data
    
   } catch (error) {
      throw error
   }
}  