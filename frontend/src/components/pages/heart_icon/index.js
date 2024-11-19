import React, { useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import {
  addToFavorites,
  removeFromFavorites,
  setFavorites
} from '../../../redux/features/favorites/favoriteSlice';
import {
  addFavoriteToLocalStorage,
  getFavoritesFromLocalStorage,
  removeFavoriteFromLocalStorage
} from '../../../utils/localStorage';

const HeartIcon = ({ product }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites) || [];
  const isFavorite = favorites.some((p) => p._id === product._id); // Düzgün məntiq

  useEffect(() => {
    const favoritesFromLocalStorage = getFavoritesFromLocalStorage();
    if (favoritesFromLocalStorage) {
      dispatch(setFavorites(favoritesFromLocalStorage));
    }
  }, [dispatch]); // `dispatch`-i dependency array-ə əlavə edin

  const toggleFavorites = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(product));
      removeFavoriteFromLocalStorage(product._id); // localStorage-dan sil
    } else {
      dispatch(addToFavorites(product));
      addFavoriteToLocalStorage(product); // localStorage-a əlavə et
    }
  };

  return (
    <div
      className="absolute top-2 right-5 cursor-pointer"
      onClick={toggleFavorites} // Klik işləyəcək
    >
      {isFavorite ? (
        <FaHeart className="text-pink-600 text-2xl" />
      ) : (
        <FaRegHeart className="text-pink-700 text-2xl" />
      )}
    </div>
  );
};

export default HeartIcon;
