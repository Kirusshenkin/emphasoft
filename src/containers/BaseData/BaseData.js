import React, { Component, Fragment } from 'react'
import ReactPaginate from 'react-paginate'
import { connect } from 'react-redux'
import {fetchInformation} from '../../store/actions/information'
import Loader from '../../components/UI/Loader/Loader'
import TableSearch from '../../components/TableSearch/TableSearch'
import Container from 'react-bootstrap/Container'
import { Row, Col, Table } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faSortDown,faSortUp } from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash'

class BaseData extends Component {

    componentDidMount() {
        this.props.fetchInformation()
    }

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
        console.log(this.props.information)

        if(!search) {
            return information
        }

        return information.filter(item => {
            return item['id'].toLowerCase().includes(search.toLowerCase())
        })
    }

    // renderTable() {
    //     return (
    //     <Table>
    //         <thead>
    //             <tr>
    //                 <th scope="col">
    //                 ID {this.sortField === 'id' ? <FontAwesomeIcon icon={(this.props.sort === 'desc') ? faSortDown : faSortUp}/> : null}
    //                 </th>
    //                 <th scope="col">Имя</th>
    //                 <th scope="col">Фамилия</th>
    //                 <th scope="col">Антивен</th>
    //                 <th scope="col">Дата</th>
    //                 <th scope="col">Разрешение</th>
    //             </tr>
    //         </thead>
    //         <tbody>
    //             {this.props.information ? this.props.information.map((item, key) => (
    //                 <tr key={key}>
    //                     <th>{item.id}</th>
    //                     <th>{item.username}</th>
    //                     <th>{item.first_name}</th>
    //                     <th>{item.last_name}</th>
    //                     <td>{item.is_active}</td>
    //                     <td>{item.last_login}</td>
    //                     <td>{item.is_superuser}</td>
    //                 </tr>
    //             )): null}
    //         </tbody>
    //     </Table>
    //     )
    // }

    render() {
        // debugger 
        const pageSize = 50
        const filteredData = this.getFilteredData()
        const pageCount = Math.ceil(filteredData.length / pageSize)
        const displayData = _.chuck(filteredData, pageSize)[this.props.currentPage]

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
                                <Table
                                    information={displayData}
                                    onSort={this.onSort}
                                    sort={this.props.information.sort}
                                    sortField={this.props.information.sortField}
                                    onRowSelect={this.onRowSelect}
                                />
                                </Fragment>
                            }
                            {
                                this.props.information.length > pageSize
                                ? <ReactPaginate
                                    previousLabel={'<'}
                                    nextLabel={'>'}
                                    breakLabel={'...'}
                                    breakClassName={'break-me'}
                                    pageCount={pageCount}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={5}
                                    onPageChange={this.pageChangeHandler}
                                    containerClassName={'pagination'}
                                    activeClassName={'active'}
                                    pageClassName={'page-item'}
                                    pageLinkClassName={'page-link'}
                                    previousClassName={'page-item'}
                                    nextClassName={'page-item'}
                                    previousLinkClassName={'page-link'}
                                    nextLinkClassName={'page-link'}
                                    forcePage={this.props.currentPage}
                                />
                                : null
                            }
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    console.log(state.information)
    return {
        information: state.information.information,
        isLoading: state.information.isLoading
    }
}

function mapDispatchToProps(dispatch) {
    return {
      fetchInformation: () => dispatch(fetchInformation())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseData)