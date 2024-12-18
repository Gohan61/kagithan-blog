import { Link } from "react-router-dom";

export default function Blogs() {
  const posts = [
    { title: "First blog", file: "post1.md" },
    { title: "Second blog", file: "post2.md" },
  ];

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
