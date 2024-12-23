import { useEffect, useState } from "react";
import ReactMarkDown from "react-markdown";
import { useParams } from "react-router-dom";

export default function SingleBlog() {
  const { file } = useParams();
  const [content, setContent] = useState("");

  useEffect(() => {
    import(/* @vite-ignore */ `../content/${file}`)
      .then((res) => res.default)
      .then((text) => setContent(text));
  }, [file]);

  return (
    <ReactMarkDown
      className="markdown flex flex-col gap-2 w-[300px] md:w-[600px] ml-auto mr-auto"
      children={content}
    ></ReactMarkDown>
  );
}
