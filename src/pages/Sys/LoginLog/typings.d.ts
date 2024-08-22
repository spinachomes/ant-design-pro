// @ts-ignore
/* eslint-disable */
declare namespace Sys {
  type LoginLog = API.BaseLogForm & {
    type: string;
  };
  type LoginLogQuery = API.BaseQuery & {
    userId?: number;
    operateDateStart?: string;
    operateDateEnd?: string;
  };
}
