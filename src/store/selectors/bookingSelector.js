import {createSelector} from 'reselect';
import CryptoJS from 'crypto-js';

const getUserId = (state) => state.accountStore.user.id;
const getUserAccessToken = (state) => state.accountStore.access_token;
const getSelectedBook = (state) => state.bookStore.selectedBook;
const getfavoriteList = (state) => state.bookStore.favoriteList;

export const getQrCodeString = createSelector(
  [getUserId, getSelectedBook, getUserAccessToken],
  (getUserId, getSelectedBook, accessToken) => {
    if (getUserId && getSelectedBook && accessToken) {
      const hash = CryptoJS.SHA256(
        `${getUserId}_${getSelectedBook.id}_${accessToken.slice(0, 9)}`,
      );
      return JSON.stringify({
        userId: getUserId,
        bookId: getSelectedBook.id,
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
