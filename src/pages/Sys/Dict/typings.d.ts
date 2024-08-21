// @ts-ignore
/* eslint-disable */
declare namespace Sys {
  type CampDictType = API.BaseForm & {
    name: string;
    type: string;
    remark: string;
    createdDate: Date;
    lastModifiedDate: Date;
  };
  type CampDictTypeQuery = API.BaseQuery & {
    dictType?: string;
    dictName?: string;
  };

  type CampDictData = API.BaseForm & {
    code: string;
    value: string;
    dictType: string;
    sort: number;
    remark: string;
    createdDate: Date;
    lastModifiedDate: Date;
  };

  type CampDictDataQuery = API.BaseQuery & {
    dictType?: string;
    value?: string;
    t?: number;
  };
}
