import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import UserDetail from "../../components/UserDetail";
import { GetUserById } from "../../data/AccountController";
import Loading from "../../components/Loading";
import Notification from "../../components/Notification";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  const accountId = localStorage.getItem("accountId");
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const jwtToken = Cookies.get("jwtToken");
    if (!jwtToken) {
      navigate("/notfound");
    } else {
      GetUserById(accountId, jwtToken).then((response) => {
        if (response.status === 200) {
          setUserInfo(response.data);
          console.log(response.data);
        }
      });
    }
  }, [accountId]);

  return (
    <div>
      <Notification />
      <Header />
      {userInfo !== null ? <UserDetail data={userInfo} /> : <Loading />}
      <Footer />
    </div>
  );
};

export default UserProfile;
