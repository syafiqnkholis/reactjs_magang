import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../_redux/items/itemsActions";
import { ItemEditDialogHeader } from "./ItemEditDialogHeader";
import { ItemEditForm } from "./ItemEditForm";
import { useItemsUIContext } from "../ItemsUIContext";

export function ItemEditDialog({ id, show, onHide }) {
  // Items UI Context
  const itemsUIContext = useItemsUIContext();
  const itemsUIProps = useMemo(() => {
    return {
      initItem: itemsUIContext.initItem,
    };
  }, [itemsUIContext]);

  // Items Redux state
  const dispatch = useDispatch();
  const { actionsLoading, itemForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.items.actionsLoading,
      itemForEdit: state.items.itemForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Item by id
    dispatch(actions.fetchItem(id));
  }, [id, dispatch]);

  // server request for saving item
  const saveItem = (item) => {
    if (!id) {
      // server request for creating item
      dispatch(actions.createItem(item)).then(() => onHide());
    } else {
      // server request for updating item
      dispatch(actions.updateItem(item)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <ItemEditDialogHeader id={id} />
      <ItemEditForm
        saveItem={saveItem}
        actionsLoading={actionsLoading}
        item={itemForEdit || itemsUIProps.initItem}
        onHide={onHide}
      />
    </Modal>
  );
}
