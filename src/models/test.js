import * as testService from '../services/test';

export default {
    namespace: 'test',
    state: {
        list: [],
        total: null,
        page: null,
      },
      reducers: {
        
        save(state, { payload: { data: list, total, page } }) {
            console.log("执行state的save");
          return { ...state, list, total, page };
        },
      },
      /*
        effects:
        put用于触发 action 
        call用于调用异步逻辑，支持 promise 。
        select用于从 state 里获取数据。
      */
      effects: {
        //   查找
        *fetch({ payload: { page = 1 } }, { call, put }) {
           
                console.log("subscriptions监听路由触发fetch")
                const { data, headers } = yield call(testService.fetch, { page });
                console.log({data})
                // 触发action的行为 save，将获取到的data更新到store
                yield put({
                    type: 'save',
                    payload: {
                      data,
                      total: parseInt(headers['x-total-count'], 10),
                      page: parseInt(page, 10),
                    },
                  });
          },
        //   数据新增  使用 yield put({ type: 'reload' }); 此时 触发的是effects本身的接收行为 ，上面的查找触发的是reducer中的save行为 ？？？？
          *create({ payload: values }, { call, put }) {
            yield call(testService.create, values);
            yield put({ type: 'reload' });
          },
        //   触发重新加载后 执行默认渲染， select用于从 state 里获取数据， 此时重新渲染的page为正确的当前page
          *reload(action, { put, select }) {
            const page = yield select(state => state.test.page);
            yield put({ type: 'fetch', payload: { page } });
          },
        //   删除数据接收
        *remove({ payload: id }, { call, put }) {
            yield call(testService.remove, id);
            yield put({ type: 'reload' });
          },
          *patch({ payload: { id, values } }, { call, put }) {
            yield call(testService.patch, id, values);
            yield put({ type: 'reload' });
          },
        
      },
    //   监听路由变化  触发 effects中的fatch
      subscriptions: {
        setup({ dispatch, history }) {
          return history.listen(({ pathname, query }) => {
            if (pathname === '/test') {
              dispatch({ type: 'fetch', payload: query });
            }
          });
        },
      },

};