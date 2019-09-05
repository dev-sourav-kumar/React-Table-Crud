import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'

class Header extends React.Component {
    

    render() {
        const header = this.props.row.map((currValue, index) => {
                let header =  currValue[this.props.renderKey];
                
            return (<div className="rTableHead" key={currValue+index}>
                {header}
                     
                <FontAwesomeIcon  className="float-rt icon" icon={faArrowUp} size="xs"  onClick={(e)=>this.props.onSortClick(e, header.toLowerCase(), true)} />
                <FontAwesomeIcon  className="float-rt icon" icon={faArrowDown} size="xs"  onClick={(e)=>this.props.onSortClick(e, header.toLowerCase(), false)} />
            </div>);
        });
        return (<div className="rTableRow">
                {header}
            <div className="rTableHead">
                Action
            </div>
        </div>)
    }
}

export default Header;