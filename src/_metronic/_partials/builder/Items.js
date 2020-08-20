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
import {Card, CardBody, CardHeader, Notice} from "../controls";

const localStorageActiveTabKey = "builderActiveTab";

export function Items() {
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

    return (
        <>

        
        </>
    );
}

