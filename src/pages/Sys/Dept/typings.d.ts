// @ts-ignore
/* eslint-disable */
declare namespace Sys {
  type CampDept = API.BaseForm & {
    code: string;
    name: string;
    children: CampDept[];
  };

  type CampDeptQuery = API.BaseQuery;
}
