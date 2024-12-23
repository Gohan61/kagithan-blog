import githubIcon from "../assets/github-original.svg";
import emailIcon from "../assets/emailIcon.svg";
import youtubeIcon from "../assets/yt_logo_mono_light.png";

export default function About() {
  const encEmail = "aW5mb0BrYWdpdGhhbi5ibG9n";

  return (
    <div className="flex flex-col gap-2 w-[300px] md:w-[600px] ml-auto mr-auto">
      <h2 className="text-lg font-semibold mb-2">Contact</h2>

      <table className="text-left">
        <thead>
          <tr>
            <th className="pb-4">I want</th>
            <th className="pb-4 text-end">Link to platform</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="pb-4">To check out more of your projects</td>
            <td className="pb-4">
              <a
                href="https://github.com/Gohan61"
                target="_blank"
                rel="noreferrer noopener"
              >
                <img
                  src={githubIcon}
                  alt=""
                  className="w-[30px] md:w-[40px] ml-auto"
                />
              </a>
            </td>
          </tr>
          <tr>
            <td className="pb-4">To watch your videos on YouTube</td>
            <td className="pb-4 text-end">
              <a
                href="https://www.youtube.com/@Kagithan-books"
                target="_blank"
                rel="noreferrer noopener"
              >
                <img
                  src={youtubeIcon}
                  alt=""
                  className="w-[50px] md:w-[60px] ml-auto"
                />
              </a>
            </td>
          </tr>
          <tr>
            <td className="pb-4">To send you an email</td>
            <td className="pb-4 text-end">
              <a href={"mailto:".concat(atob(encEmail))}>
                <img
                  src={emailIcon}
                  alt=""
                  className="w-[30px] md:w-[40px] ml-auto"
                />
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
