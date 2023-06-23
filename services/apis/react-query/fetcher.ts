export const fetcher = ({
  method,
  headers,
  body,
  url = '',
}: {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: HeadersInit;
  body?: BodyInit | null;
  url?: string;
}) => {
  return async () => {
    const allHeaders: Record<string, string> = {};

    allHeaders['Content-Type'] = `application/json`;

    if (headers) {
      //@ts-ignore
      for (const [k, v] of headers.entries()) {
        allHeaders[k] = v;
      }
    }

    const res = await fetch(`${url}`, {
      method,
      headers: allHeaders,
      body,
    });

    const json = await res.json();

    if (json.success === false) {
      const { message } = json || 'Error..';

      throw new Error(message);
    }

    return json.data;
  };
};
