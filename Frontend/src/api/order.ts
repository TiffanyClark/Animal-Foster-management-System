import api from "./axios";
import type { CreateOrderDto, CreateOrderItemDto } from "../../types/orderType";

//post
export const createOrder = async (orderData: CreateOrderDto) => {
  const res = await api.post("/Order", orderData);
  return res.data;
};
export const createOrderItem = async (itemData: CreateOrderItemDto) => {
  const res = await api.post("/OrderItem", itemData);
  return res.data;
};

//get
export const getOrders = async () => {
  const res = await api.get("/Order");
  return res.data;
};
