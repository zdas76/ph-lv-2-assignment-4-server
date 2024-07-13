import httpStatus from "http-status";
import catchAsync from "../../middleware/catchAsync";
import sendResponse from "../../Utiles/sendResponse";
import { ProductService } from "./product.service";

const createProduct = catchAsync(async (req, res) => {
  const result = await ProductService.createProductToDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product created successfully",
    data: result,
  });
});

const getAllProducts = catchAsync(async (req, res) => {
  const result = await ProductService.getAllProducts();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All product retrieved successfully",
    data: result,
  });
});

const getProductsId = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await ProductService.getProductsById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product retrieved successfully",
    data: result,
  });
});

const updateProductsId = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductService.updateProductsById(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Update product successfully",
    data: result,
  });
});

const deletProductsId = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductService.deletProductsById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Delet product successfully",
    data: result,
  });
});

export const ProductController = {
  createProduct,
  getAllProducts,
  getProductsId,
  updateProductsId,
  deletProductsId,
};
