import { useEffect, useState } from "react";
import ReactMarkDown from "react-markdown";
import { useParams } from "react-router-dom";

export default function SingleBlog() {
  const { file } = useParams();
  const [content, setContent] = useState("");

  useEffect(() => {
    (async () => {
      try {
        await fetch(`http://localhost:3000/${file}`, {
          mode: "cors",
          method: "GET",
          headers: {
            "Content-Type": "text/plain",
          },
        }).then(async (res) => {
          const blogText = await res.text();
          setContent(blogText);
        });
      } catch (err) {
        console.log(err);
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
