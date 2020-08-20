import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {ModalProgressBar} from "../../../../_partials/controls";
import * as actions from "../../_redux/items/itemsActions";
import {useItemsUIContext} from "../ItemsUIContext";

export function ItemDeleteDialog({ id, show, onHide }) {
  // Items UI Context
  const itemsUIContext = useItemsUIContext();
  const itemsUIProps = useMemo(() => {
    return {
      setIds: itemsUIContext.setIds,
      queryParams: itemsUIContext.queryParams
    };
  }, [itemsUIContext]);

  // Items Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.items.actionsLoading }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!id) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteItem = () => {
    // server request for deleting item by id
    dispatch(actions.deleteItem(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchItems(itemsUIProps.queryParams));
      // clear selections list
      itemsUIProps.setIds([]);
      // closing delete modal
      onHide();
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
          Item Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete this item?</span>
        )}
        {isLoading && <span>Item is deleting...</span>}
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
            onClick={deleteItem}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
