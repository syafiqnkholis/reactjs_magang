import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../_partials/controls";

export function ItemEditDialogHeader({ id }) {
  // Items Redux state
  const { itemForEdit, actionsLoading } = useSelector(
    (state) => ({
      itemForEdit: state.items.itemForEdit,
      actionsLoading: state.items.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "New Item";
    if (itemForEdit && id) {
      _title = `Edit item '${itemForEdit.firstName} ${itemForEdit.lastName}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [itemForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
