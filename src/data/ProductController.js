import axios from "axios";

export const GetProducts = async (pageSize, currentPage) => {
  let url = `https://localhost:7249/api/Product/products`;
  try {
    if (pageSize !== 0 || currentPage !== 0) {
      url = url + `?PageSize=${pageSize}&Page=${currentPage}`;
    }
    const { data: response } = await axios.get(url);
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const GetProductsByCateID = async (pageSize, currentPage, id) => {
  let url = `https://localhost:7249/api/Product/${id}/products?PageSize=${pageSize}&Page=${currentPage}`;
  try {
    const { data: response } = await axios.get(url);
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const GetProductDetail = async (id) => {
  let url = `https://localhost:7249/api/Product/products/${id}`;
  try {
    const { data: response } = await axios.get(url);
    return response;
  } catch (e) {
    console.log(e);
  }
};
