import { useEffect, useState } from "react";
import ReactMarkDown from "react-markdown";
import { useParams } from "react-router-dom";

export default function SingleBlog() {
  const { file } = useParams();
  const [content, setContent] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`/content/${file}`);
        if (!response.ok) {
          throw new Error("Failed to fetch Markdown file");
        }
        const text = await response.text();
        setContent(text);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [file]);

  return (
    <ReactMarkDown
      className="markdown flex flex-col gap-2 w-[300px] md:w-[600px] ml-auto mr-auto"
      children={content}
    ></ReactMarkDown>
  );
}
