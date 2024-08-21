import React from 'react';
import Footer from '@/components/Footer';
import LoginForm from './form';
import styles from './style/index.module.less';

function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles['content-inner']}>
          <LoginForm />
        </div>
        <div className={styles.footer}>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Login;
