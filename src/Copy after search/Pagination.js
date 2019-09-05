import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

class Paginate extends React.Component {

    constructor(props) {
        super(props)
        console.log("Pagination", this.props)
        this.state = { 'renderRows': [], 'pageNumber': 1 };
    }

    onPaginate(array, page_size, page_number) {
        --page_number; // because pages logically start with 1, but technically with 0
        console.log(page_number * page_size, (page_number + 1) * page_size, array.length);
        let data = array.slice(page_number * page_size, (page_number + 1) * page_size);
        return data;
    }

    paginationInfo = (data, pageSize, pageNumber) => {
        --pageNumber;
        return (
            <span> {pageNumber * pageSize} - {(((pageNumber + 1) * pageSize)>data.length)?data.length:((pageNumber + 1) * pageSize)}  of {data.length} </span>
        )
    }

    onPrevClick = () => {
        let pageNumber = this.state.pageNumber;
        if (pageNumber > 1) {
            console.log("inside if")
            pageNumber--;
            this.setState({pageNumber});
            const renderRows = this.onPaginate(this.props.totalRow, this.props.pageSize, pageNumber);
            this.setState({renderRows});
            this.props.onPrevClick(renderRows);
        }
    }

    onNextClick = () => {
        console.log("YE WALA");
        if ((this.state.pageNumber * this.props.pageSize) < this.props.totalRow.length) {
            let pageNumber = this.state.pageNumber;
            pageNumber++;
            this.setState({pageNumber});
            const renderRows = this.onPaginate(this.props.totalRow, this.props.pageSize, pageNumber);
            this.setState({renderRows});
            this.props.onNextClick(renderRows);
        }
    }
    componentDidMount = () => {
        this.onDefaultLoad();
    }

    onDefaultLoad(){
        let renderRows = this.onPaginate(this.props.totalRow, this.props.pageSize, this.state.pageNumber);
        this.props.onNextClick(renderRows)
        this.setState({ 'renderRows': renderRows });
    }

    render() {
        return (
            <div className="rTableFoot">
                <FontAwesomeIcon className="icon" icon={faArrowLeft} size="sm" onClick={()=>this.onPrevClick()} />
                {this.paginationInfo(this.props.totalRow, this.props.pageSize, this.state.pageNumber)}
                <FontAwesomeIcon className="icon" icon={faArrowRight} size="sm" onClick={()=>this.onNextClick()} />
            </div>
        );
    }
}

export default Paginate;
