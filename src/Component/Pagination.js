import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

class Paginate extends React.Component {

    paginationInfo = (data, pageSize, pageNumber) => {
        --pageNumber;
        return (
            <span> {(pageNumber * pageSize)+1} - {(((pageNumber + 1) * pageSize)>data.length)?data.length:((pageNumber + 1) * pageSize)}  of {data.length} </span>
        )
    }

    render() {
        return ( (this.props.totalRow.length>0)?
            <div className="rTableFoot">
                <FontAwesomeIcon className="icon" icon={faArrowLeft} size="sm" onClick={this.props.onPrevClick} />
                {this.paginationInfo(this.props.totalRow, this.props.pageSize, this.props.pageNumber)}
                <FontAwesomeIcon className="icon" icon={faArrowRight} size="sm" onClick={this.props.onNextClick} />
            </div>:''
        );
    }
}

export default Paginate;
