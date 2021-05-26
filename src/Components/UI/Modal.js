import classes from "./Modal.module.css";
import { Fragment } from "react";
import ReactDOM from "react-dom";

function BackDrop(props) {
    return <div className={classes.backdrop} onClick={props.onClose}/>;
}

function Overlay(props) {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    );
}

function Modal(props) {
    const portalElement = document.getElementById("overlays");
    return (
        <Fragment>
            {ReactDOM.createPortal(<BackDrop onClose={props.onClose}/>, portalElement)}
            {ReactDOM.createPortal(
                <Overlay>{props.children}</Overlay>,
                portalElement
            )}
        </Fragment>
    );
}

export default Modal;
