import { ZodType } from "zod";

interface FetcherResponse<T> extends Response {
  parsedBody?: T;
}

type Fetcher = {
  path: string;
  queryParams?: Record<string, any>;
  rawQueryParams?: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  authenticated?: boolean;
  schema?: ZodType;
};

export async function fetchAPI<T>({
  path,
  queryParams,
  rawQueryParams,
  method,
  authenticated,
  schema,
}: Fetcher): Promise<T | null | undefined> {
  try {
    const URLParams = new URLSearchParams(queryParams).toString();

    const response: FetcherResponse<T> = await fetch(
      `
      ${import.meta.env.VITE_API_BASE_URL}${path}${
        URLParams && "?" + URLParams
      }${rawQueryParams ? (URLParams ? "&" : "?") + rawQueryParams : ""}`,
      {
        method: method,
        headers: {
          ...(localStorage.getItem("token") && authenticated
            ? { Authorization: `Bearer ${localStorage.getItem("token")}` }
            : {}),
        },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    response.parsedBody = await response.json();

    if (schema) {
      await schema.parse(response.parsedBody);
    }

    return response.parsedBody;
  } catch (error) {
    console.error("An error occurred while making the request:", error);
    return null;
  }
}
