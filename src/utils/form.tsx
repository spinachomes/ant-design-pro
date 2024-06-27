import {
  ProFormCheckbox,
  ProFormDatePicker,
  ProFormDateTimePicker,
  ProFormDigit,
  ProFormMoney,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormTreeSelect,
} from '@ant-design/pro-components';
import { ReactNode } from 'react';
import { Col, Row } from 'antd';
import { API } from '@/services/ant-design-pro/typings';

export function toFormItems(
  cols: API.ProColumnsExtend[],
  dictMap?: Record<string, any[]>,
): ReactNode[] {
  const nodes: ReactNode[] = [];
  cols.forEach((col) => {
    const valueType = col.valueType;
    const hideInForm = (col.hideInForm = col.hideInForm ?? false);
    if (!hideInForm && valueType !== 'option') {
      const required = col.required ? col.required : false;
      const label = col.label ? col.label : (col.title as ReactNode);
      const rules = required ? [{ required: required, message: col.title + '不能为空' }] : [];
      if (valueType === 'textarea') {
        nodes.push(
          <ProFormTextArea
            key={col.dataIndex}
            name={col.dataIndex}
            label={label}
            required={required}
            rules={rules}
          />,
        );
      } else if (valueType === 'date') {
        nodes.push(
          <ProFormDatePicker
            key={col.dataIndex}
            name={col.dataIndex}
            label={label}
            required={required}
            rules={rules}
          />,
        );
      } else if (valueType === 'dateTime') {
        nodes.push(
          <ProFormDateTimePicker
            key={col.dataIndex}
            name={col.dataIndex}
            label={label}
            required={required}
            rules={rules}
          />,
        );
      } else if (valueType === 'select') {
        nodes.push(
          <ProFormSelect
            key={col.dataIndex}
            name={col.dataIndex}
            label={label}
            required={required}
            rules={rules}
            options={dictMap?.[col.dataIndex]}
          />,
        );
      } else if (valueType === 'checkbox') {
        nodes.push(
          <ProFormCheckbox.Group
            key={col.dataIndex}
            name={col.dataIndex}
            label={label}
            required={required}
            rules={rules}
            options={dictMap?.[col.dataIndex]}
          />,
        );
      } else if (valueType === 'radio') {
        nodes.push(
          <ProFormRadio.Group
            key={col.dataIndex}
            name={col.dataIndex}
            label={label}
            required={required}
            rules={rules}
            options={dictMap?.[col.dataIndex]}
          />,
        );
      } else if (valueType === 'digit') {
        nodes.push(
          <ProFormDigit
            key={col.dataIndex}
            name={col.dataIndex}
            label={label}
            required={required}
            rules={rules}
          />,
        );
      } else if (valueType === 'treeSelect') {
        nodes.push(
          <ProFormTreeSelect
            key={col.dataIndex}
            name={col.dataIndex}
            label={label}
            required={required}
            rules={rules}
          />,
        );
      } else if (valueType === 'money') {
        nodes.push(
          <ProFormMoney
            key={col.dataIndex}
            name={col.dataIndex}
            label={label}
            required={required}
            rules={rules}
          />,
        );
      } else {
        nodes.push(
          <ProFormText
            key={col.dataIndex}
            name={col.dataIndex}
            label={label}
            required={required}
            rules={rules}
          />,
        );
      }
    }
  });
  return nodes;
}

export function toFormItems2(cols: API.ProColumnsExtend[], dictMap?: Record<string, any[]>) {
  return (
    <Row key={'row'} gutter={24}>
      {cols.map((col) => {
        const label = col.label ? col.label : (col.title as ReactNode);
        const valueType = col.valueType;
        const hideInForm = (col.hideInForm = col.hideInForm ?? false);
        if (!hideInForm && valueType !== 'option') {
          const required = col.required ? col.required : false;
          const rules = required ? [{ required: required, message: label + '不能为空' }] : [];
          if (valueType === 'textarea') {
            return (
              <Col span={12} key={col.dataIndex + '_col'}>
                <ProFormTextArea
                  key={col.dataIndex}
                  name={col.dataIndex}
                  label={label}
                  required={required}
                  rules={rules}
                />
              </Col>
            );
          } else if (valueType === 'date') {
            return (
              <Col span={12} key={col.dataIndex + '_col'}>
                <ProFormDatePicker
                  key={col.dataIndex}
                  name={col.dataIndex}
                  label={label}
                  required={required}
                  rules={rules}
                />
              </Col>
            );
          } else if (valueType === 'dateTime') {
            return (
              <Col span={12} key={col.dataIndex + '_col'}>
                <ProFormDateTimePicker
                  key={col.dataIndex}
                  name={col.dataIndex}
                  label={label}
                  required={required}
                  rules={rules}
                />
              </Col>
            );
          } else if (valueType === 'select') {
            return (
              <Col span={12} key={col.dataIndex + '_col'}>
                <ProFormSelect
                  key={col.dataIndex}
                  name={col.dataIndex}
                  label={label}
                  required={required}
                  rules={rules}
                  options={dictMap?.[col.dataIndex]}
                />
              </Col>
            );
          } else if (valueType === 'checkbox') {
            return (
              <Col span={12} key={col.dataIndex + '_col'}>
                <ProFormCheckbox.Group
                  key={col.dataIndex}
                  name={col.dataIndex}
                  label={label}
                  required={required}
                  rules={rules}
                  options={dictMap?.[col.dataIndex]}
                />
              </Col>
            );
          } else if (valueType === 'radio') {
            return (
              <Col span={12} key={col.dataIndex + '_col'}>
                <ProFormRadio.Group
                  key={col.dataIndex}
                  name={col.dataIndex}
                  label={label}
                  required={required}
                  rules={rules}
                  options={dictMap?.[col.dataIndex]}
                />
              </Col>
            );
          } else if (valueType === 'digit') {
            return (
              <Col span={12} key={col.dataIndex + '_col'}>
                <ProFormDigit
                  key={col.dataIndex}
                  name={col.dataIndex}
                  label={label}
                  required={required}
                  rules={rules}
                />
              </Col>
            );
          } else if (valueType === 'treeSelect') {
            return (
              <Col span={12} key={col.dataIndex + '_col'}>
                <ProFormTreeSelect
                  key={col.dataIndex}
                  name={col.dataIndex}
                  label={label}
                  required={required}
                  rules={rules}
                />
              </Col>
            );
          } else if (valueType === 'money') {
            return (
              <Col span={12} key={col.dataIndex + '_col'}>
                <ProFormMoney
                  key={col.dataIndex}
                  name={col.dataIndex}
                  label={label}
                  required={required}
                  rules={rules}
                />
              </Col>
            );
          } else {
            return (
              <Col span={12} key={col.dataIndex + '_col'}>
                <ProFormText
                  key={col.dataIndex}
                  name={col.dataIndex}
                  label={label}
                  required={required}
                  rules={rules}
                />
              </Col>
            );
          }
        }
        return null;
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
