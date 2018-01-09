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
// 删除接口
  export function remove(id) {
    return request(`/api/users/${id}`, {
      method: 'DELETE',
    });
  }
//编辑接口
export function patch(id, values) {
    return request(`/api/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(values),
    });
  }