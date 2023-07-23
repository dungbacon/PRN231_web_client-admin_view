import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Loading from "../../components/Loading";
import { url_img_regex } from "../../common_function/regex/commonRegex";
import { formattedPriceService } from "../../common_function/service";
import { AddOrder } from "../../data/OrderController";
import { GetAddresses, DeleteAddress } from "../../data/AddressController";
import Modal from "../../components/Modal";
import dayjs from "dayjs";
import Notification from "../../components/Notification";
import NotificationContext from "../../context/NotificationContext";
import { ThankYou } from "../../components/ThankYou";
import Cookies from "js-cookie";

const wait = (milliseconds) => {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
};

const Cart = () => {
  const { notificationHandler } = useContext(NotificationContext);
  const navigate = useNavigate();
  const [loadAddresses, setLoadAddresses] = useState(false);
  const [total, setTotal] = useState(0);
  const [done, setDone] = useState(undefined);
  const [addressId, setAddressId] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [visible, setVisible] = useState(false);
  const [visibleBtn, setVisibleBtn] = useState(true);
  const [loadThankYou, setLoadThankYou] = useState(false);
  const carts = JSON.parse(localStorage.getItem("cart")) || [];
  const accountId = Cookies.get("accountId");

  useEffect(() => {
    const fetchAddresses = (accountId) => {
      GetAddresses(accountId).then((response) => {
        setAddresses(response);
        setDone(true);
      });
    };

    fetchAddresses(accountId);
  }, [visible, addressId, loadAddresses]);

  useEffect(() => {
    const total = carts.reduce((acc, item) => {
      if (item !== null) return acc + item.price * item.quantity;
    }, 0);
    setTotal(total);
  }, [carts]);

  const hanleOnClose = () => setVisible(!visible);

  const handleDeleteAddress = () => {
    DeleteAddress(addressId).then((response) => {
      navigate("/cart");
      setLoadAddresses(true);
    });
  };

  const HandleCheckoutBtn = async () => {
    setDone(false);
    if (addressId === 0) {
      setDone(true);
      notificationHandler({
        type: "warning",
        message: "Vui lòng chọn địa chỉ!",
      });
      return;
    }

    const currentDate = dayjs();
    let orderRequest = {
      order: {
        accountId: accountId,
        addressId: addressId,
        status: 0,
        shippingFee: 10,
        orderDate: currentDate.format("MM/DD/YYYY"),
        isActive: true,
      },
      orderDetails: [],
    };
    orderRequest.orderDetails = carts.map((item) => {
      return {
        orderId: 0,
        productId: item.productId,
        quantity: item.quantity,
        totalPrice: item.quantity * item.price,
        createDate: currentDate.format("MM/DD/YYYY"),
        updatedDate: currentDate.format("MM/DD/YYYY"),
      };
    });
    try {
      var response = await AddOrder(orderRequest);
      if (response.status === 200) {
        notificationHandler({
          type: "success",
          message: "Thêm đơn hàng thành công!",
        });
        setDone(true);
        setLoadThankYou(true);
        await wait(5000);
        localStorage.removeItem("cart");
      }
    } catch (err) {
      if (err) {
        notificationHandler({
          type: "error",
          message: "Có lỗi xảy ra. Vui lòng thử lại sau ít phút!",
        });
      }
    }
  };

  if (carts.length === 0 || carts === undefined) {
    return (
      <div className="text-center text-4xl h-screen flex-col justify-center">
        <div>
          <p>Giỏ hàng trống!</p>
          <Link to={"/"}>Tiếp tục</Link>
        </div>
      </div>
    );
  }

  const handleInc = (id) => {
    const updatedCart = carts.map((item) => {
      if (item.productId === id && item.stockQuantity >= item.quantity + 1) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    navigate("/cart");
  };

  const handleDec = (id) => {
    const updatedCart = carts
      .filter((item) => {
        if (item.quantity === 1) {
          var confirm = window.confirm(
            "Bạn có muốn xóa sản phẩm này ra khỏi giỏ hàng không?"
          );
          if (confirm) {
            return item.quantity !== 1;
          }
        }
        return item;
      })
      .map((item) => {
        if (item.productId === id) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }
        return item;
      });
    console.log(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    navigate("/cart");
  };

  const removeProduct = (id) => {
    const updatedCart = carts.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    navigate("/cart");
  };

  return !done ? (
    <Loading />
  ) : (
    <div>
      <ThankYou visible={loadThankYou} />
      <Modal visible={visible} onClose={hanleOnClose} />
      <Notification />
      <Header />
      <div className="container mx-auto mt-[40px]">
        <div className="flex shadow-md my-10">
          <div className="w-3/4 bg-white px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Giỏ hàng</h1>
              <h2 className="font-semibold text-2xl">
                {carts?.length} sản phẩm
              </h2>
            </div>
            <div className="flex mt-10 mb-5">
              <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                Thông tin
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                Số lượng
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                Giá
              </h3>
              <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                Tổng tiền
              </h3>
            </div>
            {carts?.map((cart) => {
              if (cart !== null || cart !== undefined) {
                return (
                  <div
                    key={cart?.productId}
                    className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5"
                  >
                    <div className="flex w-2/5">
                      <Link
                        to={`/products/${cart?.productId}`}
                        className="w-20"
                      >
                        <img
                          className="h-24"
                          src={cart?.productImg.match(url_img_regex)[0]}
                          alt={cart?.productName}
                        />
                      </Link>
                      <div className="flex flex-col justify-between ml-4 flex-grow">
                        <span className="font-bold text-sm">
                          {cart?.productName}
                        </span>
                        <div
                          className="font-semibold hover:text-red-500 text-gray-500 text-xs cursor-pointer"
                          onClick={() => removeProduct(cart?.productId)}
                        >
                          Xóa
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center w-1/5">
                      <svg
                        className="fill-current text-gray-600 w-3 cursor-pointer"
                        viewBox="0 0 448 512"
                        onClick={() => handleDec(cart?.productId)}
                      >
                        <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                      </svg>

                      <input
                        className="mx-2 border text-center w-8 text-base"
                        type="text"
                        value={cart?.quantity}
                        readOnly={true}
                      />

                      <svg
                        className="fill-current text-gray-600 w-3 cursor-pointer"
                        onClick={() => handleInc(cart?.productId)}
                        viewBox="0 0 448 512"
                      >
                        <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                      </svg>
                    </div>
                    <span className="text-center w-1/5 font-semibold text-sm">
                      {formattedPriceService(cart?.price)}
                    </span>
                    <span className="text-center w-1/5 font-semibold text-sm">
                      {formattedPriceService(cart?.price * cart?.quantity)}
                    </span>
                  </div>
                );
              }
            })}

            <Link
              to={"/products"}
              className="flex font-semibold text-green-600 text-sm mt-10"
            >
              <svg
                className="fill-current mr-2 text-green-600 w-4"
                viewBox="0 0 448 512"
              >
                <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
              </svg>
              Tiếp tục shopping
            </Link>
          </div>

          <div id="summary" className="w-1/4 px-8 py-10">
            <h1 className="font-semibold text-2xl border-b pb-8">Hóa đơn</h1>
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-sm uppercase">
                Số loại {carts?.length}
              </span>
              <span className="font-semibold text-sm">
                {formattedPriceService(total)}
              </span>
            </div>
            <div>
              <label className="font-semibold inline-block mb-3 text-sm uppercase">
                Phí vận chuyển
              </label>
              <select className="block p-2 text-gray-600 w-full text-sm border rounded">
                <option>Standard shipping - $10.00</option>
              </select>
            </div>
            <div className="py-5">
              <label
                htmlFor="address"
                className="font-semibold inline-block mb-3 text-sm uppercase"
              >
                Địa chỉ
              </label>
              <select
                id="address"
                className="block p-2 text-gray-600 w-full text-sm border rounded"
                onChange={(e) => {
                  const selectedOption = e.target.value;
                  if (selectedOption === "AddNew") {
                    setVisible(true);
                    setVisibleBtn(true);
                  } else if (
                    selectedOption !== "default" &&
                    selectedOption !== "AddNew"
                  ) {
                    setAddressId(selectedOption);
                    setVisibleBtn(false);
                  }
                }}
              >
                <option className="text-center font-semibold" value="default">
                  Vui lòng chọn một địa chỉ hoặc thêm địa chỉ mới
                </option>
                {addresses?.map((item) => (
                  <option key={item.addressId} value={item.addressId}>
                    {item.addressDesc}
                  </option>
                ))}
                <option value="AddNew">Thêm địa chỉ mới</option>
              </select>
            </div>
            <div hidden={visibleBtn} className="flex justify-end w-full mt-5">
              <button
                onClick={handleDeleteAddress}
                className="bg-red-500 font-semibold hover:bg-red-600 py-3 text-sm text-white uppercase w-[50%] mr-0 ml-auto"
              >
                Xóa địa chỉ
              </button>
            </div>

            <div className="border-t mt-8">
              <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>Tổng thành tiền</span>
                <span>{formattedPriceService(total)}</span>
              </div>
              <button
                onClick={HandleCheckoutBtn}
                className="bg-green-500 font-semibold hover:bg-green-600 py-3 text-sm text-white uppercase w-full"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
