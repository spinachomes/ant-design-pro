// @ts-ignore
/* eslint-disable */
declare namespace Sys {
  type CampMenu = API.BaseAuditForm & {
    name: string;
    parentId: number;
    menuType: string;
    perms: string;
    url: string;
    intercepted?: boolean;
    children: CampMenu[];
    parentName?: string;
  };
  type CampMenuQuery = API.BaseQuery;
}
