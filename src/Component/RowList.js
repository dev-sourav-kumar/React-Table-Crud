import React from 'react';
import Row from './Row';


class RowList extends React.Component {

    // onRowClick=(e)=>{
    //     console.log("IN ROW LLIST");
    //     //(e)=>this.props.onRowClick(e, this.props)
        
    // }

    renderRowList = (currValue, index, array) => {
        return (
            <Row key={currValue.rwid} 
                index={index} 
                row={currValue}
                renderKeys={this.props.rowKeys}
                onEditClick = {this.props.onEditClick}
                onSaveClick = {this.props.onSaveClick}
                onDeleteClick = {this.props.onDeleteClick}
                onRowClick = {this.props.onRowClick}
                />
        )
    }
    
    render() {
        const row = this.props.rows.map(this.renderRowList);
        return row;
    }
}

export default RowList;