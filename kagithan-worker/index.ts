interface Env {
  preview_blogs_bucket: {
    put(key: string, value: ArrayBuffer): Promise<boolean>;
    get(key: string): Promise<{
      body: ReadableStream | null;
      writeHttpMetadata(headers: Headers): void;
      httpEtag: string;
    } | null>;
    list(): Promise<{
      objects: { key: string }[];
    }>;
    delete(key: string): Promise<void>;
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const key: string = url.pathname.slice(1);

    switch (request.method) {
      case "PUT":
        if (!key) {
          return new Response("Blog title is required");
        }

        const blogInBody: ArrayBuffer = await request.arrayBuffer();

        if (!blogInBody || blogInBody.byteLength === 0) {
          return new Response("No blog selected");
        }

        const createdBlog: boolean = await env.preview_blogs_bucket.put(
          key,
          blogInBody
        );

        if (!createdBlog) {
          return new Response(`Error updating ${key}`);
        }

        return new Response(`Updated ${key} successfully!`);
      case "GET":
        if (!key) {
          const list = await env.preview_blogs_bucket.list();
          const keys: string[] = list.objects.map((obj) => obj.key);

          return new Response(keys.toString());
        }

        const object = await env.preview_blogs_bucket.get(key);

        if (object === null) {
          return new Response("Object Not Found", { status: 404 });
        }

        const headers = new Headers();
        object.writeHttpMetadata(headers);
        headers.set("etag", object.httpEtag);

        return new Response(object.body);
      case "DELETE":
        const blogPost = await env.preview_blogs_bucket.get(key);

        if (!blogPost) {
          return new Response("Requested blog not found", { status: 404 });
        }

        await env.preview_blogs_bucket.delete(key);

        return new Response(`Deleted ${key}!`);

      default:
        return new Response("Method Not Allowed", {
          status: 405,
          headers: {
            Allow: "PUT, GET, DELETE",
          },
        });
    }
  },
};
