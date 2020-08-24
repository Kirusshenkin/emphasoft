import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Loader from '../../components/UI/Loader/Loader'
import TableSearch from '../../components/TableSearch/TableSearch'
import Container from 'react-bootstrap/Container'
import { Row, Col, Table } from 'react-bootstrap';
import _ from 'lodash'

class BaseData extends Component {

    onSort = sortField => {
        const clonedData = this.props.information.concat()
        const sort = this.props.sort === 'asc' ? 'desc' : 'asc'
        const data = _.orderBy(clonedData, sortField, sort)
        this.props.information({data, sort, sortField})
    }

    pageChangeHandler = ({selected}) => {
        this.props.information({currentPage: selected})
    }

    searchHandler = search => {
        this.props.information({search, currentPage: 0})
    }

    onRowSelect = row => {
        this.props.information({row})
    }

    getFilteredData() {
        const {information, search} = this.props.information

        if(!search) {
            return information
        }

        return information.filter(item => {
            return item['id'].toLowerCase().includes(search.toLowerCase())
        })
    }

    render() {
        const pageSize = 50
        const filteredData = this.getFilteredData()
        const pageCount = Math.ceil(filteredData.length / pageSize)
        const display = _.chuck(filteredData, pageSize)[this.props.currentPage]

        return (
            <Fragment>
                <Container>
                    <Row>
                        <Col>
                            {
                            this.props.isLoading
                            ? <Loader/>
                            :   <Fragment>
                                <TableSearch
                                    onSearch={this.searchHandler}
                                    onKeyPress={this.searchHandler}
                                />
                                <Table/>
                                </Fragment>
                            }
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        information: state.information.information,
        isLoading: state.information.isLoading,
        sortField: state.information.sortField,
        sort: state.information.sort,
        row: state.information.row,
        currentPage: state.information.currentPage,
        search: state.information.search,
        error: state.information.error
    }
}

export default connect(mapStateToProps)(BaseData)