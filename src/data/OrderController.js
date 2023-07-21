import axios from "axios";

export const AddOrder = async (order) => {
  let url = `https://localhost:7249/api/Order/addOrder`;
  try {
    const response = await axios.post(url, order);
    return response;
  } catch (error) {
    console.error("Error adding address:", error);
    throw error;
  }
};
