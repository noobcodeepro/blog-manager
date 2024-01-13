import { applyMiddleware } from "redux";
import blogReducer from "./slices/blog.slice";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

export const store = configureStore({
	reducer: {
		blog: blogReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
