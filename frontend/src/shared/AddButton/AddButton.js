import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { UncontrolledTooltip, Button } from 'reactstrap';

const propTypes = {
    tooltipText: PropTypes.string.isRequired,
    onAddItem: PropTypes.func.isRequired,
}
const defaultProps = {
    tooltipText: 'Add Item'
}

class AddButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }


    componentDidMount() {

    }

    render() {
        return (
            <div className="card-header-actions">
                <Button color="link" className="card-header-action btn-setting" id="TooltipExample"><i className="icon-plus" onClick={this.props.onAddItem} ></i></Button>
                <UncontrolledTooltip placement="bottom" target="TooltipExample">
                    {this.props.tooltipText}
            </UncontrolledTooltip>
            </div>
        );
    }
}

AddButton.propTypes = propTypes;
AddButton.defaultProps = defaultProps;
export default AddButton;