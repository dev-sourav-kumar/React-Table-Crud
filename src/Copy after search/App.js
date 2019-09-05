import React from 'react';
import { headers, rows } from './data';
import Table from './Table';
import RowDetailModal from './RowDetailModal';
import DeleteRowModal from './DeleteRowModal';
import EditRowModal from './EditRowModal';
import SearchBar from './SearchBar';


class App extends React.Component {

    constructor(props) {
        super(props);
        let vlheader = [];
        let vlrows = [];
        let rowKeys = [];
        let headerKey = null;
        this.headerDataCheck = this.dataValidation(headers);
        (this.headerDataCheck.success && this.headerDataCheck.rowKeys.length > 0) ? headerKey = this.headerDataCheck.rowKeys[0] : headerKey = null;
        vlheader = this.headerDataCheck.rows

        this.dataCheck = this.dataValidation(rows);

        (this.dataCheck.success && this.dataCheck.rowKeys.length > 0) ? rowKeys = this.dataCheck.rowKeys : rowKeys = [];
        vlrows = this.dataCheck.rows.map((currValue, index, array) => {
            currValue['rwid'] = index;
            currValue['sl'] = false;
            currValue['ed'] = false;
            currValue['ac'] = false;
            return currValue;
        });
        this.state = {
            vlheader,
            'headerKey': headerKey,
            vlrows,
            'rowKeys': rowKeys,
            'modalOpen': false,
            'modalHeader': "Employee Detail",
            'modalBody': {},
            'deleteModalOpen': false,
            'deleteModalHeader': "Conformation",
            'deleteModalBody': {},
            'deleteModalFooter': "Are you sure you want to delete?",
            'deleteModalSubmit': false,
            'editModalOpen': false,
            'editModalHeader': "Update Detail",
            'editModalBody': {},
            'editModalFooter': "Are you sure you want to update?",
            'editModalSubmit': false,
        };

    }

    dataValidation = (rows) => {
        let rowKeys = [];
        let success = false;
        let message = "no data";
        if (rows.length > 0) {
            rowKeys = Object.keys(rows[0]);
        }
        if (rowKeys.length > 0) {
            rows.forEach((element, index, array) => {
                let elementKeys = Object.keys(element);
                let validatorKeys = rowKeys;
                if (validatorKeys.length === elementKeys.length) {
                    if (JSON.stringify(validatorKeys.sort()) === JSON.stringify(elementKeys.sort())) {
                        message = "All object keys are identical validation pass";
                        success = true;
                    } else {
                        message = "All object keys are not identical";
                        success = false;
                        return message;
                    }
                } else {
                    message = "Number of keys in object are not identical";
                    success = false;
                    return message;
                }
            });
        } else {
            success = false;
            message = 'No keys in data object';
        }

        return { success, message, rowKeys, rows };
    }


    onDeleteClick = (event, props) => {
        this.setState({ 'deleteModalOpen': true });
        this.setState({ 'deleteModalBody': props.row });
    }

    onSortClick = (event, key, asc) => {
        // let sortedRowData = [...this.state.vlrows];
        console.log("sort Click");
        let sortedRowData = this.sortData(this.state.vlrows, key, asc);
        let sortedRenderRows = this.sortData(this.state.renderRows, key, asc);
        this.setState({'vlrows': sortedRowData});
        this.onDefaultRowRender()
        this.setState({'renderRows': sortedRenderRows});
    }

    sortData(data, key, asc){
       let sortedData =  data.sort((firstData, secondData) => {
            const first = firstData[key].toLowerCase();
            const second = secondData[key].toLowerCase();
            let comparison = 0;
            if (first > second) {
                (asc) ? comparison = 1 : comparison = -1;
            } else if (first < second) {
                (asc) ? comparison = -1 : comparison = 1;
            }
            return comparison
        });
        return sortedData
    }

    RowDetailModalClose = (e) => {
        this.setState({ 'modalOpen': false });
    }

    onRowClick = (e, props) => {
        this.setState({ 'modalBody': props.row });
        this.setState({ 'modalOpen': true });
    }

    onDeleteModalClose = (e) => {
        this.setState({'deleteModalOpen': false});
    }

    onSubmitDeleteModal = (e) => {
        this.setState({ 'deleteModalSubmit': true });
        let updateVlRows = this.state.vlrows.filter((currValue) => {
            if (currValue.rwid !== this.state.deleteModalBody.rwid) {
                return currValue;
            }
        });
        let updateRenderRows = this.state.renderRows.filter((currValue) => {
            if (currValue.rwid !== this.state.deleteModalBody.rwid) {
                return currValue;
            }
        });
        this.setState({ 'vlrows': updateVlRows });
        this.setState({ 'renderRows': updateRenderRows });
        this.setState({ 'deleteModalOpen': false });
    }

    onSubmitEditModal = (e, updatedRow) => {
        console.log("edit click", updatedRow);

        let updateVlRows = this.state.vlrows.map((currValue) => {
            if (currValue.rwid === this.state.editModalBody.rwid) {
                currValue = updatedRow;
            }
            return currValue
        });
        let updateRenderRows = this.state.renderRows.map((currValue) => {
            if (currValue.rwid === this.state.editModalBody.rwid) {
                currValue = updatedRow;
            }
            return currValue
        });
        this.setState({ 'vlrows': updateVlRows });
        this.setState({ 'renderRows': updateRenderRows });
        this.setState({ 'editModalOpen': false });
    }
    onEditClick = (e, props) => {
        console.log("onEditClick");
        this.setState({ 'editModalOpen': true });
        this.setState({ 'editModalBody': props.row });
    }
    onEditModalClose = () => {
        this.setState({ 'editModalOpen': false });
    }

    onSearchSubmit = (renderRows) => {
        console.log("Search Submit", renderRows);

        this.setState({renderRows});
        if(renderRows.length>this.state.pageSize){
            this.onDefaultRowRender()
        }
    }


    render() {
        return (

            <div className="middle">
                <SearchBar 
                    onSubmit={this.onSearchSubmit}
                    totalRow={this.state.vlrows}
                    rowKeys={this.state.rowKeys}
                    searchBy = "name"
                />
                <Table
                    header={this.state.vlheader}
                    headerKey={this.state.headerKey}
                    onSortClick={this.onSortClick}
                    rows={this.state.vlrows}
                    rowKeys={this.state.rowKeys}
                    onEditClick={this.onEditClick}
                    onDeleteClick={this.onDeleteClick}
                    onRowClick={this.onRowClick}
                />
                

                <RowDetailModal
                    modalOpen={this.state.modalOpen}
                    row={this.state.modalBody}
                    renderKeys={this.state.rowKeys}
                    onClose={this.RowDetailModalClose}
                    modalHeader={this.state.modalHeader}
                />
                <EditRowModal
                    modalOpen={this.state.editModalOpen}
                    row={this.state.editModalBody}
                    renderKeys={this.state.rowKeys}
                    onClose={this.onEditModalClose}
                    onSubmitEditModal={this.onSubmitEditModal}
                    modalHeader={this.state.editModalHeader}
                    modalFooter={this.state.editModalFooter}
                />

                <DeleteRowModal
                    modalOpen={this.state.deleteModalOpen}
                    row={this.state.deleteModalBody}
                    renderKeys={this.state.rowKeys}
                    onClose={this.onDeleteModalClose}
                    onSubmitDeleteModal={this.onSubmitDeleteModal}
                    modalHeader={this.state.deleteModalHeader}
                    modalFooter={this.state.deleteModalFooter}
                />
            </div>
        )
    }
}

export default App;