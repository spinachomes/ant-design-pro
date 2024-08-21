// @ts-ignore
/* eslint-disable */
import { ParamsType, ProColumns, ProFormInstance } from '@ant-design/pro-components';
import { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import { FieldProps } from 'rc-field-form/lib/Field';
import { FormItemProps } from 'antd/es/form/FormItem';
import { ReactNode } from 'react';

declare namespace API {
  type ProColumnsExtend<T = any, ValueType = 'text'> = ProColumns<T, ValueType> &
    ProDescriptionsItemProps<T, ValueType> &
    FieldProps<T> &
    FormItemProps<T> & {
      customFormItem?: (
        formRef: MutableRefObject<ProFormInstance | undefined>,
      ) => ReactNode | ReactNode;
    };
  type PageData<T> = {
    list?: T[];
    success?: boolean;
    total?: number;
  };
  type BaseQuery = ParamsType & {
    pageSize?: number;
    pageNum?: number;
    t?: number;
  };
  type BaseForm = {
    id: number;
    version: number;
  };
  type BaseCreateAuditForm = API.BaseForm & {
    createdBy: number;
    createdDate: Date;
  };
  type BaseAuditForm = API.BaseForm & {
    createdBy: number;
    createdDate: Date;
    lastModifiedDate: Date;
    lastModifiedBy: number;
  };
  type Option<T> = {
    value: T;
    label: string;
    children: Option<T>;
  };
  type CurrentUser = {
    name?: string;
    avatar?: string;
    userid?: string;
    email?: string;
    signature?: string;
    title?: string;
    group?: string;
    tags?: { key?: string; label?: string }[];
    notifyCount?: number;
    unreadCount?: number;
    country?: string;
    access?: string;
    geographic?: {
      province?: { label?: string; key?: string };
      city?: { label?: string; key?: string };
    };
    address?: string;
    phone?: string;
  };

  type LoginResult = {
    status?: string;
    type?: string;
    currentAuthority?: string;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    id?: number;
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
