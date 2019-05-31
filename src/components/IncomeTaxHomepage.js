import React from 'react';

class IncomeTaxDeclaraton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            grossIncome: 0,
            taxableIncome: 0,
            deductions: 0,
            defaultDeductions: 250000,
            taxToPay:0
        }

    }

    grossIncomeChangeHandler = (event) => {
        this.setState({
            grossIncome: event.target.value,
            taxableIncome: event.target.value-this.state.defaultDeductions,
        })
    }

    deductionsChangeHandler = (event) => {
        this.setState({
            deductions: event.target.value,
            taxableIncome:this.state.grossIncome-event.target.value-this.state.defaultDeductions
        })
    }

    calculateTax = () => {
        let fivePercentSlab = 250000;
        let secondSlab = 1000000;

        if(this.state.taxableIncome>=fivePercentSlab){
            var tax = (fivePercentSlab*5)/100;
            let leftAmount = this.state.taxableIncome-fivePercentSlab;

            if(leftAmount>0 &&leftAmount<secondSlab){
                tax = tax + (leftAmount*20)/100;
            }
            else if(leftAmount>0 &&leftAmount>secondSlab){
                tax = tax+ (secondSlab*20)/100;
                leftAmount = leftAmount - secondSlab;

                if(leftAmount>0){
                    tax = tax+ (leftAmount*30)/100;
                }
            }
        }

        this.setState({
            taxToPay : tax,
        })
    }

    render() {
        return (
            <div>
                <div>
                    <span>Gross Income:</span><input type='text' value={this.state.grossIncome} onChange={this.grossIncomeChangeHandler}></input>
                </div>
                <div>
                    <span>Deductions by govt: {this.state.defaultDeductions}</span>
                </div>
                <div>
                    <span>Deductions:</span><input type='text' value={this.state.deductions} onChange={this.deductionsChangeHandler}></input>
                </div>
                <div>
                    <span>Taxable Income:</span><span> {this.state.taxableIncome}</span>
                </div>
                <div>
                    <button onClick={this.calculateTax}> Calculate Tax</button>  Tax to Pay: {this.state.taxToPay}
                </div>
            </div>
        )
    }
}

export default IncomeTaxDeclaraton;