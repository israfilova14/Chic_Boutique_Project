import React, { useRef, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUpdateProductMutation, useGetProductByIdQuery, useDeleteProductMutation } from '../../../../redux/api/productApiSlice';
import { useAllCategoriesQuery } from '../../../../redux/api/categoryApiSlice';
import { toast } from 'react-toastify';
import UploadImage from '../../../helpers/UploadImage.js';
import AdminMenu from '../admin_menu/index.js';

const ProductUpdate = () => {
  const params = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // Fetch product data by ID
  const { data: productData, isLoading, error } = useGetProductByIdQuery(params._id);
  console.log(productData);
  
  // Fetch categories
  const { data: categories = [] } = useAllCategoriesQuery();
  
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  // Set state for product data
  const [data, setData] = useState({
    name: "",
    brand: "",
    category: "",
    image: "",  // Single image URL (string)
    description: "",
    price: "",
    quantity: "",
    countInStock: "",
  });

  // Fetch and set the initial product data when productData is available
  useEffect(() => {
    if (productData) {
      setData({
        name: productData.name || "",
        brand: productData.brand || "",
        category: productData.category || "",
        image: productData.image || "",
        description: productData.description || "",
        price: productData.price || "",
        quantity: productData.quantity || "",
        countInStock: productData.countInStock || ""
      });
    }
  }, [productData]);

  // Handle form field changes
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle file input click
  const handleClick = () => {
    fileInputRef.current.click();  // Trigger file input click
  };

  // Handle image upload
  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadImageCloudinary = await UploadImage(file); // Cloudinary-yə yükləmə funksiyasını çağırırıq
    if (uploadImageCloudinary) {
      setData((prev) => ({
        ...prev,
        image: uploadImageCloudinary.url // URL-i state-ə əlavə edirik
      }));
    } else {
      console.error("Image upload failed");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", data.image);
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("category", data.category);
      formData.append("quantity", data.quantity);
      formData.append("brand", data.brand);
      formData.append("countInStock", data.countInStock);

      // Update product using the RTK Query mutation
      const updatedData = await updateProduct({ productId: params._id, formData });

      if (updatedData?.error) {
          toast.error(error)
      } else {
          toast.success("Product updated successfully")
          navigate("/admin/all-products-list/:pageNumber");
      }
    } catch (err) {
      console.log(err);
      toast.error("Product update failed. Try again.")
    }
  };

  const handleDelete = async() => {
    try{
      let answer = window.confirm("Are you sure you want to delete this product?");
      if(!answer) return
      const {data} = await deleteProduct(params._id);
      toast.success(`${data.name} is deleted successfully`) ;
      navigate('/admin/all-products-list/:pageNumber')
    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <div className="container ml-[6rem]">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 p-2">
          <h2 className="h-10 text-2xl font-semibold">Update <span className='text-[#1DB954]'>Product.</span></h2>

          {/* Display current image */}
          <div className="flex items-center justify-center">
            <div>
              {data.image && (
                <div>
                  <img src={data.image} alt="product" className="w-[210px] h-[210px]" />
                </div>
              )}
            </div>
          </div>

          {/* Upload new image */}
          <div>
            <label
              htmlFor="upload"
              onClick={handleClick}
              className="border text-white text-lg px-4 py-9 block w-full text-center rounded-lg cursor-pointer bg-[#4a4a4a]"
            >
              {data.image ? `Uploaded Image` : 'Upload Image'}
              <input
                type="file"
                name="image"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleUploadImage}
                style={{ display: 'none' }}
              />
            </label>
          </div>

          <div>
            <div className="flex justify-between flex-wrap mt-3">
              <div className="flex flex-col gap-2">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="p-3 w-[30rem] rounded-lg text-white bg-[#4a4a4a]"
                  name="name"
                  value={data.name}
                  onChange={handleOnChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  className="p-3 w-[30rem] rounded-lg text-white bg-[#4a4a4a]"
                  name="price"
                  value={data.price}
                  onChange={handleOnChange}
                />
              </div>
            </div>

            <div className="flex justify-between flex-wrap mt-3">
              <div className="flex flex-col gap-2">
                <label htmlFor="quantity">Quantity</label>
                <input
                  type="number"
                  className="p-3 w-[30rem] rounded-lg text-white bg-[#4a4a4a]"
                  name="quantity"
                  value={data.quantity}
                  onChange={handleOnChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="brand">Brand</label>
                <input
                  type="text"
                  className="p-3 w-[30rem] rounded-lg text-white bg-[#4a4a4a]"
                  name="brand"
                  value={data.brand}
                  onChange={handleOnChange}
                />
              </div>
            </div>
            <div className='flex flex-col gap-2 mt-3'>
              <label htmlFor="description">Description</label>
              <textarea
                  className="p-5 mb-3 bg-[#4a4a4a] border rounded-lg w-[99%] text-white"
                  name="description"
                  value={data.description}
                  onChange={handleOnChange}
                >

              </textarea>
          </div>

            <div className="flex justify-between flex-wrap mt-3">
              <div className="flex flex-col gap-2">
                <label htmlFor="countInStock">Count In Stock</label>
                <input
                  type="number"
                  className="p-3 w-[30rem] border rounded-lg text-white bg-[#4a4a4a]"
                  value={data.countInStock}
                  onChange={handleOnChange}
                  name="countInStock"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="category">Category</label>
                <select
                  name="category"
                  className="p-3 w-[30rem] border rounded-lg bg-[#4a4a4a] text-white"
                  value={data.category}
                  onChange={handleOnChange}
                >
                  <option value="">Choose Category</option>
                  {categories?.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className='flex items-center gap-12'>
              
            <button
              onClick={handleSubmit}
              className="py-2 px-8 mt-3 rounded-lg text-lg bg-[#1DB954] hover:bg-[#1C741C]"
            >
              Update
            </button>
            <button
            onClick={handleDelete}
              className="py-2 px-8 mt-3 rounded-lg text-lg bg-[#b91d22] hover:bg-[#b91d22]"
            >
              Delete
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
