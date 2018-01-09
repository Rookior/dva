import request from '../utils/request';
import { PAGE_SIZE } from '../constants';

// 查找接口
export function fetch({ page }) {
  return request(`/api/users?_page=${page}&_limit=${PAGE_SIZE}`);
}
// 新增接口 通过body相当于ajax中的data传递数据
export function create(values) {
    return request('/api/users', {
      method: 'POST',
      body: JSON.stringify(values),
    });
  }