import React, { useEffect, useState } from 'react';
import Crud from '../../../components/Crud';
import { list, add, edit, detail, remove } from './api';
import { map as getUserMap } from '../../Person/User/api';
import { useAccess, Access } from 'umi';
import { message, Popconfirm } from 'antd';

const TableList: React.FC = () => {
  const access = useAccess();
  const [userMap, setUserMap] = useState<Record<number, string>>({});
  const [userIds, setUserIds] = useState<number[]>([]);

  useEffect(() => {
    getUserMap(userIds).then((res) => setUserMap(res));
  }, [userIds]);

  return Crud<Sys.CampRole>({
    request: { list: list, add: add, edit: edit, detail: detail },
    tableProps: () => {
      return {
        postData: (data: Sys.CampRole[]) => {
          const _userIds = data.map((item) => item.createdBy);
          if (!_userIds.every((value) => userIds.includes(value))) {
            setUserIds(_userIds);
          }
          return data;
        },
      };
    },
    descriptionsProps: (item) => {
      return { title: item?.name };
    },
    columns: ({ setCurrentRow, setOpenForm, setShowDetail, actionRef }) => {
      return [
        {
          title: '角色ID',
          dataIndex: 'id',
          hideInSearch: true,
          hideInForm: true,
          isPrimaryKey: true,
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
          title: '角色名称',
          dataIndex: 'name',
          required: true,
        },
        {
          title: '创建人',
          dataIndex: 'createdBy',
          hideInForm: true,
          hideInSearch: true,
          renderText: (val: number) => userMap[val],
        },
        {
          title: '创建时间',
          sorter: true,
          hideInSearch: true,
          hideInForm: true,
          dataIndex: 'createdDate',
          valueType: 'dateTime',
        },
        {
          title: '更新时间',
          sorter: true,
          hideInSearch: true,
          hideInForm: true,
          dataIndex: 'lastModifiedDate',
          valueType: 'dateTime',
        },
        {
          title: '操作',
          dataIndex: 'option',
          valueType: 'option',
          render: (_, record) => [
            <Access accessible={access['sys-role:edit'] ?? false} key={'editAccess'}>
              <a
                key={'edit'}
                type="text"
                onClick={() => {
                  setCurrentRow(record);
                  setOpenForm(true);
                }}
              >
                编辑
              </a>
            </Access>,
            <Access accessible={access['sys-role:delete'] ?? false} key={'deleteAccess'}>
              <Popconfirm
                key={'delete'}
                title="是否确定删除该数据?"
                onConfirm={async () => {
                  await remove(record.id);
                  message.success('删除成功');
                  actionRef.current?.reload();
                }}
              >
                <a type="text">删除</a>
              </Popconfirm>
            </Access>,
          ],
        },
      ];
    },
  });
  // const actionRef = useRef<ActionType>();
  // const [showDetail, setShowDetail] = useState<boolean>(false);
  // const [loading] = useState<boolean>(false);
  // const [openForm, setOpenForm] = useState<boolean>(false);
  // const [currentRow, setCurrentRow] = useState<Sys.CampRole>();
  // const [userIds, setUserIds] = useState<number[]>([]);
  // const [userMap, setUserMap] = useState<Record<number, string>>({});
  // const access = useAccess();
  //
  // useEffect(() => {
  //   getUserMap(userIds).then(res => setUserMap(res))
  // }, [userIds])
};
export default TableList;
