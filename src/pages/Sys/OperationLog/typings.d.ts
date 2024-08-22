// @ts-ignore
/* eslint-disable */
declare namespace Sys {
  type OperationLog = API.BaseLogForm & {
    timeConsume: number;
    userName: string;
    module: string;
    operationName: string;
    method: string;
    url: string;
    requestParam: string;
    requestBody: string;
    responseBody: string;
  };
  type OperationLogQuery = API.BaseQuery & {
    userId?: number;
    operateDateStart?: string;
    operateDateEnd?: string;
  };
}
