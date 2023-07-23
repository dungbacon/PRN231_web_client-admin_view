import React from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../../components/Admin/Header";
import { GetOrders, UpdateOrderStatus } from "../../../data/OrderController";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useContext } from "react";
import NotificationContext from "../../../context/NotificationContext";

const Order = () => {
  const columns = [
    {
      field: "orderId",
      headerName: "ID",
    },
    {
      field: "accountId",
      headerName: "Account ID",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "address",
      headerName: "Địa chỉ",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Tình trạng",
      flex: 1,
    },
    {
      field: "shippingFee",
      headerName: "Phí",
      flex: 1,
    },
    {
      field: "orderDate",
      headerName: "Ngày đặt",
      flex: 1,
    },
    {
      field: "shippedDate",
      headerName: "Ngày nhận",
      flex: 1,
    },
    {
      field: "totalPrice",
      headerName: "Tổng",
      flex: 1,
    },
    {
      field: "isActive",
      headerName: "Trạng thái",
      flex: 1,
    },
    {
      field: "buttonTask",
      headerName: "",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        const checkStatus = row.status === "progressing" ? true : false;
        const orderId = row.orderId;

        const handleButtonClick = () => {
          const jwtToken = Cookies.get("jwtToken");
          UpdateOrderStatus(orderId, jwtToken)
            .then((response) => {
              console.log(response);
              if (response.status >= 200 && response.status < 300) {
                notificationHandler({
                  type: "success",
                  message: "Cập nhập trạng thái thành công!",
                });
              }
            })
            .catch((err) => {
              if (err) {
                notificationHandler({
                  type: "error",
                  message: "Cập nhập trạng thái không thành công!",
                });
              }
            });
        };

        return (
          <button
            type="button"
            onClick={handleButtonClick} // Attach the onClick event handler
            className={
              checkStatus
                ? "bg-blue-500 rounded-lg hover:bg-blue-600 px-4 py-2 ml-[10px] mb-[10px] text-sm font-bold text-white focus:outline-none"
                : "bg-red-500 rounded-lg hover:bg-red-600 px-4 py-2 ml-[10px] mb-[10px] text-sm font-bold text-white focus:outline-none"
            }
          >
            {checkStatus ? "Gửi hàng" : "Hủy đơn"}
          </button>
        );
      },
    },
  ];
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [orders, setOrders] = useState([]);

  const { notificationHandler } = useContext(NotificationContext);

  const getRowId = (row) => {
    return row.orderId;
  };

  useEffect(() => {
    const jwtToken = Cookies.get("jwtToken");
    GetOrders(jwtToken).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        setOrders(response.data);
      }
    });
  }, [orders]);

  return (
    <div className="m-[20px]">
      <Header title="HÓA ĐƠN" subtitle="Danh sách hóa đơn" />
      <Box
        m="20px 0 0 0"
        height="auto"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          getRowId={getRowId}
          rows={orders}
          columns={columns}
          pageSizeOptions={[5, 10, 15]}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
        />
      </Box>
    </div>
  );
};

export default Order;
