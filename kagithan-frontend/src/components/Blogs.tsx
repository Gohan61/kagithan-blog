import { Link } from "react-router-dom";
import posts from "../posts";

export default function Blogs() {
  return (
    <div className="flex flex-col gap-2 w-[300px] md:w-[600px] ml-auto mr-auto">
      <h2 className="text-xl font-semibold">Blogs</h2>
      <ul className="mt-3">
        {posts.map((post) => {
          return (
            <li key={post.file} className="underline mb-2">
              <Link
                to={`/blog/${post.file}`}
                className="visited:text-purple-800"
              >
                {post.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
