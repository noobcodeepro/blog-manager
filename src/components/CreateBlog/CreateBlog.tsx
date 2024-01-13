import React, { useEffect, useState } from "react";
import {
	BlogType,
	addBlog,
	cancelEdit,
	saveEditBlog,
} from "../../redux/slices/blog.slice";
import { RootState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";

const CreateBlog = () => {
	const initialBlog: Omit<BlogType, "id"> = {
		title: "",
		description: "",
		imgUrl: "",
	};
	const [blog, setBlog] = useState<Omit<BlogType, "id">>(initialBlog);
	const dispatch = useAppDispatch();
	const editingBlog = useSelector(
		(state: RootState) => state.blog.editingBlog,
	);
	useEffect(() => {
		setBlog(editingBlog || initialBlog);
	}, [editingBlog]);
	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			if (editingBlog && editingBlog.id) {
				dispatch(
					saveEditBlog({ blog: blog, blogId: editingBlog.id }),
				);
			} else {
				dispatch(addBlog(blog));
			}
			setBlog(initialBlog);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div>
			<form onSubmit={onSubmit}>
				<div className="space-y-12">
					<div className="border-b border-gray-900/10 pb-12 mx-auto max-w-md py-4">
						<div className="text-base font-semibold leading-7 text-gray-900">
							Viết Blog
						</div>
						<p className="mt-1 text-sm leading-6 text-gray-600">
							Bài viết này sẽ được chia sẻ
						</p>

						<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
							<div className="sm:col-span-full">
								<label
									htmlFor="title"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Tiêu đề
								</label>
								<div className="mt-2">
									<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
										<input
											value={blog.title}
											onChange={(e) =>
												setBlog((prev) => ({
													...prev,
													title: e.target.value,
												}))
											}
											type="text"
											name="title"
											id="title"
											autoComplete="title"
											className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
										/>
									</div>
								</div>
							</div>
							<div className="col-span-full">
								<label
									htmlFor="about"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Mô tả
								</label>
								<div className="mt-2">
									<textarea
										value={blog.description}
										onChange={(e) =>
											setBlog((prev) => ({
												...prev,
												description: e.target.value,
											}))
										}
										id="about"
										name="about"
										rows={3}
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
								<p className="mt-3 text-sm leading-6 text-gray-600">
									Viết một số mô tả cho bài viết
								</p>
							</div>
							<div className="sm:col-span-full">
								<label
									htmlFor="title"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Url ảnh
								</label>
								<div className="mt-2">
									<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
										<input
											value={blog.imgUrl}
											onChange={(e) =>
												setBlog((prev) => ({
													...prev,
													imgUrl: e.target.value,
												}))
											}
											type="text"
											name="title"
											id="title"
											autoComplete="title"
											className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
										/>
									</div>
								</div>
							</div>
							<div className="mt-6 col-span-full flex items-center justify-end gap-x-6">
								{editingBlog && (
									<button
										type="button"
										className="text-sm font-semibold leading-6 text-gray-900"
										onClick={() => dispatch(cancelEdit())}
									>
										Cancel
									</button>
								)}
								<button
									type="submit"
									className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
								>
									{editingBlog ? "Save change" : "Save"}
								</button>
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

export default CreateBlog;
