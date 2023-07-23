import axios from "axios";

export const AddNewCategory = async (category, jwtToken) => {
  let url = `https://localhost:7249/api/Category/add`;
  try {
    const response = await axios.post(url, category, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const GetCategories = async () => {
  let url = `https://localhost:7249/api/Category/categories`;
  try {
    const response = await axios(url);
    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
