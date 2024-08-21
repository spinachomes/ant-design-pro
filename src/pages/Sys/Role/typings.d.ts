// @ts-ignore
/* eslint-disable */
declare namespace Sys {
  type CampRole = API.BaseAuditForm & {
    name: string;
    sort: number;
    menuIds: number[];
    // appIds: number[];
  };
  type CampRoleQuery = API.BaseQuery & {
    name?: string;
  };
}
