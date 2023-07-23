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

export const UpdateCategory = async (id, req, jwtToken) => {
  let url = `https://localhost:7249/api/Category/update/${id}`;
  try {
    const response = await axios.put(url, req, {
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

export const DeleteCategory = async (id, jwtToken) => {
  let url = `https://localhost:7249/api/Category/delete/${id}`;
  try {
    const response = await axios.delete(url, {
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
