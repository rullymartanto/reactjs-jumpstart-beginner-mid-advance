import React, { Component } from 'react';
import {
    Button,
    CardFooter,
    Form,
    FormGroup,
    FormFeedback,
    Input,
    Label,
    Row,
    Card,
    CardBody,
    CardHeader,
    Col,
} from 'reactstrap';

import ProgressBar from '../../../shared/ProgressBar/ProgressBar';

import { productService } from '../../../_services/product.service';

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productID: '',
            productSKU: '',
            productName: '',
            productWeight: '',
            productCartDesc: '',
            productShortDesc: '',
            productLongDecs: '',
            productThumb: '',
            productImage: '',
            mimetype: '',
            filename: '',
            loading: false,
            error: false
        }
        this.handleCancel = this.handleCancel.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.onhandleDelete = this.onhandleDelete.bind(this)
    }

    onhandleDelete(e) {
        e.preventDefault();
        productService.DeleteProduct(this.state.productID)
            .then(res => {
                this.setState({ loading: false }, () => this.props.history.push('/products'))
            }, error => {
                this.setState({ loading: false, error: true })
            })
    }

    handleChange(e) {
        const { id, value } = e.target
        this.setState({ [id]: value })
    }

    handleCancel() {
        this.props.history.push('/products')
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ loading: true })
        if (this.state.productID) {
            productService.UpdateProduct(this.state)
                .then(res => {
                    this.setState({ loading: false }, () => this.props.history.push('/products'))
                }, error => {
                    this.setState({ loading: false, error: true })
                })
        } else {
            productService.AddProduct(this.state)
                .then(res => {
                    this.setState({ loading: false }, () => this.props.history.push('/products'))
                }, error => {
                    this.setState({ loading: false, error: true })
                })
        }

    }

    fetchData() {
        productService.Product(this.props.match.params.id)
            .then(res => {
                const keys = Object.keys(res.data)
                if (keys.length > 0) {
                    for (const key of keys) {
                        this.setState({ [key]: res.data[key] })
                    }
                } else {
                    this.props.history.push('/products')
                }
            }, error => {

            })

    }

    componentDidMount() {
        if (this.props.match.params.id !== '0') {
            this.fetchData();
        }
    }

    render() {

        const product = this.state

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col lg={6}>
                        <Form className="form-horizontal was-validated" onSubmit={this.handleSubmit} >
                            <Card>
                                <CardHeader>
                                    <strong><i className="icon-info pr-1"></i>Product: {product.productName}</strong>
                                </CardHeader>
                                <CardBody>
                                    <FormGroup>
                                        <Label htmlFor="productSKU">Product SKU</Label>
                                        <Input type="text" className="form-control-warning" id="productSKU"
                                            value={product.productSKU} onChange={this.handleChange} placeholder="Enter your Product SKU" required />
                                        <FormFeedback className="help-block">Please provide a valid information</FormFeedback>
                                        <FormFeedback valid className="help-block">Input provided</FormFeedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="productName">Product Name</Label>
                                        <Input type="text" className="form-control-warning" id="productName"
                                            value={product.productName} onChange={this.handleChange} placeholder="Enter your Product Name" required />
                                        <FormFeedback className="help-block">Please provide a valid information</FormFeedback>
                                        <FormFeedback valid className="help-block">Input provided</FormFeedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="productWeight">Product Weight</Label>
                                        <Input type="number" className="form-control-warning" id="productWeight" step={0.01}
                                            value={product.productWeight} onChange={this.handleChange} placeholder="Enter your Product Weight" required />
                                        <FormFeedback className="help-block">Please provide a valid information</FormFeedback>
                                        <FormFeedback valid className="help-block">Input provided</FormFeedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="productCartDesc">Product Cart Description</Label>
                                        <Input type="textarea" id="productCartDesc" rows="2" value={product.productCartDesc} onChange={this.handleChange} placeholder="Cart Description..." required />
                                        <FormFeedback className="help-block">Please provide a valid information</FormFeedback>
                                        <FormFeedback valid className="help-block">Input provided</FormFeedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="productShortDesc">Product Short Description</Label>
                                        <Input type="textarea" id="productShortDesc" rows="4" value={product.productShortDesc} onChange={this.handleChange} placeholder="Short Description..." />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="productLongDecs">Product Long Description</Label>
                                        <Input type="textarea" id="productLongDecs" rows="8" value={product.productLongDecs} onChange={this.handleChange} placeholder="Long Description..." />
                                    </FormGroup>

                                    {product.loading ?
                                        <ProgressBar loading={product.loading} /> : ''}

                                </CardBody>

                                <CardFooter>
                                    <Button type="submit" color="primary">Save changes</Button>
                                    <Button color="secondary" onClick={this.handleCancel} >Cancel</Button>
                                    {this.state.productID ?
                                        <Button color="danger" className="float-right" onClick={this.onhandleDelete} ><i className="fa fa-times"></i> Delete</Button>
                                        : ''}
                                </CardFooter>
                            </Card>
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Product;
