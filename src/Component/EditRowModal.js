import React from 'react';
import { Modal, ModalBody, Button, Form, FormGroup, Label, Input } from 'reactstrap';


class EditRowModal extends React.Component {

    state={'row':{}}

    componentDidMount = () =>{
        this.setState({'row':this.props.row})
    }


    onInputChange=(e, props, currValue)=>{
         let row = props;
         row[currValue] = e.target.value;
         this.setState({row});
    }

    render() {
        const renderModalBody = Object.keys(this.props.row).map((currValue, index) => {
            if (this.props.renderKeys.includes(currValue)) {
                return (
                    <FormGroup key={index + currValue + 'input'}>
                        <Label for={currValue}>{currValue}</Label>
                        <Input type="text" value={this.props.row[currValue]} onChange={(e) => this.onInputChange(e, this.props.row, currValue)} />
                    </FormGroup>
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
                <Form>
                    {renderModalBody}
                </Form>
            </ModalBody>
            <div className="modal-footer-title">
                {this.props.modalFooter}
                <Button color="secondary" className="float-rt fnt-xs btn-sm gap" onClick={this.props.onClose}>Cancle</Button>
                <Button color="primary" className="float-rt fnt-xs btn-sm gap" onClick={(e) => this.props.onSubmitEditModal(e,this.state.row)}>Update</Button>

            </div>
        </Modal>)
    }
}

export default EditRowModal;