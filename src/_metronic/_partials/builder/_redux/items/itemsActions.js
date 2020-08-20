import * as requestFromServer from "./itemsCrud";
import {itemsSlice, callTypes} from "./itemsSlice";

const {actions} = itemsSlice;

export const fetchItems = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findItems(queryParams)
    .then(response => {
      const { totalCount, entities } = response.data;
      dispatch(actions.itemsFetched({ totalCount, entities }));
    })
    .catch(error => {
      error.clientMessage = "Can't find items";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchItem = id => dispatch => {
  if (!id) {
    return dispatch(actions.itemFetched({ itemForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getItemById(id)
    .then(response => {
      const item = response.data;
      dispatch(actions.itemFetched({ itemForEdit: item }));
    })
    .catch(error => {
      error.clientMessage = "Can't find item";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteItem = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteItem(id)
    .then(response => {
      dispatch(actions.itemDeleted({ id }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete item";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createItem = itemForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createItem(itemForCreation)
    .then(response => {
      const { item } = response.data;
      dispatch(actions.itemCreated({ item }));
    })
    .catch(error => {
      error.clientMessage = "Can't create item";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateItem = item => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateItem(item)
    .then(() => {
      dispatch(actions.itemUpdated({ item }));
    })
    .catch(error => {
      error.clientMessage = "Can't update item";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateItemsStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForItems(ids, status)
    .then(() => {
      dispatch(actions.itemsStatusUpdated({ ids, status }));
    })
    .catch(error => {
      error.clientMessage = "Can't update items status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteItems = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteItems(ids)
    .then(() => {
      dispatch(actions.itemsDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete items";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
