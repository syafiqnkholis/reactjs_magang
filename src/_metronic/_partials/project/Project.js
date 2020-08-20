/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/img-redundant-alt */
import React, {useMemo, useState} from "react";
import {Formik} from "formik";
import {get, merge} from "lodash";
import {FormHelperText, Switch} from "@material-ui/core";
import clsx from "clsx";
// https://github.com/conorhastings/react-syntax-highlighter#prism
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
// See https://github.com/PrismJS/prism-themes
import {coy as highlightStyle} from "react-syntax-highlighter/dist/esm/styles/prism";
import {useHtmlClassService, setLayoutConfig, getInitLayoutConfig} from "../../layout";
import {CardBody, CardHeader, CardHeaderToolbar, Notice} from "../controls";
import {
  Button,
  Card
} from "react-bootstrap";
import { useCustomersUIContext } from "./CustomersUIContext";

const localStorageActiveTabKey = "builderActiveTab";

export function Project() {
    const activeTab = localStorage.getItem(localStorageActiveTabKey);
    const [key, setKey] = useState(activeTab ? +activeTab : 0);
    const [isLoading, setIsLoading] = useState(false);
    const htmlClassService = useHtmlClassService();
    const initialValues = useMemo(
        () =>
            merge(
                // Fulfill changeable fields.
                getInitLayoutConfig(),
                htmlClassService.config
            ),
        [htmlClassService.config]
    );

    const saveCurrentTab = (_tab) => {
        localStorage.setItem(localStorageActiveTabKey, _tab);
    }

    // const customersUIContext = useCustomersUIContext();
    // const customersUIProps = useMemo(() => {
    //     return {
    //         // ids: customersUIContext.ids,
    //         newCustomerButtonClick: customersUIContext.newCustomerButtonClick,
    //     };
    // }, [customersUIContext]);

    return (
        <Card>
            <CardHeader title="Projects list">
                <CardHeaderToolbar>
                    <button
                        type="button"
                        className="btn btn-primary"
                        // onClick={customersUIProps.newCustomerButtonClick}
                    >
                        New Project
                    </button>
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody>                            
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16bbc8a7812%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16bbc8a7812%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22107.1875%22%20y%3D%2296.24375%22%3E286x180%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" />
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                        </Card.Text>
                        <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                </Card>
           </CardBody>
        </Card> 
    );
}
