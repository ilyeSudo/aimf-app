import { createSelector } from 'reselect';
import CryptoJS from "crypto-js";


const getMemberId = state => state.accountStore.user.id;
const getUserAccessToken = state => state.accountStore.access_token;
const getSelectedBookId = state => state.bookStore.selectedBook;
const getfavoriteList = state => state.bookStore.favoriteList;



export const getQrCodeString = createSelector([getMemberId, getSelectedBookId, getUserAccessToken], (memberId, selectedBookId, accessToken) => {
    if (memberId && selectedBookId && accessToken) {
        const hash = CryptoJS.SHA256(`${memberId}_${selectedBookId}_${accessToken}`);
        return JSON.stringify({
            idMember: memberId,
            idBook: selectedBookId,
            hash: hash.toString(CryptoJS.enc.Base64),
        });
    }
    return null;
});

export const getFavoriteListIds = createSelector([getfavoriteList], (favoriteList) => {
    if (favoriteList) {
        return favoriteList.map(book => book.id);
    }
    return [];
});