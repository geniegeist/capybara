export interface HttpClient {
  get: <T>(...args: any) => Promise<T>;
}

export interface HttpClientFactory {
  create: () => HttpClient;
}
