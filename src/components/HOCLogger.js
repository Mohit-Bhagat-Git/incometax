import React from 'react'
const HOCLogger =  function (WrappedComponent){
    return class extends React.Component{
        constructor(props){
            super(props);
            this.name = 'mohit';

        }
        render(){
            return(
                <WrappedComponent name={this.name}></WrappedComponent>
            )
        }
    }
}

export default HOCLogger