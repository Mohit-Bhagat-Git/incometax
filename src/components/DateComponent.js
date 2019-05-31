import React from 'react';
import HOCLogger from './HOCLogger';

class DateComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            date: new Date().toDateString(),
            seconds: new Date().getSeconds(),
            name: 'mohit'
        }
    }

    startTimer = () => {
        var that = this;
        window.setInterval(function () {
            that.setState({
                date: new Date().toDateString(),
                seconds: new Date().getSeconds(), 
            })
        }, 1000)
    }
    render() {
        console.log()
        console.log(this.state.seconds)
        return (
            <div>
                <div>{this.state.date}: {this.state.seconds}</div>
                <button onClick={() => this.startTimer()}>{this.props.name}</button>
            </div>
        )
    }
}

export default HOCLogger(DateComponent);