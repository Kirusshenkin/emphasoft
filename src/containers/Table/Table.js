import React, {Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortDown,faSortUp } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux'
import {fetchInformation} from '../../store/actions/information'
import Table from 'react-bootstrap/Table'

// import _ from 'lodash'

class Сharacter extends Component {

  componentDidMount() {
    this.props.fetchInformation()
  }



  render() {
    return (
    <Table>
      <thead>
        <tr>
          <th scope="col">
            ID {this.props.sortField === 'id' ? <FontAwesomeIcon icon={(this.props.sort === 'desc') ? faSortDown : faSortUp}/> : null}
          </th>
          <th scope="col">Имя</th>
          <th scope="col">Фамилия</th>
          <th scope="col">Антивен</th>
          <th scope="col">Дата</th>
          <th scope="col">Разрешение</th>
        </tr>
      </thead>
      <tbody>
        {this.props.information ? this.props.information.map((item, key) => (
          <tr key={key}>
            <th>{item.id}</th>
            <td>{item.username}</td>
            <td>{item.first_name}</td>
            <td>{item.last_name}</td>
            <td>{item.is_active}</td>
            <td>{item.last_login}</td>
            <td>{item.is_superuser}</td>
          </tr>
        )): null}
      </tbody>
    </Table>
    )
  }
}

function mapStateToProps(state) {
  console.log(state)
  return {
    information: state.information.information,
    // isLoading: state.information.isLoading,
    // sortField: state.information.sortField,
    // sort: state.information.sort,
    // row: state.information.row,
    // currentPage: state.information.currentPage,
    // search: state.information.search,
    // error: state.information.error
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchInformation: () => dispatch(fetchInformation())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Сharacter)