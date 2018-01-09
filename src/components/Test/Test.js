import React from 'react';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button } from 'antd';
import { routerRedux } from 'dva/router';

import styles from './Users.css';
import { PAGE_SIZE } from '../../constants';


// 变量定义方式？？？？
function Test({ dispatch, list2: dataSource, loading, total, page: current }) {

    //为什么会有正确的page  如何实现了页面的分页加载？？？？
    function pageChangeHandler(page) {
        dispatch(routerRedux.push({
            pathname: '/test',
            query: { page },
        }));
    }
        
    

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: text => <a href="">{text}</a>,
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: 'Website',
          dataIndex: 'website',
          key: 'website',
        },
        {
          title: 'Operation',
          dataIndex: 'operation',
          key: 'operation',
        },
      ];

    return (
        <div className={styles.normal}>
          <div>
            <div className={styles.create}>             
                <Button type="primary">新增</Button>              
            </div>
            <Table
                columns={columns}
                dataSource={dataSource}
                loading={loading}
                rowKey={record => record.id}
                pagination={false}
            />
            <Pagination
                className="ant-table-pagination"
                total={total}
                current={current}
                pageSize={PAGE_SIZE}
                onChange={pageChangeHandler}
            />
          </div>
        </div>
      );

}

function mapStateToProps(state) {
    // 获取test的reduser获得state，即state.test
    const { list, total, page } = state.test;
    console.log(state.test);
    // 设置Test 中用到的state 的值
    /* 等价于下面的映射方式 其中前面的list是组件Test的state变量，后面的list是映射组件的state 即 List.state:mapStateToProps.state
       其中的映射组件mapStateToProps的state属性 list 取决于reducer 中返回的对象的键名
    return {
        loading: state.loading.models.test,
        list:list,
        total,
        page,
        };
    */
    return {
      loading: state.loading.models.test,
      list2:list,
      total,
      page,
    };
    // const list = state.users;
    // console.log(list)
   
  }
    /*通过绑定将 test的reduser获得state 如下 
                    payload: {
                      data,
                      total: parseInt(headers['x-total-count'], 10),
                      page: parseInt(page, 10),
                    }, 
    映射到  mapStateToProps   
                    const { list, total, page } = state.test; */
  export default connect(mapStateToProps)(Test);