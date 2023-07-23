import React, { useState, useEffect, useContext } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../../components/Admin/Header";
import { useTheme } from "@mui/material";
import { GetProducts, AddProduct } from "../../../data/ProductController";
import { GetCategories } from "../../../data/CategoryController";
import { url_img_regex } from "../../../common_function/regex/commonRegex";
import { UploadImgToImgBB } from "../../../data/ServiceController";
import NotificationContext from "../../../context/NotificationContext";
import Cookies from "js-cookie";

const ManageProduct = () => {
  const columns = [
    {
      field: "productId",
      flex: 1,
      headerAlign: "center",
      align: "center",
      headerName: "ID",
    },
    {
      field: "productName",
      flex: 1,
      headerName: "Tên",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "productImg",
      headerName: "Ảnh",
      flex: 1,
      cellClassName: "name-column--cell",
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        const imageUrl = row.productImg.match(url_img_regex)[0];
        const name = row.productName;
        return <img className="" alt={name} src={imageUrl} />;
      },
    },
    {
      field: "price",
      headerName: "Giá",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "discount",
      headerName: "Khuyến Mãi",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
  ];
  const { notificationHandler } = useContext(NotificationContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    CategoryId: "",
    ProductName: "",
    ProductImg: "",
    Rating: "",
    Price: "",
    Discount: "",
    StockQuantity: "",
    Description: "",
    Data: "",
  });
  const [settingList, setSettingList] = useState([
    {
      dataKey: "",
      dataValue: "",
    },
  ]);
  const [descList, setDescList] = useState([
    {
      description: "",
    },
  ]);
  const [loadData, setLoadData] = useState(false);

  const getRowId = (row) => {
    return row.productId;
  };

  useEffect(() => {
    GetCategories().then((response) => {
      if (response.status === 200) {
        setCategories(response.data);
      }
    });

    GetProducts(0, 0)
      .then((response) => {
        setProducts(response.list);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [loadData]);

  const handleSettingListChange = (index, e) => {
    const { name, value } = e.target;
    const newList = [...settingList];
    newList[index][name] = value;
    setSettingList(newList);
  };

  const handleDescListChange = (index, e) => {
    const { name, value } = e.target;
    const newList = [...descList];
    newList[index][name] = value;
    setDescList(newList);
  };

  const handleAddInputSettingList = (e) => {
    e.preventDefault();
    setSettingList([...settingList, { dataKey: "", dataValue: "" }]);
  };

  const handleAddDescList = (e) => {
    e.preventDefault();
    setDescList([...descList, { description: "" }]);
  };

  const handleRemoveInputSettingList = (index) => {
    const newList = [...settingList];
    newList.splice(index, 1);
    setSettingList(newList);
  };

  const handleRemoveInputDescList = (index) => {
    const newList = [...descList];
    newList.splice(index, 1);
    setDescList(newList);
  };

  const handleInputChange = (event) => {
    const { name, value, type, files } = event.target;
    console.log(files);
    const inputValue = type === "file" ? files : value;

    setFormData({
      ...formData,
      [name]: inputValue,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const jwtToken = Cookies.get("jwtToken");
    const fulData =
      settingList.reduce((acc, item) => {
        if (
          item.dataKey.toString().length !== 0 &&
          item.dataValue.toString().length !== 0
        ) {
          return (
            acc +
            `<tr><td class="w-[30%]"><p><strong>` +
            item.dataKey +
            `</strong></p></td><td class="w-[70%]"><p>` +
            item.dataValue +
            `</p></td></tr>`
          );
        }
      }, `<table class="text-sm border-slate-500 ml-[5px] my-[25px]"><tbody>`) +
      `</tbody></table>`;
    const fulDesc = descList.reduce((acc, item) => {
      if (item.description.toString().length !== 0) {
        return acc + item.description + ". ";
      }
    }, "");
    const request = {
      CategoryId: formData.CategoryId,
      ProductName: formData.ProductName,
      ProductImg: "",
      Rating: 5,
      Price: formData.Price,
      Discount: formData.Discount,
      StockQuantity: 10,
      Description: fulDesc,
      Data: fulData,
    };

    const uploadPromises = Array.from(formData.ProductImg).map((item) =>
      UploadImgToImgBB(item)
    );

    try {
      const responses = await Promise.all(uploadPromises);

      request.ProductImg = responses
        .filter((response) => response.status === 200)
        .map((response) => response.data.data.url)
        .join(" ");

      console.log(request);

      const response = await AddProduct(request, jwtToken).then((response) => {
        if (response.status >= 200 && response.status < 300) {
          notificationHandler({
            type: "success",
            message: "Thêm sản phẩm thành công!",
          });
        }
      });
      setLoadData(true);
    } catch (error) {
      notificationHandler({
        type: "error",
        message: "Thêm sản phẩm thất bại!",
      });
    }
  };

  return (
    <div className="m-[20px]">
      <Header title="SẢN PHẨM" subtitle="Danh sách sản phẩm" />
      <form onSubmit={handleFormSubmit}>
        <div className="flex items-center justify-between">
          <div className="w-[45%]">
            <label
              htmlFor="categoryName"
              className="mb-2 text-sm text-gray-900 dark:text-white font-bold"
            >
              Loại Danh Mục:
            </label>
            <select
              name="CategoryId"
              id="CategoryId"
              value={formData.CategoryId}
              onChange={handleInputChange}
              className="w-full px-4 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400"
            >
              {categories.map((item) => {
                return (
                  <option key={item.categoryId} value={item.categoryId}>
                    {item.categoryName}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="w-[50%]">
            <label
              htmlFor="ProductName"
              className="mb-2 text-sm text-gray-900 dark:text-white font-bold"
            >
              Tên:
            </label>
            <input
              type="text"
              name="ProductName"
              id="ProductName"
              required
              value={formData.ProductName}
              onChange={handleInputChange}
              placeholder="Nhập tên sản phẩm..."
              className="w-full px-4 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400"
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="w-[40%]">
            <label
              htmlFor="ProductImg"
              className="mb-2 text-sm font-bold text-gray-900 dark:text-white"
            >
              Ảnh:
            </label>
            <input
              className="w-full text-sm p-[5px] text-gray-900 bg-white dark:bg-gray-700 border border-gray-300 rounded-lg cursor-pointer dark:text-gray-400 focus:outline-none dark:border-gray-600 dark:placeholder-gray-400"
              name="ProductImg"
              id="ProductImg"
              required
              type="file"
              multiple
              onChange={handleInputChange}
            />
          </div>
          <div className="w-[30%]">
            <label
              htmlFor="Price"
              className="mb-2 text-sm text-gray-900 dark:text-white font-bold"
            >
              Giá:
            </label>
            <input
              type="text"
              required
              name="Price"
              id="Price"
              value={formData.Price}
              onChange={handleInputChange}
              placeholder="Nhập giá..."
              className="w-full px-4 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400"
            />
          </div>

          <div className="w-[25%]">
            <label
              htmlFor="Discount"
              className="mb-2 text-sm text-gray-900 dark:text-white font-bold"
            >
              Khuyến Mãi:
            </label>
            <input
              type="text"
              required
              name="Discount"
              id="Discount"
              value={formData.Discount}
              onChange={handleInputChange}
              placeholder="Nhập khuyến mãi..."
              className="w-full px-4 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400"
            />
          </div>
        </div>
        <div className="flex justify-between mt-[20px]">
          <div
            id="data"
            className="w-[48%] h-auto text-gray-900 border border-gray-300 rounded-lg"
          >
            <label
              htmlFor="data"
              className="mb-2 text-sm text-gray-900 dark:text-white font-bold ml-[10px]"
            >
              Cấu hình máy:
            </label>
            {settingList.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex w-full justify-around mt-[10px]"
                >
                  <input
                    className="w-[40%] px-4 py-2 text-sm text-gray-900 rounded-md"
                    required
                    type="text"
                    name="dataKey"
                    value={item.dataKey}
                    onChange={(e) => handleSettingListChange(index, e)}
                    placeholder="Nhập đề mục..."
                  />
                  <input
                    className="w-[40%] px-4 py-2 text-sm text-gray-900 rounded-md"
                    required
                    type="text"
                    name="dataValue"
                    value={item.dataValue}
                    onChange={(e) => handleSettingListChange(index, e)}
                    placeholder="Nhập thông số..."
                  />
                  <button
                    type="button"
                    onClick={handleRemoveInputSettingList}
                    className="px-4 py-2 text-sm font-bold text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none"
                  >
                    Xóa
                  </button>
                </div>
              );
            })}
            <button
              type="button"
              onClick={handleAddInputSettingList}
              className="px-4 py-2 ml-[10px] mb-[10px] text-sm font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Thêm
            </button>
          </div>

          <div
            id="description"
            className="w-[48%] h-auto text-gray-900 border border-gray-300 rounded-lg"
          >
            <label
              htmlFor="description"
              className="mb-2 text-sm text-gray-900 dark:text-white font-bold ml-[10px]"
            >
              Thông tin máy:
            </label>
            {descList.map((item, index) => {
              return (
                <div
                  key={index}
                  className="flex w-full justify-around mt-[10px]"
                >
                  <input
                    required
                    className="w-[80%] px-4 py-2 text-sm text-gray-900 rounded-md"
                    type="text"
                    name="description"
                    value={item.description}
                    onChange={(e) => handleDescListChange(index, e)}
                    placeholder="Nhập đề mục..."
                  />
                  <button
                    type="button"
                    onClick={handleRemoveInputDescList}
                    className="px-4 py-2 text-sm font-bold text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none"
                  >
                    Xóa
                  </button>
                </div>
              );
            })}
            <button
              type="button"
              onClick={handleAddDescList}
              className="px-4 py-2 ml-[10px] mb-[10px] text-sm font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Thêm
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="px-4 py-2 text-sm font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={products}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={getRowId}
          pageSizeOptions={[5, 10, 15]}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
        />
      </Box>
    </div>
  );
};

export default ManageProduct;
