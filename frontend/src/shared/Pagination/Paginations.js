import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const propTypes = {
    items: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    initialPage: PropTypes.number
}

const defaultProps = {
    initialPage: 1
}

class Paginations extends Component {

    constructor(props) {
        super(props);
        this.state = {
            totalItems: '',
            pages: [],
            currentPage: 1,
            totalPages: ''
        };
    }

    componentDidMount() {
        this.setPage(this.props.currentPage);
    }

    componentDidUpdate(prevProps, prevState) {
        // || this.props.currentPage !== prevState.currentPage
        if (this.props.items !== prevProps.items || this.props.pageSize !== prevProps.pageSize) {
            this.setPage(this.props.initialPage);
        }
    }

    setPage(page) {
        var totalItems = this.props.items;
        var pageSize = this.props.pageSize;
        var currentPage = this.state.currentPage;

        const totalPages = Math.ceil(totalItems / pageSize);
        if (page <= totalPages && page > 0) {
            var startPage, endPage;
            if (totalPages <= 10) {
                startPage = 1;
                endPage = totalPages;
            } else {
                if (currentPage <= 6) {
                    startPage = 1;
                    endPage = 10;
                } else if (currentPage + 4 >= totalPages) {
                    startPage = totalPages - 9;
                    endPage = totalPages;
                } else {
                    startPage = currentPage - 5;
                    endPage = currentPage + 4;
                }
            }

            // var startIndex = (currentPage - 1) * pageSize;
            // var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

            let pages = _.range(startPage, endPage + 1);

            this.setState({ pages: pages, totalPages: totalPages, currentPage: page },
                () => {
                    this.props.onChangePage(page);
                });
        } else {
            this.setState({ pages: [], totalPages: 1, currentPage: 1 },
                () => {
                    this.props.onChangePage(page);
                });
        }
    }

    render() {
        let pager = this.state;
        return (
            <Pagination>
                <PaginationItem disabled={pager.currentPage === 1 ? true : false} >
                    <PaginationLink tag="button" onClick={() => this.setPage(1)}>
                        First
                </PaginationLink>
                </PaginationItem>
                <PaginationItem disabled={pager.currentPage === 1 ? true : false} >
                    <PaginationLink previous tag="button" onClick={() => this.setPage(pager.currentPage - 1)}/>
                </PaginationItem>
                {pager.pages.map((page, index) =>
                    <PaginationItem active={pager.currentPage === page ? true : false} key={index} >
                        <PaginationLink tag="button" onClick={() => this.setPage(page)}>
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                )}
                <PaginationItem disabled={pager.currentPage === pager.totalPages ? true : false}>
                    <PaginationLink next tag="button" onClick={() => this.setPage(pager.totalPages)} />
                </PaginationItem>
                <PaginationItem disabled={pager.currentPage === pager.totalPages ? true : false}>
                    <PaginationLink tag="button" onClick={() => this.setPage(pager.totalPages)}>
                        Last
                </PaginationLink>
                </PaginationItem>
            </Pagination>
        );
    }
}

Paginations.propTypes = propTypes;
Paginations.defaultProps = defaultProps;
export default Paginations;