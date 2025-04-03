import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const CLOUDFLARE_WORKER_API = import.meta.env.VITE_CLOUDFLARE_WORKER_API;

export default function Blogs() {
  const [posts, setPosts] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(CLOUDFLARE_WORKER_API, {
      method: "GET",
      mode: "cors",
    }).then(async (res) => {
      const reader = res.body?.getReader();
      const result = await reader?.read();
      const decoder = new TextDecoder();

      if (res.status === 200 && result) {
        const text = decoder.decode(result.value);
        setPosts(text.split(","));
        return;
      }

      const errorMessage = decoder.decode(result?.value);
      setError(errorMessage);
    });
  }, []);

  return (
    <div className="flex flex-col gap-2 w-[300px] md:w-[600px] ml-auto mr-auto">
      <h2 className="text-xl font-semibold">Blogs</h2>
      <ul className="mt-3">
        {posts
          ? posts.map((post) => {
              return (
                <li key={post} className="underline mb-2">
                  <Link
                    to={`/blog/${post}`}
                    className="visited:text-purple-800"
                  >
                    {post}
                  </Link>
                </li>
              );
            })
          : ""}
      </ul>
      {error ? <p>{error}</p> : ""}
    </div>
  );
}
