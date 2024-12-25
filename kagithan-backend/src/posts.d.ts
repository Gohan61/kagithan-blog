import { postsType } from "./types/types";

declare module "./posts" {
  const posts: postsType;
  export default posts;
}
