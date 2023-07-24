import axios from "axios";

export const AddOrder = async (order, jwtToken) => {
  let url = `https://localhost:7249/api/Order/addOrder`;
  try {
    const response = await axios.post(url, order, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error adding address:", error);
    throw error;
  }
};

export const GetOrders = async (jwtToken) => {
  let url = `https://localhost:7249/api/Order/list`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error adding address:", error);
  }
};

export const UpdateOrderStatus = async (id, jwtToken) => {
  let url = `https://localhost:7249/api/Order/order/${id}/status`;
  try {
    const response = await axios.put(url, null, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error adding address:", error);
  }
};
