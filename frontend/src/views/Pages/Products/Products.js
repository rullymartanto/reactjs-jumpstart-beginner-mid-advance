import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Table, Form, FormGroup, InputGroup, InputGroupAddon, Button, Input } from 'reactstrap';
import { productService } from '../../../_services/product.service';

import AddButton from '../../../shared/AddButton/AddButton';
import Paginations from '../../../shared/Pagination/Paginations';

function ProductRow(props) {
    const product = props.product
    const productLink = `/products/${product.productID}`

    return (
        <tr key={product.productId}>
            <th scope="row"><Link to={productLink}>{product.productSKU}</Link></th>
            <td><Link to={productLink}>{product.productName}</Link></td>
            <td>{product.productCartDesc}</td>
            <td>{product.productShortDesc}</td>
            <td>{product.productLongDecs}</td>
            <td>{product.productImage}</td>

        </tr>
    )
}

class Products extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            page: 1,
            max: 5,
            filter: '',
            error: false,
            records: 0,
            buttonText: 'Add Product',
            pageSize: 5,
        };

        this.onAddProduct = this.onAddProduct.bind(this)
        this.onChangePage = this.onChangePage.bind(this)
        this.onSearch = this.onSearch.bind(this)
        this.handleOnChange = this.handleOnChange.bind(this)
    }

    handleOnChange(e) {
        const { id, value } = e.target
        this.setState({ [id]: value })
    }

    onChangePage(page) {
        if (this.state.page !== page) {
            this.setState({
                page: page
            }, () => {
                this.fetchData();
            })
        }
    }

    onAddProduct() {
        this.props.history.push('/products/0');
    }

    onSearch(e) {
        e.preventDefault();
        this.fetchData()
    }

    fetchData() {
        const { page, max, filter } = this.state;
        productService.ProductGrid(page, max, filter)
            .then(res => {
                this.setState({ products: res.data.rows, records: res.data.count });
            }, error => {
                if (error.response.status === 401) {
                    this.props.history.push('/login')
                } else {
                    this.setState({ products: [], records :0 })
                }
            })
    }

    componentDidMount() {
        this.fetchData()
    }

    render() {

        const productList = this.state.products.length > 0 ? this.state.products : []

        return (
            <div className="animated fadeIn">
                <Row>
                    <Col xl={12}>
                        <Card>
                            <CardHeader>
                                <i className="fa fa-align-justify"></i> Products <small className="text-muted"></small>
                                <AddButton tooltipText={this.state.buttonText} onAddItem={this.onAddProduct} />
                            </CardHeader>
                            <CardBody>
                                <Form className="form-horizontal" onSubmit={this.onSearch}>
                                    <FormGroup row className="float-right">
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <Button type="submit" color="primary" ><i className="fa fa-search"></i> Search</Button>
                                            </InputGroupAddon>
                                            <Input type="text" id="filter" name="filter" placeholder="Product" value={this.state.filter} onChange={this.handleOnChange} />
                                        </InputGroup>
                                    </FormGroup>
                                </Form>
                                <Table responsive hover>
                                    <thead>
                                        <tr>
                                            <th scope="col">Product SkU</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Cart Desc</th>
                                            <th scope="col">Short Desc</th>
                                            <th scope="col">Long Desc</th>
                                            <th scope="col"></th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {productList.map((prod, index) =>
                                            <ProductRow key={index} product={prod} />
                                        )}
                                    </tbody>
                                </Table>

                                <Paginations
                                    items={this.state.records}
                                    pageSize={this.state.pageSize}
                                    currentPage={this.state.page}
                                    onChangePage={this.onChangePage} />

                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Products;
