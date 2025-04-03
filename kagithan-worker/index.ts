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

interface CustomResponse {
  errorMessage?: string;
  status: number;
  body?: BodyInit | null;
  headers?: HeadersInit;
}

function corsHeaders({
  errorMessage,
  status,
  body = null,
  headers = {},
}: CustomResponse): Response {
  const responseHeaders = new Headers(headers);
  responseHeaders.set("Access-Control-Allow-Origin", "https://kagithan.blog");
  responseHeaders.set("Access-Control-Allow-Methods", "GET");
  responseHeaders.set("Access-Control-Allow-Headers", "*");

  return new Response(errorMessage || body, {
    status,
    headers: responseHeaders,
  });
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

          if (keys.length === 0) {
            return corsHeaders({ errorMessage: "No blogs found", status: 404 });
          }

          return corsHeaders({ status: 200, body: keys.toString() });
        }

        const object = await env.blogs_bucket.get(key);

        if (object === null) {
          return corsHeaders({ errorMessage: "Object Not Found", status: 404 });
        }

        return corsHeaders({ status: 200, body: object.body });

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
