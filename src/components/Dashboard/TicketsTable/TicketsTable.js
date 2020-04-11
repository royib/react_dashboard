import React, { useState } from "react";
import { connect } from "react-redux";
import Checkbox from "@material-ui/core/Checkbox";
import "./TicketsTable.css";

import * as actions from "../../../store/actions/releaseRequestsA";

class TicketsTable extends React.Component {
  /*state = {
    chekedTickets: {}
  };*/
  componentDidMount() {
    // Detect when scrolled to bottom.
    this.refs.myscroll.addEventListener("scroll", () => {
      //console.log(this.refs.myscroll.scrollTop + this.refs.myscroll.clientHeight,this.refs.myscroll.scrollHeight);
      if (
        this.refs.myscroll.scrollTop + this.refs.myscroll.clientHeight >=
        this.refs.myscroll.scrollHeight - 1
      ) {
        this.props.onPaginationReleaseRequests();
      }
    });
  }
  onChecked = (e, request) => {
    e.stopPropagation();
    const { checkedRequests, onSetCheckedRequests } = this.props;

    let newCheckedRequests;
    if (e.target.checked) {
      newCheckedRequests = { ...checkedRequests, [request.id]: { ...request } };
    } else {
      newCheckedRequests = { ...checkedRequests };
      delete newCheckedRequests[request.id];
    }
    onSetCheckedRequests(newCheckedRequests);
  };
  onCheckAll = e => {
    let checkboxes = document.getElementsByName("ticketCheck");
    const { data, onSetCheckedRequests, onSetSelectAll } = this.props;
    const selectAllChecked = e.target.checked;

    // check or uncheck all
    for (var i = 0, n = checkboxes.length; i < n; i++) {
      checkboxes[i].checked = selectAllChecked;
    }
    let newCheckedRequests;
    if (selectAllChecked) {
      newCheckedRequests = data.reduce((accu, t) => {
        accu[t.id] = { ...t };
        return accu;
      }, {});
    } else {
      newCheckedRequests = {};
    }

    // update redux
    onSetCheckedRequests(newCheckedRequests);
    onSetSelectAll(selectAllChecked);
  };

  render() {
    const { data, onSingleSelect, checkedRequests } = this.props;
    //console.log(this.state.chekedTickets);
    return (
      <div className="tableContainer" ref="myscroll">
        <table>
          <thead>
            <tr>
              <th className="tableCell tableTh">
                <Checkbox
                  className="selectAll"
                  size="small"
                  color="default"
                  checked={this.props.selectAll}
                  inputProps={{ style: { "background-color": "white" } }}
                  onChange={this.onCheckAll}
                />
              </th>
              <th className="tableCell tableTh">id</th>
              <th className="tableCell tableTh">Request Time</th>
              <th className="tableCell tableTh">Requested By</th>
              <th className="tableCell tableTh">Recipient</th>
              <th className="tableCell tableTh">sender By</th>
              <th className="tableCell tableTh">subject</th>
              <th className="tableCell tableTh">category as</th>
            </tr>
          </thead>
          <tbody>
            {data.map(row => {
              return (
                <tr key={row.id} onClick={() => onSingleSelect(row)}>
                  <td className="tableCell">
                    <Checkbox
                      size="small"
                      name="ticketCheck"
                      color="default"
                      checked={checkedRequests[row.id] ? true : false}
                      onChange={e => this.onChecked(e, row)}
                    />
                  </td>
                  <td className="tableCell">{row.id}</td>
                  <td className="tableCell">{row.RequestTime}</td>
                  <td className="tableCell">{row.RequestedBy}</td>
                  <td className="tableCell">{row.Recipient}</td>
                  <td className="tableCell">{row.sender}</td>
                  <td className="tableCell">{row.subject}</td>
                  <td className="tableCell">{row.category.description}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    // onSetCheckedRequests: chekedTickets =>
    //  dispatch(actions.setCheckedRequests(chekedTickets)),
    // onPaginationReleaseRequests: checkedRequests =>
    //   dispatch(actions.paginationReleaseRequests()),
    // onSetSelectAll: selectAll => dispatch(actions.setSelectAll(selectAll))
    onSetSelectAll: selectAllChecked => dispatch(actions.setSelectAll(selectAllChecked)),
    onPaginationReleaseRequests: () =>
      dispatch(actions.paginationReleaseRequests()),
    onSetCheckedRequests: checkedRequests =>
      dispatch(actions.setCheckedRequests(checkedRequests))
  };
};
const mapStateToProps = state => {
  return {
    checkedRequests: state.releaseRequests.checkedRequests,
    selectAll: state.releaseRequests.selectAll
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TicketsTable);
