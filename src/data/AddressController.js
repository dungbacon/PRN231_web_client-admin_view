import axios from "axios";

export const GetAddresses = async (accountId) => {
  let url = `https://localhost:7249/api/Address/${accountId}/list`;
  try {
    const { data: response } = await axios.get(url);
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const AddAddress = async (address) => {
  let url = `https://localhost:7249/api/Address/add`;
  try {
    const response = await axios.post(url, address);
    return response;
  } catch (error) {
    console.error("Error adding address:", error);
    throw error;
  }
};

export const DeleteAddress = async (id) => {
  let url = `https://localhost:7249/api/Address/delete/${id}`;
  try {
    const response = await axios.delete(url);
    return response;
  } catch (error) {
    console.error("Error adding address:", error);
    throw error;
  }
};
