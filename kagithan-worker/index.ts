interface Env {
  blogs_bucket: {
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
      case "GET":
        if (!key) {
          const list = await env.blogs_bucket.list();
          const keys: string[] = list.objects.map((obj) => obj.key);

          return new Response(keys.toString());
        }

        const object = await env.blogs_bucket.get(key);

        if (object === null) {
          return new Response("Object Not Found", { status: 404 });
        }

        const headers = new Headers();
        object.writeHttpMetadata(headers);
        headers.set("etag", object.httpEtag);

        return new Response(object.body);

      default:
        return new Response("Method Not Allowed", {
          status: 405,
          headers: {
            Allow: "GET",
          },
        });
    }
  },
};
