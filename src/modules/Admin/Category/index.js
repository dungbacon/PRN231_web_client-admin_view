import React, { useState, useEffect, useContext } from "react";
import { tokens } from "../../../theme";
import { useTheme, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AdminHeader from "../../../components/Admin/Header";
import { UploadImgToImgBB } from "../../../data/ServiceController";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import {
  AddNewCategory,
  GetCategories,
} from "../../../data/CategoryController";
import UpdateModal from "../../../components/Admin/Category/UpdateModal";
import NotificationContext from "../../../context/NotificationContext";

const Category = () => {
  const { notificationHandler } = useContext(NotificationContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [formData, setFormData] = useState({
    categoryName: "",
    categoryImg: null,
  });
  const [categories, setCategories] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [loadCategory, setLoadCategory] = useState(false);

  useEffect(() => {
    GetCategories().then((response) => {
      if (response.status === 200) {
        setCategories(response.data);
      }
    });
  }, [loadCategory]);

  const getRowId = (row) => {
    return row.categoryId;
  };

  const columns = [
    {
      field: "categoryId",
      headerName: "Id",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "categoryName",
      headerName: "Tên",
      flex: 1,
      headerAlign: "center",
      align: "center",
      cellClassName: "name-column--cell",
    },
    {
      field: "createDate",
      headerName: "Create",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "updatedDate",
      headerName: "Update",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "isActive",
      headerName: "Active",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "categoryImg",
      headerName: "Ảnh",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        const imageUrl = row.categoryImg;
        return <img src={imageUrl} />;
      },
    },
  ];

  const handleInputChange = (event) => {
    const { name, value, type, files } = event.target;
    const inputValue = type === "file" ? files[0] : value;

    setFormData({
      ...formData,
      [name]: inputValue,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const currentDate = dayjs();
    const jwtToken = Cookies.get("jwtToken");
    UploadImgToImgBB(formData.categoryImg).then((response) => {
      if (response.data.status === 200) {
        const request = {
          categoryName: formData.categoryName,
          categoryImg: response.data.data.url,
          createDate: currentDate.format("MM/DD/YYYY"),
          isActive: 1,
        };
        AddNewCategory(request, jwtToken).then((response) => {
          setLoadCategory(true);
          if (response.status === 200) {
            notificationHandler({
              type: "success",
              message: "Thêm Danh mục thành công!",
            });
          } else {
            notificationHandler({
              type: "error",
              message: "Thêm Danh mục thất bại!",
            });
          }
        });
      }
    });
  };

  const handleRowSelection = (selectionModel) => {
    setModalData({
      categoryId: selectionModel.row.categoryId,
      categoryName: selectionModel.row.categoryName,
      categoryImg: selectionModel.row.categoryImg,
    });

    setVisibleModal(!visibleModal);
  };

  const hanleOnClose = () => {
    setVisibleModal(!visibleModal);
    setModalData(null);
  };

  return (
    <div className="my-[10px] mx-[20px]">
      <UpdateModal
        visible={visibleModal}
        onClose={hanleOnClose}
        data={modalData}
      />
      <AdminHeader title="TẠO DANH MỤC" subtitle="Tạo danh mục mới" />
      <form onSubmit={handleFormSubmit}>
        <div className="flex items-center justify-between">
          <div className="mb-4 w-[55%]">
            <label
              htmlFor="categoryName"
              className="mb-2 text-sm text-gray-900 dark:text-white font-bold"
            >
              Tên:
            </label>
            <input
              type="text"
              name="categoryName"
              id="categoryName"
              value={formData.categoryName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400"
            />
          </div>
          <div className="mb-4 w-[40%]">
            <label
              htmlFor="categoryImg"
              className="mb-2 text-sm font-bold text-gray-900 dark:text-white"
            >
              Ảnh:
            </label>
            <input
              className="w-full text-sm p-[5px] text-gray-900 bg-white dark:bg-gray-700 border border-gray-300 rounded-lg cursor-pointer dark:text-gray-400 focus:outline-none dark:border-gray-600 dark:placeholder-gray-400"
              name="categoryImg"
              id="categoryImg"
              type="file"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Lưu
        </button>
      </form>
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
          rows={categories}
          getRowId={getRowId}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          onRowClick={handleRowSelection}
          pageSizeOptions={[5, 10, 25]}
        />
      </Box>
    </div>
  );
};

export default Category;
