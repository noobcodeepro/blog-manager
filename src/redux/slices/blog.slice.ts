import {
	PayloadAction,
	createAsyncThunk,
	createSlice,
} from "@reduxjs/toolkit";
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	query,
	updateDoc,
} from "firebase/firestore";
import { blogCollection, fs } from "../../config/firebase";
interface IState {
	blogs: BlogType[];
	editingBlog: BlogType | null;
}

export type BlogType = {
	id: string;
	title: string;
	description: string;
	imgUrl: string;
};
const initialState: IState = {
	blogs: [],
	editingBlog: null,
};

export const getBlogList = createAsyncThunk<BlogType[]>(
	"blog/getBlogList",
	async () => {
		const querySnapshot = await getDocs(blogCollection);
		return querySnapshot.docs.map((doc) => {
			return {
				...(doc.data() as Omit<BlogType, "id">),
				id: doc.id,
			};
		});
	},
);

export const addBlog = createAsyncThunk(
	"blog/addBlog",
	async (blog: Omit<BlogType, "id">) => {
		const docRef = await addDoc(blogCollection, blog);
		return { id: docRef.id, ...blog };
	},
);

export const deleteBlog = createAsyncThunk(
	"blog/deleteBlog",
	async (id: string) => {
		const document = doc(fs, `/blogs/${id}`);
		await deleteDoc(document);
		return document.id;
	},
);

export const saveEditBlog = createAsyncThunk(
	"blog/saveEditBlog",
	async ({
		blog,
		blogId,
	}: {
		blog: Omit<BlogType, "id">;
		blogId: string;
	}) => {
		const blogDocument = doc(fs, `/blogs/${blogId}`);
		await updateDoc(blogDocument, blog);
		return {
			id: blogId,
			...blog,
		};
	},
);

const blogSlice = createSlice({
	name: "blog",
	initialState: initialState,
	reducers: {
		startEdit: (state, action: PayloadAction<BlogType>) => {
			state.editingBlog = action.payload;
		},
		cancelEdit: (state) => {
			state.editingBlog = null;
		},
	},

	extraReducers: (builder) => {
		builder
			.addCase(getBlogList.fulfilled, (state, action) => {
				if (action.payload.length > 0) {
					state.blogs = action.payload;
				}
			})
			.addCase(addBlog.fulfilled, (state, action) => {
				state.blogs.push(action.payload);
			})
			.addCase(deleteBlog.fulfilled, (state, action) => {
				let deletePostId = state.blogs.findIndex(
					(blog) => blog.id == action.payload,
				);
				if (deletePostId !== -1) {
					state.blogs.splice(deletePostId, 1);
				}
			})
			.addCase(saveEditBlog.fulfilled, (state, action) => {
				state.blogs.find((blog, index) => {
					if (blog.id === action.payload.id) {
						state.blogs[index] = action.payload;
						return true;
					}
					return false;
				});
				state.editingBlog = null;
			});
	},
});

export const { startEdit, cancelEdit } = blogSlice.actions;

export default blogSlice.reducer;
