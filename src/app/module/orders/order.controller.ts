import httpStatus from "http-status";
import catchAsync from "../../middleware/catchAsync";
import sendResponse from "../../Utiles/sendResponse";
import { orderService } from "./order.service";

const createOrder = catchAsync(async (req, res) => {
  console.log(req.body);
  const result = await orderService.crateOrderIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product created successfully",
    data: result,
  });
});

export const OrderController = {
  createOrder,
};
