import axios from "axios";

const YOUR_CLIENT_API_KEY = "b0d8935aec94cadd7448a7048c36a638";
const EXPIRATION_SECONDS = 6 * 30 * 24 * 60 * 60;

export const UploadImgToImgBB = async (img) => {
  let url = `https://api.imgbb.com/1/upload?expiration=${EXPIRATION_SECONDS}&key=${YOUR_CLIENT_API_KEY}`;
  try {
    const formData = new FormData();
    formData.append("image", img);
    const response = await axios.post(url, formData);
    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
