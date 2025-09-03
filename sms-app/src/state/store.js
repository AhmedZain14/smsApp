import { configureStore } from '@reduxjs/toolkit';
import login from './loginSlice';
import notes from './notesSlice';
import infos from './infoSlice';
import posts from './postsSlice';
import alerts from './alertSlice';
import adminMessageSlice from './adminMessageSlice';
import moneySafe from './moneySafeSlice.js';

export const store = configureStore({
  reducer: {
    login,
    notes,
    infos,
    posts,
    alerts,
    adminMessageSlice,
    moneySafe
}
});