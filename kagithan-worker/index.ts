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
  AUTH_KEY_SECRET: string;
}

interface CustomResponse {
  errorMessage?: string;
  message?: string;
  status: number;
  body?: BodyInit | null;
  headers?: HeadersInit;
}

function corsHeaders({
  errorMessage,
  message,
  status,
  body = null,
  headers = {},
}: CustomResponse): Response {
  const responseHeaders = new Headers(headers);
  responseHeaders.set("Access-Control-Allow-Origin", "https://kagithan.blog");
  responseHeaders.set("Access-Control-Allow-Methods", "GET, PUT, DELETE");
  responseHeaders.set("Access-Control-Allow-Headers", "*");

  return new Response(errorMessage || body, {
    status,
    headers: responseHeaders,
  });
}

const hasValidHeader = (request: Request, env: Env) => {
  return request.headers.get("Auth-Key") === env.AUTH_KEY_SECRET;
};

function authorizeRequest(request: Request, env: Env, key: string) {
  switch (request.method) {
    case "PUT":
    case "DELETE":
      return hasValidHeader(request, env);
    case "GET":
      return true;
    default:
      return false;
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const key: string = decodeURIComponent(url.pathname.slice(1));

    if (!authorizeRequest(request, env, key)) {
      return corsHeaders({ errorMessage: "Forbidden", status: 403 });
    }

    switch (request.method) {
      case "PUT":
        if (!key) {
          return corsHeaders({
            errorMessage: "Blog title is required",
            status: 500,
          });
        }

        const blogInBody: ArrayBuffer = await request.arrayBuffer();

        if (!blogInBody || blogInBody.byteLength === 0) {
          return corsHeaders({ errorMessage: "No blog selected", status: 500 });
        }

        const createdBlog: boolean = await env.blogs_bucket.put(
          key,
          blogInBody
        );

        if (!createdBlog) {
          return corsHeaders({
            errorMessage: `Error updating ${key}`,
            status: 404,
          });
        }

        return corsHeaders({
          message: `Updated ${key} successfully!`,
          status: 200,
        });
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
      case "DELETE":
        if (!key) {
          return corsHeaders({
            message: "Blog title is required",
            status: 500,
          });
        }

        const blogPost = await env.blogs_bucket.get(key);

        if (!blogPost) {
          return corsHeaders({
            errorMessage: "Requested blog not found",
            status: 404,
          });
        }

        await env.blogs_bucket.delete(key);

        return corsHeaders({ status: 200, message: `Deleted ${key}` });

      default:
        return new Response("Method Not Allowed", {
          status: 405,
          headers: {
            Allow: "GET, PUT",
          },
        });
    }
  },
};
