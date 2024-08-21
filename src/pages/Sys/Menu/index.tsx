import {
  ActionType,
  ModalForm,
  PageContainer,
  ProDescriptions,
  ProDescriptionsItemProps,
  ProFormCheckbox,
  ProFormDependency,
  ProFormDigit,
  ProFormInstance,
  ProFormRadio,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Drawer, message, Popconfirm } from 'antd';
import React, { useRef, useState } from 'react';
import { add, edit, list, remove } from './api';
import { PlusOutlined } from '@ant-design/icons';
import { Access, useAccess } from 'umi';
import { API } from '@/services/ant-design-pro/typings';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [loading] = useState<boolean>(false);
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<Sys.CampMenu>();
  const [parentRow, setParentRow] = useState<Sys.CampMenu>();
  const formRef = useRef<ProFormInstance>();
  const access = useAccess();
  const menuTypeOptions = [
    { label: '目录', value: 'd' },
    { label: '菜单', value: 'm' },
    { label: '按钮', value: 'b' },
  ];

  const columns: API.ProColumnsExtend<Sys.CampMenu>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      hideInSearch: true,
      required: true,
      // render: (dom, entity) => {
      //   return (
      //     <a
      //       onClick={() => {
      //         setCurrentRow(entity);
      //         setShowDetail(true);
      //       }}
      //     >
      //       {dom}
      //     </a>
      //   );
      // },
    },
    {
      title: '类型',
      dataIndex: 'menuType',
      hideInSearch: true,
      required: true,
      valueType: 'radio',
      fieldProps: {
        options: menuTypeOptions,
      },
    },
    {
      title: '权限标识',
      dataIndex: 'perms',
      ellipsis: true,
      hideInSearch: true,
      required: true,
      copyable: true,
    },
    {
      title: '菜单路径/接口地址',
      dataIndex: 'url',
      ellipsis: true,
      copyable: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <Access accessible={access['sys-menu:edit'] ?? false} key={'editAccess'}>
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
        <Access accessible={access['sys-menu:add'] ?? false} key={'addAccess1'}>
          <a
            key={'add1'}
            type="text"
            onClick={() => {
              setParentRow(record);
              setOpenForm(true);
            }}
          >
            添加节点
          </a>
        </Access>,
        <Access accessible={access['sys-menu:delete'] ?? false} key={'deleteAccess'}>
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

  return (
    <PageContainer>
      <ProTable<Sys.CampMenu, Sys.CampMenuQuery>
        actionRef={actionRef}
        rowKey="id"
        search={false}
        pagination={false}
        toolBarRender={() => [
          <Access accessible={access['sys-menu:add'] ?? false} key={'addAccess'}>
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
        formRef={formRef}
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
          const data = value as Sys.CampMenu;
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
        <ProFormDigit name="parentId" hidden={true} initialValue={parentRow?.id}></ProFormDigit>
        <ProFormText name="name" label={'名称'} rules={[{ required: true }]}></ProFormText>
        <ProFormText
          name="parentName"
          label={'父节点'}
          readonly
          hidden={!parentRow}
          initialValue={parentRow?.name}
        ></ProFormText>
        <ProFormRadio.Group
          name="menuType"
          label={'类型'}
          rules={[{ required: true }]}
          options={menuTypeOptions}
          initialValue={'d'}
        ></ProFormRadio.Group>
        <ProFormText name="perms" label={'权限标识'} rules={[{ required: true }]}></ProFormText>
        <ProFormDependency name={['menuType']}>
          {({ menuType }) => {
            if (menuType === 'b') {
              return (
                <>
                  <ProFormText name="url" label={'接口地址'}></ProFormText>
                  <ProFormCheckbox
                    name="intercepted"
                    label={'是否拦截'}
                    initialValue={true}
                  ></ProFormCheckbox>
                </>
              );
            }
            return (
              <>
                <ProFormText name="url" label={'菜单路径'}></ProFormText>
              </>
            );
          }}
        </ProFormDependency>
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
          <ProDescriptions<Sys.CampMenu>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<Sys.CampMenu>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};
export default TableList;
