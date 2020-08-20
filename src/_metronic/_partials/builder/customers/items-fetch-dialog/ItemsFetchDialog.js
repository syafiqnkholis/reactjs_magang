import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import { ItemStatusCssClasses } from "../ItemsUIHelpers";
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

export function ItemsFetchDialog({ show, onHide }) {
  // Items UI Context
  const itemsUIContext = useItemsUIContext();
  const itemsUIProps = useMemo(() => {
    return {
      ids: itemsUIContext.ids,
    };
  }, [itemsUIContext]);

  // Items Redux state
  const { items } = useSelector(
    (state) => ({
      items: selectedItems(
        state.items.entities,
        itemsUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if items weren't selected we should close modal
  useEffect(() => {
    if (!itemsUIProps.ids || itemsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsUIProps.ids]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Fetch selected elements
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="timeline timeline-5 mt-3">
          {items.map((item) => (
            <div className="timeline-item align-items-start" key={`id${item.id}`}>
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
                <span className="ml-3">{item.lastName}, {item.firstName}</span>                
              </div>
            </div>
          ))}
        </div>
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
            onClick={onHide}
            className="btn btn-primary btn-elevate"
          >
            Ok
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
