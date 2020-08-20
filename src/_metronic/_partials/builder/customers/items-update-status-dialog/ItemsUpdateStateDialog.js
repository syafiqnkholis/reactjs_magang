import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ItemStatusCssClasses } from "../ItemsUIHelpers";
import * as actions from "../../_redux/items/itemsActions";
import { useItemsUIContext } from "../ItemsUIContext";

const selectedItems = (entities, ids) => {
  const _items = [];
  ids.forEach((id) => {
    const item = entities.find((el) => el.id === id);
    if (item) {
      _items.push(item);
    }
  });
  return _items;
};

export function ItemsUpdateStateDialog({ show, onHide }) {
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
  const { items, isLoading } = useSelector(
    (state) => ({
      items: selectedItems(
        state.items.entities,
        itemsUIProps.ids
      ),
      isLoading: state.items.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!itemsUIProps.ids || itemsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update items status by selected ids
    dispatch(actions.updateItemsStatus(itemsUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchItems(itemsUIProps.queryParams)).then(
          () => {
            // clear selections list
            itemsUIProps.setIds([]);
            // closing delete modal
            onHide();
          }
        );
      }
    );
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Status has been updated for selected items
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="overlay overlay-block cursor-default">
        {/*begin::Loading*/}
        {isLoading && (
          <div className="overlay-layer">
            <div className="spinner spinner-lg spinner-primary" />
          </div>
        )}
        {/*end::Loading*/}

        <div className="timeline timeline-5 mt-3">
          {items.map((item) => (
            <div
              className="timeline-item align-items-start"
              key={`itemsUpdate${item.id}`}
            >
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg text-right pr-3" />
              <div className="timeline-badge">
                <i
                  className={`fa fa-genderless text-${
                    ItemStatusCssClasses[item.status]
                  } icon-xxl`}
                />
              </div>
              <div className="timeline-content text-dark-50 mr-5">
                <span
                  className={`label label-lg label-light-${
                    ItemStatusCssClasses[item.status]
                  } label-inline`}
                >
                  ID: {item.id}
                </span>
                <span className="ml-3">
                  {item.lastName}, {item.firstName}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer className="form">
        <div className="form-group">
          <select
            className="form-control"
            value={status}
            onChange={(e) => setStatus(+e.target.value)}
          >
            <option value="0">Suspended</option>
            <option value="1">Active</option>
            <option value="2">Pending</option>
          </select>
        </div>
        <div className="form-group">
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate mr-3"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={updateStatus}
            className="btn btn-primary btn-elevate"
          >
            Update Status
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
