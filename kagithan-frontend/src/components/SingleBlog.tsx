import { useEffect, useState } from "react";
import ReactMarkDown from "react-markdown";
import { useParams } from "react-router-dom";
const CLOUDFLARE_WORKER_API = import.meta.env.VITE_CLOUDFLARE_WORKER_API;

export default function SingleBlog() {
  const { file } = useParams();
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (() => {
      fetch(`${CLOUDFLARE_WORKER_API}/${file}`, {
        mode: "cors",
        method: "GET",
      }).then(async (res) => {
        const reader = res.body?.getReader();
        const result = await reader?.read();
        const decoder = new TextDecoder();

        if (res.status === 200 && result) {
          const text = decoder.decode(result.value);
          setContent(text);
          return;
        }

        const errorMessage = decoder.decode(result?.value);
        setError(errorMessage);
      });
    })();
  }, [file]);

  return (
    <>
      <ReactMarkDown
        className="markdown flex flex-col gap-2 w-[300px] md:w-[600px] ml-auto mr-auto"
        children={content}
      ></ReactMarkDown>
      {error ? <p>{error}</p> : ""}
    </>
  );
}
