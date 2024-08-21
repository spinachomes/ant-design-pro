import {
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormDateTimePicker,
  ProFormDigit,
  ProFormInstance,
  ProFormMoney,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormTreeSelect,
} from '@ant-design/pro-components';
import { MutableRefObject, ReactNode } from 'react';
import { Col, Row } from 'antd';
import { API } from '@/services/ant-design-pro/typings';

export function toFormItems(
  cols: API.ProColumnsExtend[],
  formRef?: MutableRefObject<ProFormInstance | undefined>,
  dictMap?: Record<string, any[]>,
): ReactNode[] {
  const nodes: ReactNode[] = [];
  for (let col of cols) {
    const customFormItem = col.customFormItem;
    if (customFormItem) {
      if (typeof customFormItem === 'function') {
        nodes.push(customFormItem(formRef));
      } else {
        nodes.push(customFormItem);
      }
      continue;
    }
    const valueType = col.valueType;
    const hideInForm = (col.hideInForm = col.hideInForm ?? false);
    const disabled = (col.disabled = col.disabled ?? false);
    const isPrimaryKey = (col.isPrimaryKey = col.isPrimaryKey ?? false);
    if ((!hideInForm || isPrimaryKey) && valueType !== 'option') {
      const required = col.required ? col.required : false;
      const label = col.label ? col.label : (col.title as ReactNode);
      const rules =
        col.rules && col.rules.length > 0
          ? col.rules
          : required
          ? [
              {
                required: required,
                message: label + '不能为空',
              },
            ]
          : [];
      const name = col.name || col.dataIndex;
      if (valueType === 'textarea') {
        nodes.push(
          <ProFormTextArea
            key={col.key || name}
            name={name}
            label={label}
            required={required}
            rules={rules}
            disabled={disabled}
          />,
        );
      } else if (valueType === 'date') {
        nodes.push(
          <ProFormDatePicker
            key={col.key || name}
            name={name}
            label={label}
            required={required}
            rules={rules}
            disabled={disabled}
          />,
        );
      } else if (valueType === 'dateTime') {
        nodes.push(
          <ProFormDateTimePicker
            key={col.key || name}
            name={name}
            label={label}
            required={required}
            rules={rules}
            disabled={disabled}
          />,
        );
      } else if (valueType === 'select') {
        nodes.push(
          <ProFormSelect
            key={col.key || name}
            name={name}
            label={label}
            required={required}
            rules={rules}
            disabled={disabled}
            options={dictMap?.[col.dataIndex]}
          />,
        );
      } else if (valueType === 'checkbox') {
        nodes.push(
          <ProFormCheckbox.Group
            key={col.key || name}
            name={name}
            label={label}
            required={required}
            rules={rules}
            disabled={disabled}
            options={dictMap?.[col.dataIndex]}
          />,
        );
      } else if (valueType === 'radio') {
        nodes.push(
          <ProFormRadio.Group
            key={col.key || name}
            name={name}
            label={label}
            required={required}
            rules={rules}
            disabled={disabled}
            options={dictMap?.[col.dataIndex]}
          />,
        );
      } else if (valueType === 'digit') {
        nodes.push(
          <ProFormDigit
            key={col.key || name}
            name={name}
            label={label}
            required={required}
            rules={rules}
            disabled={disabled}
          />,
        );
      } else if (valueType === 'treeSelect') {
        nodes.push(
          <ProFormTreeSelect
            key={col.key || name}
            name={name}
            label={label}
            required={required}
            rules={rules}
            disabled={disabled}
          />,
        );
      } else if (valueType === 'money') {
        nodes.push(
          <ProFormMoney
            key={col.key || name}
            name={name}
            label={label}
            required={required}
            rules={rules}
            disabled={disabled}
          />,
        );
      } else {
        nodes.push(
          <ProFormText
            key={col.key || name}
            hidden={isPrimaryKey}
            name={name}
            label={label}
            required={required}
            rules={rules}
            disabled={disabled}
          />,
        );
      }
    }
  }
  return nodes;
}

export function toFormItems2(
  cols: API.ProColumnsExtend[],
  formRef?: MutableRefObject<ProFormInstance | undefined>,
  dictMap?: Record<string, any[]>,
) {
  const formItems = toFormItems(cols, formRef, dictMap);
  return (
    <Row key={'row'} gutter={24}>
      {formItems.map((item, index) => {
        return (
          <Col span={12} key={index + '_col'}>
            {item}
          </Col>
        );
      })}
    </Row>
  );
}

const hexDigits = '0123456789abcdef';

export function UUID() {
  const s = [];
  for (let i = 0; i < 36; i++) {
    const start = Math.floor(Math.random() * 0x10);
    s[i] = hexDigits.substring(start, start + 1);
  }
  s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
  // @ts-ignore
  const start1 = (s[19] & 0x3) | 0x8;
  s[19] = hexDigits.substring(start1, start1 + 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-';
  return s.join('');
}
