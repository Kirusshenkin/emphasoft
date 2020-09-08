import React, {Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortDown,faSortUp } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux'
import {fetchInformation, fetchSort, fetchEditField, fetchEdit, fetchEditSave} from '../../store/actions/information'
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

  editHandler(id) {
    this.props.fetchEdit(id)
  }

  onChangeHandler(event, id, field) {
    this.props.fetchEditField(id, field, event.target.value)
  }

  saveHandler(item) {
    this.props.fetchEditSave(item, (res, data) => {
      if(!res) {
        alert(JSON.stringify(data.data))
      } else {
        this.props.fetchEdit(item.id)
      }
    })
  }

  render() {
    if(this.props.isLoading)
    return <div className="BaseData"><Loader/></div>
    return (
      <div className="BaseData w-100">
      <Container fluid="sm">
        <Row>
          <Col>
          <TableSearch
            onSearch={this.searchHandler}
            onKeyPress={this.searchHandler}
          />
          <div className="table-responsive-sm">
            <Table bordered responsive="md" className="rwd-table">
              <thead>
                <tr>
                  <th onClick={this.onSort.bind(null, 'id')}>
                    ID {this.props.sortField === 'id' ? <FontAwesomeIcon icon={(this.props.sort === 'desc') ? faSortDown : faSortUp}/> : null}
                  </th>
                  <th>Имя пользователя</th>
                  <th>Имя</th>
                  <th>Фамилия</th>
                  <th>Пароль</th>
                  <th>Дата</th>
                  <th>Разрешение</th>
                </tr>
              </thead>
              <tbody>
                {this.props.users ? this.props.users.map((item, key) => (
                  <tr key={key}>
                    <td data-th="ID">{!item.is_edit ? <span>{item.id}</span> : <input disabled="disabled" defaultValue={item.id}/>}</td>
                    <td data-th="Имя польз.">{!item.is_edit ? <span>{item.username}</span> : <input type="text" defaultValue={item.username} onChange={event => this.onChangeHandler(event, item.id,'username')}/>}</td>
                    <td data-th="Имя">{!item.is_edit ? <span>{item.first_name}</span> : <input type="text" defaultValue={item.first_name} onChange={event => this.onChangeHandler(event, item.id,'first_name')}/>}</td>
                    <td data-th="Фамилия">{!item.is_edit ? <span>{item.last_name}</span> : <input type="text" defaultValue={item.last_name} onChange={event => this.onChangeHandler(event, item.id,'last_name')}/>}</td>
                    <td data-th="Пароль">{!item.is_edit ? <span>{item.password}</span> : <input type="text" defaultValue={item.password} onChange={event => this.onChangeHandler(event, item.id,'password')}/>}</td>
                    <td data-th="Дата">{this.displayDate(item.last_login)}</td>
                    <td data-th="Разрешение">{!item.is_edit ? <span>{item.is_superuser ? 'Есть' : 'Нету'}</span> : <input type="checkbox" onChange={event => this.onChangeHandler(event, item.id,'is_superuser')}/>}</td>
                    <td data-th="">
                      {!item.is_edit ?
                      <button
                        className="btn btn-light"
                        onClick={() => {this.editHandler(item.id)}}
                        >
                          Редактировать
                      </button>
                      :
                      <button
                        className="btn btn-light"
                        onClick={() => {this.saveHandler(item)}}
                        >
                        Сохранить
                      </button>
                      }
                    </td>
                  </tr>
                )): null}
              </tbody>
            </Table>
            </div>
          </Col>
        </Row>
      </Container>
      </div>
    )
  }
}

function mapStateToProps(state) {
  let data = state.users.data
  data = data.filter(item => item.is_active)
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
    fetchEditSave: (item, cb) => dispatch(fetchEditSave(item, cb)),
    fetchEditField: (id, field, value) => dispatch(fetchEditField(id, field, value)),
    fetchEdit: (id) => dispatch(fetchEdit(id)),
    fetchInformation: () => dispatch(fetchInformation()),
    fetchSearch: (search) => dispatch(fetchSearch(search)),
    fetchSort: (sort, sortField) => dispatch(fetchSort(sort, sortField)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Сharacter)