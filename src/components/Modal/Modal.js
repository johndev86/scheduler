import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css'

const modalRoot = document.getElementById('modal-root');
const body = document.getElementsByTagName('body');

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.el = document.createElement('div');
    }

    componentDidMount() {
        modalRoot.appendChild(this.el);
        body[0].style.overflow = "hidden";
    }

    componentWillUnmount() {
        modalRoot.removeChild(this.el);
        body[0].style.overflow = "scroll";
    }

    render() {
        return ReactDOM.createPortal(this.props.children, this.el)
    }
}

export default Modal;