import type { ActionType, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  ModalForm,
  PageContainer,
  ProDescriptions,
  ProFormDigit,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Drawer, message, Modal, Popconfirm } from 'antd';
import React, { useRef, useState } from 'react';
import {
  add,
  addDictData,
  edit,
  editDictData,
  list,
  listDictData,
  remove,
  removeDictData,
} from './api';
import { toFormItems } from '@/utils/form';
import { PlusOutlined } from '@ant-design/icons';
import { Access, useAccess } from 'umi';
import { API } from '@/services/ant-design-pro/typings';

const TableList: React.FC = () => {
  const [loading] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<Sys.CampDictType>();
  const [openDictDataForm, setOpenDictDataForm] = useState<boolean>(false);
  const [openDictDataModal, setOpenDictDataModal] = useState<boolean>(false);
  const [currentDictData, setCurrentDictData] = useState<Sys.CampDictType>();
  const dictDataActionRef = useRef<ActionType>();
  const access = useAccess();

  const columns: API.ProColumnsExtend<Sys.CampDictType>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      required: true,
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
      title: '类型',
      dataIndex: 'type',
      required: true,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      ellipsis: true,
      hideInSearch: true,
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
        <Access accessible={access['sys-dict:edit'] ?? false} key={'editAccess'}>
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
        <Access accessible={access['sys-dict:edit'] ?? false} key={'editAccess1'}>
          <a
            key={'edit1'}
            type="text"
            onClick={() => {
              setCurrentRow(record);
              setOpenDictDataModal(true);
            }}
          >
            字典数据
          </a>
        </Access>,
        <Access accessible={access['sys-dict:delete'] ?? false} key={'deleteAccess'}>
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

  const dictDataColumns: API.ProColumnsExtend<Sys.CampDictData>[] = [
    {
      title: '字典代码',
      dataIndex: 'code',
      required: true,
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
      title: '字典键值',
      dataIndex: 'value',
      required: true,
    },
    {
      title: '字典类型',
      dataIndex: 'dictType',
      hideInTable: true,
      disabled: true,
    },
    {
      title: '字典排序',
      dataIndex: 'sort',
      valueType: 'digit',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      ellipsis: true,
      valueType: 'textarea',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <Access accessible={access['sys-dict:edit'] ?? false} key={'editAccess1'}>
          <a
            key={'editDict'}
            type="text"
            onClick={() => {
              setCurrentDictData(record);
              setOpenDictDataForm(true);
            }}
          >
            编辑
          </a>
        </Access>,
        <Access accessible={access['sys-dict:delete'] ?? false} key={'deleteAccess1'}>
          <Popconfirm
            key={'deleteDict'}
            title="是否确定删除该数据?"
            onConfirm={async () => {
              await removeDictData(record.id);
              message.success('删除成功');
              dictDataActionRef.current?.reload();
            }}
          >
            <a type="text">删除</a>
          </Popconfirm>
        </Access>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<Sys.CampDictType, Sys.CampDictTypeQuery>
        // headerTitle={'查询表格'}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Access accessible={access['sys-dict:add'] ?? false} key={'addAccess'}>
            <Button
              type="primary"
              key="add"
              onClick={() => {
                setCurrentRow(undefined);
                setOpenForm(true);
              }}
            >
              <PlusOutlined /> 新增
            </Button>
          </Access>,
        ]}
        request={(params, sort, filter) => list({ ...params, ...filter }, sort)}
        columns={columns}
      />
      <ModalForm
        open={openForm}
        onOpenChange={setOpenForm}
        title={currentRow?.id ? '编辑' : '新增'}
        width="400px"
        initialValues={currentRow}
        modalProps={{
          destroyOnClose: true,
          onCancel: () => {
            setOpenForm(false);
          },
          okButtonProps: {
            loading,
          },
        }}
        onFinish={async (value) => {
          const data = value as Sys.CampDictType;
          if (currentRow?.id) {
            await edit(data);
          } else {
            await add(data);
          }
          message.success(currentRow?.id ? '编辑成功' : '新增成功');
          setOpenForm(false);
          actionRef?.current?.reload();
          return true;
        }}
      >
        <ProFormDigit name="id" hidden={true}></ProFormDigit>
        {toFormItems(columns)}
      </ModalForm>
      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<Sys.CampDictType>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<Sys.CampDictType>[]}
          />
        )}
      </Drawer>
      <Modal
        open={openDictDataModal}
        onClose={() => setOpenDictDataModal(false)}
        width="60%"
        onCancel={() => setOpenDictDataModal(false)}
        destroyOnClose={true}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
        title={currentRow?.name}
      >
        <ProTable<Sys.CampDictData, Sys.CampDictDataQuery>
          actionRef={dictDataActionRef}
          rowKey="id"
          search={false}
          toolBarRender={() => [
            <Access accessible={access['sys-dict:add'] ?? false} key={'addAccess'}>
              <Button
                type="primary"
                key="addDict"
                onClick={() => {
                  setCurrentDictData(undefined);
                  setOpenDictDataForm(true);
                }}
              >
                <PlusOutlined /> 新增
              </Button>
            </Access>,
          ]}
          request={(params, sort, filter) =>
            listDictData({ ...params, ...filter, dictType: currentRow?.type }, sort)
          }
          columns={dictDataColumns}
        />
        <ModalForm
          open={openDictDataForm}
          onOpenChange={setOpenDictDataForm}
          title={currentDictData?.id ? '编辑数据' : '新增数据'}
          width="400px"
          initialValues={currentDictData}
          modalProps={{
            destroyOnClose: true,
            onCancel: () => {
              setOpenDictDataForm(false);
            },
            okButtonProps: {
              loading,
            },
          }}
          onFinish={async (value) => {
            const data = value as Sys.CampDictData;
            if (currentDictData?.id) {
              await editDictData(data);
            } else {
              await addDictData(data);
            }
            message.success(currentDictData?.id ? '编辑成功' : '新增成功');
            setOpenDictDataForm(false);
            dictDataActionRef?.current?.reload();
            return true;
          }}
        >
          <ProFormDigit name="id" hidden={true}></ProFormDigit>
          <ProFormDigit
            name="dictType"
            hidden={true}
            initialValue={currentRow?.type}
          ></ProFormDigit>
          {toFormItems(dictDataColumns)}
        </ModalForm>
      </Modal>
    </PageContainer>
  );
};
export default TableList;
