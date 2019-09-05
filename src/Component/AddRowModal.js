import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

class AddRowModal extends React.Component {

        
        
    render() {
        console.log("Modal Props",this.props);

        const renderModalBody = Object.keys(this.props.row).map((currValue, index) => {
            if (this.props.renderKeys.includes(currValue)) {
            return (
                <div key={index + currValue + 'delModal'}>
                    {currValue} : {this.props.row[currValue]}
                </div>
            )
            }   
        });
        console.log("render");
        return (<Modal isOpen={this.props.modalOpen}>
            <div className="modal-head-title">
                {this.props.modalHeader}
                <button type="button" className="close float-rt" aria-label="Close" onClick={this.props.onClose}>
                    <span className="float-rt modal-close" aria-hidden="true">×</span>
                </button>
            </div>
            <ModalBody>
                let input =  <input type="text" value={this.props.input} onChange={(e)=>this.props.onInputChange(e, this.props)}/>   
            </ModalBody>
            <div className="modal-footer-title">
                {this.props.modalFooter}
                
                <Button color="secondary" className="float-rt fnt-xs btn-sm gap" onClick={this.props.onClose}>Cancel</Button>
                <Button color="primary" className="float-rt fnt-xs btn-sm gap" onClick={(e)=>this.props.onSubmitDeleteModal(e)}>Save</Button>
            </div>
        </Modal>)
    }
}

export default AddRowModal;