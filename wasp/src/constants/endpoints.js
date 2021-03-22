export const BASE_API = 'https://imprima.app/api';
// export const BASE_API = 'http://localhost:8000/api';
export const GET_KIND = `${BASE_API}/kind/{id}`;
export const GET_PRODUCT = `${BASE_API}/produto/{id}`;
export const GET_MERCHANT = `${BASE_API}/cep/{id}/{cep}`;
export const GET_CATEGORY = `${BASE_API}/category`;
export const GET_CATEGORY_TYPE = `${BASE_API}/category/{categoryId}/type/{typeId}`;
export const GET_ATTRIBUTES = `${BASE_API}/attributes/{productId}/{merchantId}`;