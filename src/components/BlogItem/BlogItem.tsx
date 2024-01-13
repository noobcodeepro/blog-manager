import React from "react";
import {
	BlogType,
	deleteBlog,
	startEdit,
} from "../../redux/slices/blog.slice";
import { useAppDispatch } from "../../redux/store";

interface BlogItemProps {
	blog: BlogType;
}
const BlogItem = (props: BlogItemProps) => {
	const blog = props.blog;
	const dispatch = useAppDispatch();
	const handleDeleteBlog = (id: string) => {
		dispatch(deleteBlog(id));
	};

	const handleStartEditBlog = (blog: BlogType) => {
		dispatch(startEdit(blog));
	};
	return (
		<div>
			<div className="relative flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
				<div className="relative mx-4 -mt-6 h-56 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40">
					<img src={blog.imgUrl} alt={blog.title} />
				</div>
				<div className="p-6">
					<h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
						{blog.title}
					</h5>
					<p className="font-sans text-base font-light leading-relaxed text-inherit antialiased line-clamp-3">
						{blog.description}
					</p>
				</div>
				<div className="p-6 pt-0 flex gap-4 justify-end">
					<button
						onClick={() => handleDeleteBlog(blog.id)}
						className="select-none rounded-lg bg-pink-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
						type="button"
						data-ripple-light="true"
					>
						Delete
					</button>

					<button
						className="select-none rounded-lg border border-yellow-300 text-black py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase  shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
						type="button"
						data-ripple-light="true"
						onClick={() => handleStartEditBlog(blog)}
					>
						Edit
					</button>
				</div>
			</div>
		</div>
	);
};

export default BlogItem;
