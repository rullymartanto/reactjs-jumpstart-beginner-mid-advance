import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Progress, FormGroup } from 'reactstrap';

const propTypes = {
    loading: PropTypes.bool.isRequired,
}
let nIntervId;
class ProgressBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Progress: 1,
        }
        this.flashLoad = this.flashLoad.bind(this)
    }

    flashLoad() {
        if (this.state.Progress >= 100) {
            this.setState({ Progress: 10 })
        } else {
            this.setState({ Progress: this.state.Progress + 10 })
        }
    }

    componentWillUnmount() {
        clearInterval(nIntervId);
    }


    componentDidMount() {
        if (this.props.loading) {
            nIntervId = setInterval(this.flashLoad, 1000);
        }
    }

    render() {
        return (
            <FormGroup>
                {this.props.loading ?
                    <Progress animated color="success" value={100} className="mb-3" />
                    :
                    <Progress animated color="info" value={this.state.Progress} className="mb-3" />
                }
            </FormGroup>
        );
    }
}

ProgressBar.propTypes = propTypes;
export default ProgressBar;