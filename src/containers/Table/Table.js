import React, {Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortDown,faSortUp } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux'
import {fetchInformation, fetchSort} from '../../store/actions/information'
import Container from 'react-bootstrap/Container'
import { Row, Col, Table } from 'react-bootstrap';
import _ from 'lodash'
import Loader from '../../components/UI/Loader/Loader'
import './Table.css'
import moment from 'moment';
import TableSearch from '../../components/TableSearch/TableSearch'
import {fetchSearch} from '../../store/actions/search'

class Сharacter extends Component {

  componentDidMount() {
    this.props.fetchInformation()
  }

  onSort = sortField => {
    const sort = this.props.sort === 'asc' ? 'desc' : 'asc'
    this.props.fetchSort(sort, sortField)
  }

  searchHandler = search => {
    this.props.fetchSearch(search)
  }

  displayDate(date) {
    return date ? moment(date).locale('ru').format('LL') : ''
  }

  render() {
    if(this.props.isLoading)
    return <div className="BaseData"><Loader/></div>
    return (
      <div className="BaseData w-100">
      <Container>
        <Row>
          <Col>
          <TableSearch
            onSearch={this.searchHandler}
            onKeyPress={this.searchHandler}
          />
            <Table className="w-100">
              <thead>
                <tr>
                  <th onClick={this.onSort.bind(null, 'id')}>
                    ID {this.props.sortField === 'id' ? <FontAwesomeIcon icon={(this.props.sort === 'desc') ? faSortDown : faSortUp}/> : null}
                  </th>
                  <th>Никнейм</th>
                  <th>Имя</th>
                  <th>Фамилия</th>
                  <th>Антивен</th>
                  <th>Дата</th>
                  <th>Разрешение</th>
                </tr>
              </thead>
              <tbody>
                {this.props.users ? this.props.users.map((item, key) => (
                  <tr key={key}>
                    <th>{item.id}</th>
                    <td>{item.username}</td>
                    <td>{item.first_name}</td>
                    <td>{item.last_name}</td>
                    <td className="list-user">{item.is_active ? <div className="user-active online"/> : <div className="user-active offline"/>}</td>
                    <td>{this.displayDate(item.last_login)}</td>
                    <td>{item.is_superuser ? 'Есть' : 'Нету'}</td>
                  </tr>
                )): null}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      </div>
    )
  }
}

function mapStateToProps(state) {
  let data = state.users.data
  data = data.filter(item => item.username.toLowerCase().includes(state.search.payload.toLowerCase()))
  data = _.orderBy(data, state.users.sortField, state.users.sort)
  return {
    users: data,
    isLoading: state.users.isLoading,
    sortField: state.users.sortField,
    sort: state.users.sort,
    search: state.search.payload,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchInformation: () => dispatch(fetchInformation()),
    fetchSearch: (search) => dispatch(fetchSearch(search)),
    fetchSort: (sort, sortField) => dispatch(fetchSort(sort, sortField)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Сharacter)