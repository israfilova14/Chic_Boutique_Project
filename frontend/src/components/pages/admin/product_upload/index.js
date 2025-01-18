// IMPORTS
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import AdminMenu from '../admin_menu/index';
import UploadImage from '../../../helpers/UploadImage.js';
import { useNavigate } from 'react-router-dom';
import { useUploadProductMutation } from '../../../../redux/api/productApiSlice.js';
import { useAllCategoriesQuery } from '../../../../redux/api/categoryApiSlice.js';

const ProductUpload = () => {
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
          <h2 className="h-12 text-2xl font-semibold">Upload <span className='text-[#1DB954]'>Product.</span></h2>

          {data.image && (
            <div className="flex items-center justify-center">
              <img
                src={data.image} 
                alt="product"
                className="block h-[200px] w-[200px]"
              />
            </div>
          )}

          <div className="bg-[#4a4a4a]">
            <label className="border text-white px-4 py-9 block w-full text-center rounded-lg cursor-pointer text-lg">
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

            <div className="flex justify-between flex-wrap mt-4">
              <div className='flex flex-col gap-2'>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  placeholder='Enter product name...'
                  className="p-3 w-[30rem] border rounded-lg bg-[#4a4a4a] text-white"
                  name="name"
                  value={data.name}
                  onChange={handleOnChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  placeholder='Enter product price...'
                  className="p-3 w-[30rem] border rounded-lg bg-[#4a4a4a] text-white"
                  name="price"
                  value={data.price}
                  onChange={handleOnChange}
                />
              </div>
            </div>

            <div className="flex justify-between flex-wrap mt-4">
              <div className='flex flex-col gap-2'>
                <label htmlFor="quantity">Quantity</label>
                <input
                  type="number"
                  placeholder='Enter product quantity...'
                  className="p-3 w-[30rem] border rounded-lg bg-[#4a4a4a] text-white"
                  name="quantity"
                  value={data.quantity}
                  onChange={handleOnChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="brand">Brand</label>
                <input
                  type="text"
                  placeholder='Enter product brand...'
                  className="p-3 w-[30rem] border rounded-lg bg-[#4a4a4a] text-white"
                  name="brand"
                  value={data.brand}
                  onChange={handleOnChange}
                />
              </div>
            </div>

         
          <div className='flex flex-col gap-2 flex-wrap mt-4'>
          <label htmlFor="description">Description</label>
          <textarea
              className="p-5 bg-[#4a4a4a] border rounded-lg w-[99%] text-white"
              placeholder='Enter product description...'
              name="description"
              value={data.description}
              onChange={handleOnChange}
            ></textarea>
          </div>

            <div className="flex justify-between flex-wrap mt-4">
              <div className='flex flex-col gap-2'>
                <label htmlFor="countInStock">Count In Stock</label>
                <input
                  type="number"
                  className="p-3 w-[30rem] border rounded-lg bg-[#4a4a4a] text-white"
                  placeholder='Enter product count in stock ....'
                  name="countInStock"
                  value={data.countInStock}
                  onChange={handleOnChange}
                />
              </div>
              <div className='flex flex-col gap-2'>
                <label htmlFor="category">Category</label>
                <select
                  name="category"
                  className="w-[30rem] p-3 border rounded-lg text-white bg-[#4a4a4a]"
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
              className="bg-[#1DB954] hover:bg-[#17A34A] text-white px-5 py-2 rounded-lg mt-4"
              type="submit"
              onClick={handleSubmit}
            >
              Upload Product
            </button>
          </div>
        </div>
      </div>
   
  );
};

export default ProductUpload;
