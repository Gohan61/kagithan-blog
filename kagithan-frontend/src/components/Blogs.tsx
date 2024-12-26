import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { postState } from "../types/types";

export default function Blogs() {
  const [posts, setPosts] = useState<postState>([]);

  useEffect(() => {
    (async () => {
      await fetch("http://localhost:3000/blogs", {
        mode: "cors",
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          setPosts(res.posts);
        });
    })();
  }, []);

  return (
    <div className="flex flex-col gap-2 w-[300px] md:w-[600px] ml-auto mr-auto">
      <h2 className="text-xl font-semibold">Blogs</h2>
      <ul className="mt-3">
        {posts.length === 0 ? (
          <p>Loading</p>
        ) : (
          posts.map((post) => {
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
          })
        )}
      </ul>
    </div>
  );
}
