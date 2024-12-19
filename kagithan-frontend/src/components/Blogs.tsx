import { Link } from "react-router-dom";
import posts from "../posts";

export default function Blogs() {
  return (
    <div>
      <h2>Blogs</h2>
      <ul>
        {posts.map((post) => {
          return (
            <li key={post.file}>
              <Link to={`/blog/${post.file}`}>{post.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
