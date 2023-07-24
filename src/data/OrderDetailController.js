import axios from "axios";

export const MonthlyRevenuePerYear = async (jwtToken) => {
  let url = `https://localhost:7249/api/OrderDetail/months/revenue`;
  try {
    const response = await axios.get(url, {
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
