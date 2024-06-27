import { addRule, rule } from '@/services/ant-design-pro/api';
import '@umijs/max';
import React from 'react';
import Crud from '@/components/Crud';
import { API } from '@/services/ant-design-pro/typings';

const TableList: React.FC = () => {
  return Crud<API.RuleListItem>({
    request: { list: rule, add: addRule },
    formProps: { formColNum: 2 },
    descriptionsProps: (item) => {
      return { title: item?.name };
    },
    columns: (setCurrentRow, setOpenForm, setShowDetail) => {
      return [
        {
          title: '规则名称',
          dataIndex: 'name',
          tip: 'The rule name is the unique key',
          render: (dom, entity) => {
            return (
              <a
                onClick={() => {
                  setCurrentRow(entity);
                  setShowDetail(true);
                }}
              >
                {dom}
              </a>
            );
          },
        },
        {
          title: '描述',
          dataIndex: 'desc',
          valueType: 'textarea',
        },
        {
          title: '服务调用次数',
          dataIndex: 'callNo',
          sorter: true,
          hideInForm: true,
          renderText: (val: string) => `${val}${'万'}`,
        },
        {
          title: '状态',
          dataIndex: 'status',
          hideInForm: true,
          valueEnum: {
            0: {
              text: '关闭',
              status: 'Default',
            },
            1: {
              text: '运行中',
              status: 'Processing',
            },
            2: {
              text: '已上线',
              status: 'Success',
            },
            3: {
              text: '异常',
              status: 'Error',
            },
          },
        },
        {
          title: '操作',
          dataIndex: 'option',
          valueType: 'option',
          render: (_, record) => [
            <a
              key="config"
              onClick={() => {
                setOpenForm(true);
                setCurrentRow(record);
              }}
            >
              配置
            </a>,
            <a key="subscribeAlert" href="https://procomponents.ant.design/">
              订阅警报
            </a>,
          ],
        },
      ];
    },
  });
};
export default TableList;
