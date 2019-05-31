import React from 'react';
import DateComponent from './DateComponent'
import IncomeTaxDeclaraton from './IncomeTaxHomepage';

class App extends React.Component{
    render(){
        return(
            <div>
                {/* <DateComponent></DateComponent> */}
                <IncomeTaxDeclaraton></IncomeTaxDeclaraton>
            </div>

        )
    }
}

export default App;