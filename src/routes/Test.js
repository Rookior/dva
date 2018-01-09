import React from 'react';
import { connect } from 'dva';
import styles from './Users.css';
import MainLayout from '../components/MainLayout/MainLayout';

import TestComponent from '../components/Test/Test';

function Test({ location }) {
    return (
      <MainLayout location={location}>
        <div className={styles.normal}>
            <TestComponent />
        </div>
      </MainLayout>
    );
  }
  
  export default connect()(Test);