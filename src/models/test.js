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
        *fetch({ payload: { page = 1 } }, { call, put }) {
           
                console.log("subscriptions监听路由触发fetch")
                const { data, headers } = yield call(testService.fetch, { page });
                console.log({data})
                // 将获取到的data更新到store
                yield put({
                    type: 'save',
                    payload: {
                      data,
                      total: parseInt(headers['x-total-count'], 10),
                      page: parseInt(page, 10),
                    },
                  });
          },
      },
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