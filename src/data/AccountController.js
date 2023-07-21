import { AccountBoxOutlined } from "@mui/icons-material";
import axios from "axios";

export const GetUserById = async (accountId) => {
  let url = `https://localhost:7249/api/Account/${accountId}`;
  try {
    const { data: response } = await axios.get(url);
    return response;
  } catch (e) {
    console.log(e);
  }
};
