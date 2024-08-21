import React, { useEffect, useState } from 'react';
import styles from './style/index.module.less';
import { Button, Flex, Form, Image, message } from 'antd';
import { CodeOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { getCode as getCodeInfo, login as loginApi } from './api';
import { ProFormText } from '@ant-design/pro-components';
import { Login } from '@/pages/User/Login/typings';

export default function LoginForm() {
  const [form] = Form.useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [codeInfo, setCodeInfo] = useState<Login.CodeInfo>({} as Login.CodeInfo);

  function getCode() {
    getCodeInfo().then((res) => {
      setCodeInfo(res as Login.CodeInfo);
    });
  }

  useEffect(() => {
    getCode();
  }, []);

  const login = () => {
    setErrorMessage('');
    setLoading(true);
    loginApi({
      username: form.getFieldValue('username'),
      password: form.getFieldValue('password'),
      code: form.getFieldValue('code'),
      codeId: codeInfo.codeId,
    })
      .then((tokenInfo) => {
        // 记录登录状态
        localStorage.setItem('userStatus', 'login');
        localStorage.setItem('access_token', tokenInfo.access_token);
        localStorage.setItem('token_type', tokenInfo.token_type);
        localStorage.setItem('refresh_token', tokenInfo.refresh_token);
        const now = new Date();
        const expires_at = new Date(now.getTime() + tokenInfo.expires_in * 1000).getTime();
        localStorage.setItem('expires_at', expires_at + '');
        const urlParams = new URL(window.location.href).searchParams;
        window.location.href = urlParams.get('redirect') || '/';
      })
      .catch(({ response }) => {
        message.error(response?.data?.error_description || '登录失败');
        getCode();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className={styles['login-form-wrapper']}>
      <div className={styles['login-form-title']}>国家移民局常备力量第二总队</div>
      <div className={styles['login-form-error-msg']}>{errorMessage}</div>
      <Form className={styles['login-form']} layout="vertical" form={form} onFinish={login}>
        <ProFormText
          label={'用户名'}
          name="username"
          fieldProps={{
            size: 'large',
            prefix: <UserOutlined className={styles.prefixIcon} />,
          }}
          placeholder={'请输入用户名'}
          rules={[
            {
              required: true,
              message: '请输入手机号或身份证号',
            },
          ]}
        />
        <ProFormText.Password
          label={'密码'}
          name="password"
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined className={styles.prefixIcon} />,
          }}
          placeholder={'请输入密码'}
          rules={[
            {
              required: true,
              message: '请输入密码',
            },
          ]}
        />
        <ProFormText
          label={'验证码'}
          name="code"
          fieldProps={{
            size: 'large',
            prefix: <CodeOutlined className={styles.prefixIcon} />,
            suffix: (
              <Image
                // onClick={getCode}
                preview={false}
                width={100}
                height={28}
                src={`data:image/jpg;base64,${codeInfo.codeImageBase64}`}
                alt="lamp"
              />
            ),
          }}
          placeholder={'请输入验证码'}
          rules={[
            {
              required: true,
              message: '请输入验证码',
            },
          ]}
        />
        <Flex vertical>
          <Button
            type="primary"
            shape="round"
            size={'large'}
            htmlType="submit"
            // onClick={onSubmitClick}
            loading={loading}
            block
            style={{ background: '#072CA6' }}
          >
            登录
          </Button>
        </Flex>
      </Form>
      <div className={styles['login-form-logo-wrapper']}>
        <Image src="/assets/logo.svg" className={styles['login-form-logo']} />
      </div>
    </div>
  );
}
