import React from 'react';
import RowList from './RowList';
import Header from './Header';
import Pagination from './Pagination';
import './table.css';

class Table extends React.Component {

    state = {
        'renderRow':[],
        'pageSize': 10,
    };
    componentDidMount(){
        this.onNextClick()
    }
    onPrevClick = (renderRows) => {
        this.setState({renderRows});
    }
    onNextClick = (renderRows) => {
        this.setState({renderRows});
    }
    render() {
        const rowList =  
                    <RowList 
                        rows={this.state.renderRow} 
                        rowKeys={this.props.rowKeys} 
                        onEditClick = {this.props.onEditClick}
                        onSaveClick = {this.props.onSaveClick}
                        onDeleteClick = {this.props.onDeleteClick}
                        onRowClick = {this.props.onRowClick}
                        />;
        const tableMessage = <div className="rTableRow">
                                <div className="message">
                                    No Record
                                </div>
                             </div>;

        const tableBody = (this.props.rows.length>0) ? rowList: tableMessage
        return (
            
            <div className="rTable">
                <div className="rTableHeading">
                    <Header 
                        row = {this.props.header}
                        rowKeys={this.props.rowKeys}
                        renderKey= {this.props.headerKey}
                        onSortClick = {this.props.onSortClick}
                    />
                </div>
                <div className="rTableBody">
                    {tableBody}
                </div>
                <Pagination
                    pageSize={this.state.pageSize}
                    totalRow={this.props.rows}
                    onNextClick={this.onNextClick}
                    onPrevClick={this.onPrevClick}
                    ref="pagination"
                />
            </div>
        );
    }
}

export default Table;