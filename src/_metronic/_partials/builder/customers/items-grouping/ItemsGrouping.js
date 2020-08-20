import React, { useMemo } from "react";
import { useItemsUIContext } from "../ItemsUIContext";

export function ItemsGrouping() {
  // Items UI Context
  const itemsUIContext = useItemsUIContext();
  const itemsUIProps = useMemo(() => {
    return {
      ids: itemsUIContext.ids,
      setIds: itemsUIContext.setIds,
      openDeleteItemsDialog: itemsUIContext.openDeleteItemsDialog,
      openFetchItemsDialog: itemsUIContext.openFetchItemsDialog,
      openUpdateItemsStatusDialog:
        itemsUIContext.openUpdateItemsStatusDialog,
    };
  }, [itemsUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="font-bold font-danger">
                <span>
                  Selected records count: <b>{itemsUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={itemsUIProps.openDeleteItemsDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={itemsUIProps.openFetchItemsDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={itemsUIProps.openUpdateItemsStatusDialog}
              >
                <i className="fa fa-sync-alt"></i> Update Status
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
