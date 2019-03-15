import React,{Component} from 'react';

export default class Header extends Component{
    constructor (props){
        super(props);
    }

    render(){
        return(
            <div className='header'>
                <h3 className='text-center'>{this.props.title}</h3>
                {typeof this.props.text !== "undefined" ? <p className='text-justify'>{this.props.text}</p> : ''}                
            </div>
        );
    }
}