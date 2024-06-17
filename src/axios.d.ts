// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AxiosRequestConfig } from 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    isPageRequest?: boolean;
    // [自定义属性声明]
  }
}
