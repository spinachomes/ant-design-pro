import React from 'react';
import { detail, list } from './api';
import { Access, useAccess } from 'umi';
import { Crud } from '@/components';

const TableList: React.FC = () => {
  const access = useAccess();

  return (
    <Crud
      columns={({ setCurrentRow, setShowDetail }) => {
        return [
          {
            title: '关键词',
            tooltip: '可输入操作人姓名、操作模块或操作名称',
            dataIndex: 'name',
            hideInTable: true,
            hideInSetting: true,
            hideInForm: true,
            hideInDescriptions: true,
          },
          {
            title: '操作日期',
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
            title: '操作人',
            dataIndex: 'userName',
            hideInSearch: true,
          },
          {
            title: '操作时间',
            dataIndex: 'operateDate',
            valueType: 'dateTime',
            hideInSearch: true,
          },
          {
            title: '来源系统',
            dataIndex: 'clientId',
            hideInSearch: true,
            width: 80,
            render(col) {
              return col === 'camp-wx' ? '小程序' : col === 'camp-pc' ? 'PC端' : col;
            },
          },
          {
            title: '客户端IP',
            dataIndex: 'ip',
            width: 120,
            hideInSearch: true,
          },
          {
            title: '设备信息',
            dataIndex: 'operationSystem',
            hideInSearch: true,
          },
          {
            title: '操作模块',
            dataIndex: 'module',
            hideInSearch: true,
          },
          {
            title: '操作名称',
            dataIndex: 'operationName',
            width: 120,
            hideInSearch: true,
          },
          {
            title: '是否成功',
            dataIndex: 'success',
            hideInSearch: true,
            width: 80,
            render(col) {
              return col ? '成功' : '失败';
            },
          },
          {
            title: '请求地址',
            dataIndex: 'url',
            hideInSearch: true,
            hideInTable: true,
          },
          {
            title: '请求方法',
            dataIndex: 'method',
            hideInSearch: true,
            hideInTable: true,
          },
          {
            title: '请求耗时',
            tooltip: '单位毫秒',
            dataIndex: 'timeConsume',
            valueType: 'digit',
            hideInSearch: true,
            hideInTable: true,
          },
          {
            title: '请求参数',
            dataIndex: 'requestParam',
            hideInSearch: true,
            hideInTable: true,
          },
          {
            title: '请求体',
            dataIndex: 'requestBody',
            valueType: 'textarea',
            hideInSearch: true,
            hideInTable: true,
          },
          {
            title: '响应体',
            dataIndex: 'responseBody',
            valueType: 'textarea',
            hideInSearch: true,
            hideInTable: true,
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
              <Access accessible={access['sys-operationLog:detail'] ?? false} key={'detail'}>
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
