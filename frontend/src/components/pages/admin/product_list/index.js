// IMPORTS
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import AdminMenu from '../admin_menu/index';
import UploadImage from '../../../../helpers/UploadImage';
import { useNavigate } from 'react-router-dom';
import { useUploadProductMutation } from '../../../../redux/api/productApiSlice';
import { useAllCategoriesQuery } from '../../../../redux/api/categoryApiSlice';

const ProductList = () => {
  const [data, setData] = useState({
    name: "",
    brand: "",
    category: "",
    image: "",
    description: "",
    price: "",
    quantity: "",   
    countInStock: "",   
  });

  const { data: categories } = useAllCategoriesQuery();
  const navigate = useNavigate();
  const [uploadProduct] = useUploadProductMutation();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const uploadImageCloudinary = await UploadImage(file); 
    if (!uploadImageCloudinary) {
      console.error("Image upload failed");
      return;
    }
  
    console.log("Uploaded image:", uploadImageCloudinary.url);
    setData((prev) => ({
      ...prev,
      image: uploadImageCloudinary.url,  
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      ...data,
      countInStock: data.countInStock || 0,   
      quantity: data.quantity || 0,   
    };

    // Əgər bütün sahələr doldurulmayıbsa, xəbərdarlıq edirik
    if (!updatedData.name || !updatedData.price || !updatedData.category || !updatedData.image) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      await uploadProduct(updatedData).unwrap();
      toast.success("Product uploaded successfully!");
      navigate("/admin/all-products-list/:pageNumber");  // Məhsul yükləndikdən sonra məhsul siyahısına yönləndirmək
    } catch (error) {
      toast.error("Product upload failed!");
    }
  };

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 p-3">
          <h2 className="h-12 text-2xl">Create Product</h2>

          {data.image && (
            <div className="text-center">
              <img
                src={data.image} // URL burada göstərilir
                alt="product"
                className="block h-[240px] w-[240px]"
              />
            </div>
          )}

          <div className="mb-3">
            <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer text-xl py-11">
              {data.image ? "Image Uploaded" : "Upload Image"}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleUploadProduct}
                className="hidden"
              />
            </label>
          </div>

          <div className="p-3">
            <div className="flex justify-between flex-wrap">
              <div className='flex flex-col'>
                <label htmlFor="name">Name</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  name="name"
                  value={data.name}
                  onChange={handleOnChange}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="price">Price</label> <br />
                <input
                  type="number"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  name="price"
                  value={data.price}
                  onChange={handleOnChange}
                />
              </div>
            </div>

            <div className="flex justify-between flex-wrap">
              <div className='flex flex-col'>
                <label htmlFor="quantity">Quantity</label> <br />
                <input
                  type="number"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  name="quantity"
                  value={data.quantity}
                  onChange={handleOnChange}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="brand">Brand</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  name="brand"
                  value={data.brand}
                  onChange={handleOnChange}
                />
              </div>
            </div>

         
          <div className='flex flex-col flex-wrap'>
          <label htmlFor="description">Description</label>
          <textarea
              className="p-5 mb-3 bg-[#101011] border rounded-lg w-[99%] text-white"
              name="description"
              value={data.description}
              onChange={handleOnChange}
            ></textarea>
          </div>

            <div className="flex justify-between flex-wrap">
              <div className='flex flex-col'>
                <label htmlFor="countInStock">Count In Stock</label> <br />
                <input
                  type="number"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  name="countInStock"
                  value={data.countInStock}
                  onChange={handleOnChange}
                />
              </div>
              <div className='flex flex-col'>
                <label htmlFor="category">Category</label> <br />
                <select
                  name="category"
                  className="w-[30rem] p-4 mb-3 border rounded-lg text-white bg-[#101011]"
                  onChange={handleOnChange}
                >
                  {categories?.map((category) => (
                    <option value={category._id} key={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              className="bg-green-500 text-white px-5 py-2 rounded-lg"
              type="submit"
              onClick={handleSubmit}
            >
              Upload Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
