import { request } from './request'

// 获取分类数据
export function getCategory() {
    return request({
        url: '/category'
    });
}
// 获取具体分类的数据
export function getSubCategory(maitKey) {
    return request({
        url: '/subcategory',
        params: {
            maitKey
        }
    });
}