import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";

export class ODataStore<T> {
  private _endpoint: string;
  private _uri: string
  private _http: HttpClient;
  private _odataPath = "odata/";

  constructor(config: ODataStoreConfig) {
    this._endpoint = config.endpoint;
    this._uri = environment.weatherApi + (environment.weatherApi.endsWith('/') ? "" : "/") + this._odataPath + this._endpoint;
    this._http = config.httpClient;
  }

  list(options?: ODataQueryOptions): Observable<ODataListResponse<T>> {
    const queryUri = this.buildQueryUri(options);

    const response = this._http.get<ODataGetResponse<T>>(this._uri + queryUri).pipe(map(payload => {
      if (payload)
        return {
          value: payload.value,
          count: + (payload['@odata.count'] ?? payload.value.length),
        }

      return { value: [], count: 0 }
    }));
    return response;
  }

  get(key: any, options?: ODataQueryOptions): Observable<T> {
    const queryUri = this.buildQueryUri(options);
    return this._http.get<T>(this._uri + `(${key})` + queryUri);
  }

  post(entity: T): Observable<T> {
    return this._http.post<T>(this._uri, entity);
  }

  private buildQueryUri(queryOptions: ODataQueryOptions | undefined) {
    let returnUri = "";
    if (queryOptions === undefined) {
      return returnUri;
    }

    if (queryOptions.top && queryOptions.top > 0) {
      if (returnUri.length > 0) {
        returnUri += '&';
      }

      queryOptions.count = true;

      returnUri += '$top=' + queryOptions.top;
    }

    if (queryOptions.skip && queryOptions.skip > 0) {
      if (returnUri.length > 0) {
        returnUri += '&';
      }

      queryOptions.count = true;

      returnUri += '$skip=' + queryOptions.skip;
    }

    if (queryOptions.count) {
      if (returnUri.length > 0) {
        returnUri += '&';
      }

      returnUri += '$count=true'
    }

    if(queryOptions.expand && queryOptions.expand.length > 0) {
      if (returnUri.length > 0) {
          returnUri += '&';
      }

      returnUri += '$expand=' + queryOptions.expand.join(',');
    }

    return returnUri.length > 0 ? `?${returnUri}` : returnUri;
  }
}

export interface ODataStoreConfig {
  endpoint: string
  key: string | string[]
  keyType: string | string[]
  httpClient: HttpClient
}

export interface ODataQueryOptions {
  skip?: number
  top?: number
  count?: boolean
  expand?: string[]
}

export interface ODataListResponse<T> {
  value: T[]
  count: number
}

export interface ODataGetResponse<T> {
  "@odata.context": string
  "@odata.count": string
  value: T[]
}