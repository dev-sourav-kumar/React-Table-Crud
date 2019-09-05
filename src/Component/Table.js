import React from 'react';
import RowList from './RowList';
import Header from './Header';
import Pagination from './Pagination';
import './table.css';

class Table extends React.Component {


    state = {
        'renderRows': [],
        'pageNumber': 1,
        'pageSize': 10
    };

    onPaginate = (data, pageSize, pageNumber) => {
        --pageNumber; // because pages logically start with 1, but technically with 0
        let paginatedData = data.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize);
        return paginatedData;
    }

    onPrevClick = () => {
        let pageNumber = this.state.pageNumber;
        if (pageNumber > 1) {
            pageNumber--;
            this.setState({ pageNumber });
            const renderRows = this.onPaginate(this.props.rows, this.state.pageSize, pageNumber);
            this.setState({ renderRows });
        }
    }

    onNextClick = () => {

        if ((this.state.pageNumber * this.state.pageSize) < this.props.rows.length) {
            let pageNumber = this.state.pageNumber;
            pageNumber++;
            this.setState({ pageNumber });
            const renderRows = this.onPaginate(this.props.rows, this.state.pageSize, pageNumber);
            this.setState({ renderRows });
        }
    }
    componentDidMount = () => {
        this.onDefaultLoad();
    }
    componentDidUpdate(prevProps) {
        if (this.props.rows !== prevProps.rows) {
            this.onDefaultLoad();
        }
    }
    onDefaultLoad = () => {
        let renderRows = this.onPaginate(this.props.rows, this.state.pageSize, this.state.pageNumber);
        this.setState({ 'renderRows': renderRows });
    }

    onSortClick = (event, key, asc) => {
        console.log("on SORT CLICK");
        let sortedRowData =  this.state.renderRows.sort((firstData, secondData) => {
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
        console.log("sortedRowData", sortedRowData);
        this.setState({'renderRows': sortedRowData});
    }

    render() {
        const rowList =
            <RowList
                rows={this.state.renderRows}
                rowKeys={this.props.rowKeys}
                onEditClick={this.props.onEditClick}
                onSaveClick={this.props.onSaveClick}
                onDeleteClick={this.props.onDeleteClick}
                onRowClick={this.props.onRowClick}
            />;
        const tableMessage = <div className="rTableRow">
            <div className="message">
                No Record
            </div>
        </div>;
        const tableBody = (this.props.rows.length > 0) ? rowList : tableMessage
        
        return (
            <div>
                <div className="rTable">
                    <div className="rTableHeading">
                        <Header
                            row={this.props.header}
                            rowKeys={this.props.rowKeys}
                            renderKey={this.props.headerKey}
                            onSortClick={this.onSortClick}
                        />
                    </div>
                    <div className="rTableBody">
                        {tableBody}
                    </div>

                </div>

                <Pagination
                    pageNumber={this.state.pageNumber}
                    pageSize={this.state.pageSize}
                    totalRow={this.props.rows}
                    onNextClick={this.onNextClick}
                    onPrevClick={this.onPrevClick}
                />
            </div>
        );
    }
}

export default Table;