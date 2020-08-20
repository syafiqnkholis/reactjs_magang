import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../_redux/items/itemsActions";
import { useItemsUIContext } from "../ItemsUIContext";
import {ModalProgressBar} from "../../../../_partials/controls";

export function ItemsDeleteDialog({ show, onHide }) {
  // Items UI Context
  const itemsUIContext = useItemsUIContext();
  const itemsUIProps = useMemo(() => {
    return {
      ids: itemsUIContext.ids,
      setIds: itemsUIContext.setIds,
      queryParams: itemsUIContext.queryParams,
    };
  }, [itemsUIContext]);

  // Items Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.items.actionsLoading }),
    shallowEqual
  );

  // if items weren't selected we should close modal
  useEffect(() => {
    if (!itemsUIProps.ids || itemsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsUIProps.ids]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteItems = () => {
    // server request for deleting item by selected ids
    dispatch(actions.deleteItems(itemsUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchItems(itemsUIProps.queryParams)).then(
        () => {
          // clear selections list
          itemsUIProps.setIds([]);
          // closing delete modal
          onHide();
        }
      );
    });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {/*begin::Loading*/}
      {isLoading && <ModalProgressBar />}
      {/*end::Loading*/}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Items Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected items?</span>
        )}
        {isLoading && <span>Item are deleting...</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            Cancel
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteItems}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
