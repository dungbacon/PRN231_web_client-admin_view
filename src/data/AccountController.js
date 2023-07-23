import { AccountBoxOutlined } from "@mui/icons-material";
import axios from "axios";

export const GetUserById = async (accountId, jwtToken) => {
  let url = `https://localhost:7249/api/Account/${accountId}`;
  try {
    return await axios.get(url, {
      headers: {
        Authorization: `Bearer ${jwtToken}`, // Attach the JWT token in the request headers
      },
    });
  } catch (e) {
    console.log(e);
  }
};

export const UpdateUser = async (accountRequest, accountId, jwtToken) => {
  let url = `https://localhost:7249/api/Account/update/${accountId}`;
  try {
    return await axios.put(url, accountRequest, {
      headers: {
        Authorization: `Bearer ${jwtToken}`, // Attach the JWT token in the request headers
      },
    });
  } catch (e) {
    console.log(e);
  }
};
