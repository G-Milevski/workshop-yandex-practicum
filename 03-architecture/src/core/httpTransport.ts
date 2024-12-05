enum METHOD {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

type Options = {
  method: METHOD;
  data?: any;
};

type OptionsWithoutMethod = Omit<Options, "method">;

export class HTTPTransport {
  private apiUrl: string = "";
  constructor(apiPath: string) {
    this.apiUrl = `https://ya-praktikum.tech/api/v2/${apiPath}`;
  }

  get<TResponse>(
    url: string,
    options: OptionsWithoutMethod = {},
  ): Promise<TResponse> {
    return this.request<TResponse>(`${this.apiUrl}${url}`, {
      ...options,
      method: METHOD.GET,
    });
  }

  post<TResponse>(
    url: string,
    options: OptionsWithoutMethod = {},
  ): Promise<TResponse> {
    return this.request<TResponse>(`${this.apiUrl}${url}`, {
      ...options,
      method: METHOD.POST,
    });
  }

  async request<TResponse>(
    url: string,
    options: Options = { method: METHOD.GET },
  ): Promise<TResponse> {
    const { method, data } = options;
    const response = await fetch(url, {
      method,
      credentials: "include",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: data ? JSON.stringify(data) : null,
    });

    if (!response.ok) {
      throw response;
    }

    const isJson = response.headers
      .get("content-type")
      ?.includes("application/json");
    const resultData = (await isJson) ? response.json() : null;

    return resultData as unknown as TResponse;
  }
}
