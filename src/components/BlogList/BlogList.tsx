import BlogItem from "../BlogItem/BlogItem";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { useEffect } from "react";
import { getBlogList } from "../../redux/slices/blog.slice";

const BlogList = () => {
	const blogs = useSelector((state: RootState) => state.blog.blogs);
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(getBlogList());
	}, [dispatch]);
	return (
		<div className="py-6">
			<div className="grid grid-cols-4 gap-4 py-6">
				{blogs.map((blog) => (
					<div className="col-span-1" key={blog.id}>
						<BlogItem blog={blog} />
					</div>
				))}
			</div>
		</div>
	);
};

export default BlogList;
