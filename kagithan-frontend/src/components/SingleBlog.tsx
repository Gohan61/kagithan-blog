import { useEffect, useState } from "react";
import ReactMarkDown from "react-markdown";
import { useParams } from "react-router-dom";

export default function SingleBlog() {
  const { file } = useParams();
  const [content, setContent] = useState("");

  useEffect(() => {
    import(`../content/${file}`)
      .then((res) => res.default)
      .then((text) => setContent(text));
  }, [file]);

  return <ReactMarkDown children={content}></ReactMarkDown>;
}
