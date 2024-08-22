import React, { useEffect, useState } from 'react';
import { detail, list } from './api';
import { dictOptions } from '../Dict/api';
import { Access, useAccess } from 'umi';
import { API } from '@/services/ant-design-pro/typings';
import Crud from '@/components/Crud';

const TableList: React.FC = () => {
  const [optionMap, setOptionMap] = useState<API.OptionMap>();
  const access = useAccess();

  useEffect(() => {
    dictOptions(['login_type']).then((res) => setOptionMap(res));
  }, []);

  return (
    <Crud
      columns={({ setCurrentRow, setShowDetail }) => {
        return [
          {
            title: '登录用户',
            tooltip: '可输入用户姓名或账号',
            dataIndex: 'userName',
            hideInTable: true,
            hideInSetting: true,
            hideInForm: true,
            hideInDescriptions: true,
          },
          {
            title: '登录日期',
            dataIndex: 'operateDateRange',
            hideInTable: true,
            hideInSetting: true,
            hideInForm: true,
            hideInDescriptions: true,
            valueType: 'dateRange',
          },
          {
            title: '日志ID',
            dataIndex: 'id',
            hideInSearch: true,
            hideInTable: true,
          },
          {
            title: '登录用户',
            dataIndex: 'userName',
            hideInSearch: true,
          },
          {
            title: '登录时间',
            dataIndex: 'operateDate',
            valueType: 'dateTime',
            hideInSearch: true,
          },
          {
            title: '类型',
            dataIndex: 'type',
            valueType: 'radio',
            hideInSearch: true,
            fieldProps: {
              options: optionMap?.['login_type'],
            },
          },
          {
            title: '是否成功',
            dataIndex: 'success',
            hideInSearch: true,
            renderText(col) {
              return col ? '成功' : '失败';
            },
          },
          {
            title: '登录系统',
            dataIndex: 'clientId',
            hideInSearch: true,
            renderText(col) {
              return col === 'camp-wx' ? '小程序' : col === 'camp-pc' ? 'PC端' : col;
            },
          },
          {
            title: '客户端IP',
            dataIndex: 'ip',
            hideInSearch: true,
          },
          {
            title: '设备信息',
            dataIndex: 'operationSystem',
            hideInSearch: true,
          },
          {
            title: '错误信息',
            dataIndex: 'errorMsg',
            hideInSearch: true,
            hideInTable: true,
          },
          {
            title: '异常信息',
            dataIndex: 'exception',
            valueType: 'textarea',
            hideInSearch: true,
            hideInTable: true,
          },
          {
            title: '操作',
            dataIndex: 'option',
            valueType: 'option',
            render: (_, record) => [
              <Access accessible={access['sys-loginLog:detail'] ?? false} key={'detail'}>
                <a
                  key={'detail'}
                  type="text"
                  onClick={() => {
                    setCurrentRow(record);
                    setShowDetail(true);
                  }}
                >
                  查看
                </a>
              </Access>,
            ],
          },
        ];
      }}
      request={{ list: list, detail: detail }}
    />
  );
};
export default TableList;
