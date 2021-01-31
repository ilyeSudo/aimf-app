import {createSelector} from 'reselect';
import CryptoJS from 'crypto-js';

const getUserId = (state) => state.accountStore.user.id;
const getUserAccessToken = (state) => state.accountStore.access_token;
const getSelectedBook = (state) => state.bookStore.selectedBook;
const getfavoriteList = (state) => state.bookStore.favoriteList;

export const getQrCodeString = createSelector(
  [getUserId, getSelectedBook, getUserAccessToken],
  (userId, selectedBook, accessToken) => {
    console.log(userId, selectedBook, accessToken);
    if (userId && selectedBook && accessToken) {
      const hash = CryptoJS.SHA256(
        `${userId}_${selectedBook.id}_${accessToken.slice(0, 9)}`,
      );
      return JSON.stringify({
        userId,
        bookId: selectedBook.id,
        hash: hash.toString(CryptoJS.enc.Base64),
      });
    }
    return null;
  },
);

export const getFavoriteListIds = createSelector(
  [getfavoriteList],
  (favoriteList) => {
    if (favoriteList) {
      return favoriteList.map((book) => book.id);
    }
    return [];
  },
);
