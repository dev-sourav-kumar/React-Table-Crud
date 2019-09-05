import React from 'react';
import { Modal, ModalBody, Button } from 'reactstrap';

class RowDetailModal extends React.Component {
        

    render() {

        const renderModalBody = Object.keys(this.props.row).map((currValue, index) => {
            if (this.props.renderKeys.includes(currValue)) {
            return (
                <div key={index + currValue + 'rowModal'}>
                    {currValue} : {this.props.row[currValue]}
                </div>
            )
            }   
        });

        return (<Modal isOpen={this.props.modalOpen}>
            <div className="modal-head-title">
                {this.props.modalHeader}
                <button type="button" className="close float-rt" aria-label="Close" onClick={this.props.onClose}>
                    <span className="float-rt modal-close" aria-hidden="true">×</span>
                </button>
            </div>
            <ModalBody>
                {renderModalBody}
            </ModalBody>
            <div className="modal-footer-title">
                <Button color="primary" className="float-rt fnt-xs btn-sm" onClick={this.props.onClose}>Close</Button>
            </div>
        </Modal>)
    }
}

export default RowDetailModal;