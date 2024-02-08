import constants from "../constants";

export enum METHOD {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
};

type Options = {
    method: METHOD;
    data?: any;
};

type OptionsWithoutMethod = Omit<Options, 'method'>;
function queryString(data: Record<string | number, string | number | undefined>) {
    return Object.entries(data)
      .filter((entry): entry is [ string, string | number ] => entry[1] != undefined)
      .map(([ name, value ]) => `${encodeURIComponent(name)}=${encodeURIComponent(value)}`)
      .join('&');
  }

export class HTTPTransport {
    private apiUrl: string = ''
    constructor(apiPath: string) {
        this.apiUrl = `${constants.HOST}${apiPath}`;
    }

    get<TResponse>(url: string, options: OptionsWithoutMethod = {}): Promise<TResponse> {
        const {data} = options;
        if (data && Object.keys(data).length) {
            const queryPart = queryString(data);
            if (queryPart) {
                url += '?' + queryPart;
            }
          }
        return this.request<TResponse>(`${this.apiUrl}${url}`, {...options, method: METHOD.GET});
    };

    post<TResponse>(url: string, options: OptionsWithoutMethod = {}): Promise<TResponse> {
        return this.request<TResponse>(`${this.apiUrl}${url}`, {...options, method: METHOD.POST});
    };

    async request<TResponse>(url: string, options: Options = { method: METHOD.GET }): Promise<TResponse> {
        const {method, data} = options;

        const response = await fetch(url, {
            method,
            credentials: 'include',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: data && method !== METHOD.GET ? JSON.stringify(data) : null,
        });
        
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const resultData = await isJson ? response.json() : null

        return resultData as unknown as TResponse;
    };
}