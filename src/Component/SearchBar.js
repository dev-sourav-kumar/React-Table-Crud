import React from 'react';
import { Form, FormGroup, Input } from 'reactstrap';

class SearchBar extends React.Component{
    state = {"term":''};

    
    onFormSubmit = (event) => {
        console.log("total, Row");
        event.preventDefault();
       // event.stopPropagation();
        this.setState({term:event.target.value})
                
        let result = this.props.rows.filter((currValue)=>{
            console.log("search", currValue[this.props.searchBy] , this.state.term);
            if(currValue[this.props.searchBy].toLowerCase().indexOf(this.state.term.toLowerCase()) !== -1){
                return currValue
            }
        });
        this.props.onSubmit(result, this.state.term);
    }

        
    render(){
        return (
         <div className="ui segment gutter"> 
             <form onSubmit={this.onFormSubmit} className="ui form">
                 <div className="field">
                    <div className="ui input">
                        <Input type="text" 
                        value = {this.state.term}
                        placeholder = {"Search by "+this.props.searchBy}
                        onChange={this.onFormSubmit}/>
                    </div>
                </div>
             </form>
          </div>
        );
    }
}

export default SearchBar;