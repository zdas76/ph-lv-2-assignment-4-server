import { TProduct } from "./product.interfact";
import { Product } from "./Product.model";

const createProductToDB = async (payLoad: TProduct) => {
  const checkPorduct = await Product.findOne({ name: payLoad.name });

  if (checkPorduct) {
    const quantity = checkPorduct.stock + payLoad.stock;

    const result = await Product.findByIdAndUpdate(checkPorduct._id, {
      stock: quantity,
    });
    return result;
  } else {
    const result = await Product.create(payLoad);
    return result;
  }
};

const getAllProducts = async () => {
  const result = await Product.find();
  return result;
};

const getProductsById = async (id: string) => {
  const result = await Product.findById(id);
  return result;
};

const updateProductsById = async (id: string, payLoad: Partial<TProduct>) => {
  const result = await Product.findByIdAndUpdate(id, payLoad);
  return result;
};

const deletProductsById = async (id: string) => {
  const result = await Product.findByIdAndDelete(id);
  return result;
};

export const ProductService = {
  createProductToDB,
  getAllProducts,
  getProductsById,
  updateProductsById,
  deletProductsById,
};
