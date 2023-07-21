import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import UserDetail from "../../../components/UserDetail";
import { GetUserById } from "../../../data/AccountController";
import Loading from "../../../components/Loading";
import Notification from "../../../components/Notification";

const UserProfile = () => {
  const accountId = localStorage.getItem("accountId");
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    GetUserById(accountId).then((response) => {
      setUserInfo(response);
    });
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
