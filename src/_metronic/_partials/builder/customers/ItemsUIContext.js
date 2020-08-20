import React, {createContext, useContext, useState, useCallback} from "react";
import {isEqual, isFunction} from "lodash";
import {initialFilter} from "./ItemsUIHelpers";

const ItemsUIContext = createContext();

export function useItemsUIContext() {
  return useContext(ItemsUIContext);
}

export const ItemsUIItem = ItemsUIContext.Item;

export function ItemsUIProvider({itemsUIEvents, children}) {
  const [queryParams, setQueryParamsBase] = useState(initialFilter);
  const [ids, setIds] = useState([]);
  const setQueryParams = useCallback(nextQueryParams => {
    setQueryParamsBase(prevQueryParams => {
      if (isFunction(nextQueryParams)) {
        nextQueryParams = nextQueryParams(prevQueryParams);
      }

      if (isEqual(prevQueryParams, nextQueryParams)) {
        return prevQueryParams;
      }

      return nextQueryParams;
    });
  }, []);

  const initItem = {
    id: undefined,
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    gender: "Female",
    status: 0,
    dateOfBbirth: "",
    ipAddress: "",
    type: 1
  };

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    initItem,
    newItemButtonClick: itemsUIEvents.newItemButtonClick,
    openEditItemDialog: itemsUIEvents.openEditItemDialog,
    openDeleteItemDialog: itemsUIEvents.openDeleteItemDialog,
    openDeleteItemsDialog: itemsUIEvents.openDeleteItemsDialog,
    openFetchItemsDialog: itemsUIEvents.openFetchItemsDialog,
    openUpdateItemsStatusDialog: itemsUIEvents.openUpdateItemsStatusDialog
  };

  return <ItemsUIContext.Provider value={value}>{children}</ItemsUIContext.Provider>;
}