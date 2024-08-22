import {
  ActionType,
  ModalForm,
  PageContainer,
  ParamsType,
  ProDescriptions,
  ProDescriptionsItemProps,
  ProDescriptionsProps,
  ProFormInstance,
  ProTable,
  ProTableProps,
} from '@ant-design/pro-components';
import React, {
  Dispatch,
  MutableRefObject,
  ReactNode,
  SetStateAction,
  useRef,
  useState,
} from 'react';
import { Button, Drawer, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { SortOrder } from 'antd/lib/table/interface';
import { ProColumns } from '@ant-design/pro-table/es/typing';
import { toFormItems, toFormItems2 } from '@/utils/form';
import { ModalFormProps } from '@ant-design/pro-form/es/layouts/ModalForm';
import { API } from '@/services/ant-design-pro/typings';

const Crud = <
  DataType extends Record<string, any> & { id?: any },
  Query extends ParamsType = ParamsType,
>(props: {
  columns: (props: {
    setCurrentRow: Dispatch<SetStateAction<DataType | undefined>>;
    setOpenForm: Dispatch<SetStateAction<boolean>>;
    setShowDetail: Dispatch<SetStateAction<boolean>>;
    actionRef: MutableRefObject<ActionType | undefined>;
  }) => API.ProColumnsExtend<DataType>[];
  request: {
    list: (
      query: Record<string, any>,
      sort: Record<string, SortOrder>,
    ) => Promise<API.PageData<DataType[]>>;
    add?: (data: DataType, options?: { [key: string]: any }) => Promise<void>;
    edit?: (data: DataType, options?: { [key: string]: any }) => Promise<void>;
    // remove?: (id?: number, options?: { [key: string]: any }) => Promise<void>;
    detail?: (params: Record<string, any> | undefined) => Promise<DataType>;
  };
  tableProps?: (props: {
    setCurrentRow: Dispatch<SetStateAction<DataType | undefined>>;
    setOpenForm: Dispatch<SetStateAction<boolean>>;
    setShowDetail: Dispatch<SetStateAction<boolean>>;
    defaultAddButton: ReactNode;
  }) => ProTableProps<DataType, Query>;
  formProps?: ModalFormProps<DataType> & { formColNum?: number };
  descriptionsProps?: (d: DataType | undefined) => ProDescriptionsProps<DataType>;
}) => {
  const actionRef = useRef<ActionType>();
  const [loading] = useState<boolean>(false);
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<DataType>();
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const formRef = useRef<ProFormInstance>();
  const defaultAddButton = (
    <Button
      key={'add'}
      type="primary"
      onClick={() => {
        setCurrentRow(undefined);
        setOpenForm(true);
      }}
    >
      <PlusOutlined /> 新增
    </Button>
  );

  const _columns = props.columns({ setCurrentRow, setOpenForm, setShowDetail, actionRef });
  const tableProps = props.tableProps?.({
    setCurrentRow,
    setOpenForm,
    setShowDetail,
    defaultAddButton,
  });

  return (
    <PageContainer>
      <ProTable<DataType, Query>
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [props.request.add && defaultAddButton]}
        request={(params, sort, filter) => props.request.list({ ...params, ...filter }, sort)}
        columns={_columns as ProColumns<DataType>[]}
        {...tableProps}
      />
      <ModalForm
        open={openForm}
        onOpenChange={setOpenForm}
        formRef={formRef}
        title={currentRow?.id ? '编辑' : '新增'}
        width={props.formProps?.formColNum && props.formProps?.formColNum > 1 ? '700px' : '400px'}
        initialValues={currentRow}
        modalProps={{
          destroyOnClose: true,
          onCancel: () => {
            setOpenForm(false);
            setCurrentRow(void 0);
          },
          okButtonProps: {
            loading,
          },
        }}
        onFinish={async (value) => {
          const data = { ...value } as DataType;
          if (currentRow?.id) {
            await props.request.edit?.(data);
          } else {
            await props.request.add?.(data);
          }
          message.success(currentRow?.id ? '编辑成功' : '新增成功');
          setOpenForm(false);
          actionRef?.current?.reload();
          return true;
        }}
        {...props.formProps}
      >
        {props.formProps?.formColNum && props.formProps?.formColNum > 1
          ? toFormItems2(_columns, formRef)
          : toFormItems(_columns, formRef)}
      </ModalForm>
      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(void 0);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow && (
          <ProDescriptions<DataType>
            column={1}
            title={currentRow?.name}
            request={async (params) => ({
              data: props.request.detail ? await props.request.detail(params) : currentRow || {},
            })}
            params={{
              id: currentRow?.id,
            }}
            columns={_columns as ProDescriptionsItemProps<DataType>[]}
            {...props.descriptionsProps?.(currentRow)}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default Crud;
