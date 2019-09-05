import React from 'react';
import Cell from './Cell';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faSave, faTimesCircle, faTrashAlt } from '@fortawesome/free-regular-svg-icons'

class Row extends React.Component {

    constructor(props) {
        super(props)
        this.state = { 'irow': {} };
    }


    componentDidMount() {
        this.setState({ "irow": this.props.row });
    }




    renderRow = (currValue, rowIndex) => {

        if (this.props.renderKeys.includes(currValue)) {
            return (
                <Cell key={rowIndex + currValue}
                    title={this.props.row[currValue]}
                    onRowClick={this.props.onRowClick}
                />
            )
        }
    }

    render() {
        const cell = Object.keys(this.props.row).map((currValue) => {
            return this.renderRow(currValue, this.props.index)
        });
        const fontIcon = <div className="rTableCell">
            <FontAwesomeIcon icon={faEdit} size="xs" onClick={(e) => this.props.onEditClick(e, this.props)} />
            <FontAwesomeIcon icon={faTrashAlt} size="xs" onClick={(e) => this.props.onDeleteClick(e, this.props)} />
        </div>
        return (
            <div className={"rTableRow rHover " + (this.props.row.ed ? ' highlight' : '')}>
                {cell}
                {fontIcon}
            </div>);
    }
}

export default Row;