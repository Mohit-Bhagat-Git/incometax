import React from 'react';
import ReturnsOnSavings from './ReturnsOnSavings';

class IncomeTaxDeclaraton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            grossIncome: 0,
            taxableIncome: 0,
            deductions: 0,
            defaultDeductions: 250000,
            taxToPay: 0,
            taxOnSlab1: 0,
            taxOnSlab2: 0,
            taxOnSlab3: 0,

        }

    }

    grossIncomeChangeHandler = (event) => {
        this.setState({
            grossIncome: event.target.value,
            taxableIncome: event.target.value - this.state.defaultDeductions,
        })
    }

    deductionsChangeHandler = (event) => {
        this.setState({
            deductions: event.target.value,
            taxableIncome: this.state.grossIncome - event.target.value - this.state.defaultDeductions
        })
    }

    calculateTax = () => {
        let fivePercentSlab = 250000;
        let secondSlab = 1000000;

        if (this.state.taxableIncome >= fivePercentSlab) {
            var tax = (fivePercentSlab * 5) / 100;
            this.state.taxOnSlab1 = tax;
            let leftAmount = this.state.taxableIncome - fivePercentSlab;

            if (leftAmount > 0 && leftAmount < secondSlab) {
                let taxSlab2 = (leftAmount * 20) / 100;
                tax = tax + taxSlab2;
                this.state.taxOnSlab2 = taxSlab2;
                //leftAmount = leftAmount - secondSlab;

            }

            if (leftAmount > 0 && leftAmount > secondSlab){
                let taxSlab2 = (secondSlab * 20) / 100;
                tax = tax + taxSlab2;
                this.state.taxOnSlab2 = taxSlab2;
                leftAmount = leftAmount - secondSlab;
            }
            
            if (leftAmount > 0) {
                let taxSlab3 = (leftAmount * 30) / 100;
                tax = tax + taxSlab3;
                this.state.taxOnSlab3 = taxSlab3;
            }

        }

        this.setState({
            taxToPay: tax,
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
                <ReturnsOnSavings></ReturnsOnSavings>
                <div>
                    <button onClick={this.calculateTax}> Calculate Tax</button>  Tax to Pay: {this.state.taxToPay}
                </div>
                <div>
                    Details: 
                    <div><span>5%</span><span> {this.state.taxOnSlab1}</span></div>
                    <div><span>20%</span><span> {this.state.taxOnSlab2}</span></div>
                    <div><span>30%</span><span> {this.state.taxOnSlab3}</span></div>
                </div>
            </div>
        )
    }
}

export default IncomeTaxDeclaraton;