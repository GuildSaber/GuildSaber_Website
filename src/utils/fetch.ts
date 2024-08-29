import { ZodType } from "zod";

type Fetcher = {
  path: string;
  queryParams?: Record<string, any>;
  rawQueryParams?: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  authenticated?: boolean;
  schema?: ZodType;
};

export const fetchAPI = async <T>({
  path,
  queryParams,
  rawQueryParams,
  method = "GET",
  body,
  authenticated = false,
  schema,
}: Fetcher): Promise<T | null> => {
  try {
    const url = new URL(`${import.meta.env.VITE_API_BASE_URL}${path}`);

    if (queryParams) {
      Object.entries(queryParams).forEach(([key, value]) =>
        url.searchParams.append(key, value),
      );
    }

    if (rawQueryParams) {
      url.search += (url.search ? "&" : "") + rawQueryParams;
    }

    const headers: Record<string, string> = {};
    if (authenticated && localStorage.getItem("token")) {
      headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
    }

    const response = await fetch(url.toString(), {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    const parsedBody = await response.json();

    if (!response.ok) {
      if (!parsedBody.title) {
        throw Error("Something went wrong");
      }

      throw Error(parsedBody.title);
    }

    if (schema) {
      const validation = schema.safeParse(parsedBody);

      if (!validation.success) {
        console.error("Schema validation error:", validation.error);
        throw Error("Schema validation error");
      }
    }

    return parsedBody;
  } catch (error: any) {
    console.error("An error occurred while making the request:", error);
    throw error;
  }
};
