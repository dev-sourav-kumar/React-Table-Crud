import React from 'react';

class Cell extends React.Component{
    
    render(){
        return (<div className="rTableCell" onClick = {(e)=>this.props.onRowClick(e, this.props)}>
                {this.props.title}
                </div>)
    }
}
export default Cell;