import axios from "axios";

export const ITEMS_URL = "api/customers";

// CREATE =>  POST: add a new item to the server
export function createItem(item) {
  return axios.post(ITEMS_URL, { item });
}

// READ
export function getAllItems() {
  return axios.get(ITEMS_URL);
}

export function getItemById(itemId) {
  return axios.get(`${ITEMS_URL}/${itemId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findItems(queryParams) {
  return axios.post(`${ITEMS_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the item on the server
export function updateItem(item) {
  return axios.put(`${ITEMS_URL}/${item.id}`, { item });
}

// UPDATE Status
export function updateStatusForItems(ids, status) {
  return axios.post(`${ITEMS_URL}/updateStatusForItems`, {
    ids,
    status
  });
}

// DELETE => delete the item from the server
export function deleteItem(itemId) {
  return axios.delete(`${ITEMS_URL}/${itemId}`);
}

// DELETE Items by ids
export function deleteItems(ids) {
  return axios.post(`${ITEMS_URL}/deleteItems`, { ids });
}
