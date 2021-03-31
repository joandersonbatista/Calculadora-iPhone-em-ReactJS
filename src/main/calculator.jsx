import React, { Component } from 'react'
import "./calculator.css"
import Button from '../components/Button.jsx'
import Display from '../components/display'
import { values } from 'lodash'

const inicial = {
    display: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class Calculator extends Component {

    state = {...inicial}

    limpar() {
        this.setState({ ...inicial })
    }

    setOperation(operation) {
        if (this.state.current === 0) {
            this.setState({ operation, current: 1, clearDisplay: true })
        } else {
            const equals = operation === '='
            const currentOperation = this.state.operation

            const values = [...this.state.values]
            try {
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
            } catch(e) {
                values[0] = this.state.values[0]
            }

            values[1] = 0

            this.setState({
                display: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })
        }
    }

    Addnumero(n) {
        if (n === '.' && this.state.display.includes('.')) {
            return
        }

        const clearDisplay = this.state.display === '0'
            || this.state.clearDisplay
        const currentValue = clearDisplay ? '' : this.state.display
        const display = currentValue + n
        this.setState({ display, clearDisplay: false })

        if (n !== '.') {
            const i = this.state.current
            const newValue = parseFloat(display)
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({ values })
            console.log(values)
        }
    }


    render() {
        return (
            <div className="calculator">
                <Display value={this.state.display}/>
                <Button label="AC" triple click={() => this.limpar()}/>
                <Button label="/" click={n => this.setOperation(n)} operation/>
                <Button label="7" click={n => this.Addnumero(n)}/>
                <Button label="8" click={n => this.Addnumero(n)}/>
                <Button label="9" click={n => this.Addnumero(n)}/>
                <Button label="*" click={n => this.setOperation(n)} operation/>
                <Button label="4" click={n => this.Addnumero(n)}/>
                <Button label="5" click={n => this.Addnumero(n)}/>
                <Button label="6" click={n => this.Addnumero(n)}/>
                <Button label="-" click={n => this.setOperation(n)} operation/>
                <Button label="1" click={n => this.Addnumero(n)}/>
                <Button label="2" click={n => this.Addnumero(n)}/>
                <Button label="3" click={n => this.Addnumero(n)}/>
                <Button label="+" click={n => this.setOperation(n)} operation/>
                <Button label="0" click={n => this.Addnumero(n)} double/>
                <Button label="." click={n => this.Addnumero(n)}/>
                <Button label="=" click={n => this.setOperation(n)}operation/>
            </div>
        )
    }
}