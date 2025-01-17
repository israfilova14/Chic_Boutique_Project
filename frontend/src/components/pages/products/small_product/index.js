import React from 'react';
import { Link } from "react-router-dom";
import HeartIcon from "../heart_icon/index";

const SmallProduct = ({ product }) => {
  return (
    <div className="w-[20rem] ml-[2rem] p-3">
      <div className="relative h-[240px] w-[240px] overflow-hidden">
        <img
          src={product?.image}
          alt={product?.name}
          className="h-full w-full rounded"
        />
        <HeartIcon
          product={product}
          className="absolute top-2 right-2 w-8 h-8 text-red-500 bg-white rounded-full shadow-lg"
        />
        <div className="p-4">
          <Link to={`/product/${product._id}`}>
            <h2 className="flex justify-between items-center">
              <div>{product?.name}</div>
              <span
                className="bg-pink-200 text-pink-800 text-sm font-medium 
                mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300"
              >
                ${product?.price}
              </span>
            </h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SmallProduct;