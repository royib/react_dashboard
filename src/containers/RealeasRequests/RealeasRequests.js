import React from "react";
import "./RealeasRequests.css";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";

import Snakebar from "../../components/Feedback/Snackbar";
import ActionBar from "../../components/Dashboard/ActionBar/ActionBar";
import TicketsTable from "../../components/Dashboard/TicketsTable/TicketsTable";
import TicketDetails from "../../components/Dashboard/TicketDetails/TicketDetails";

import * as actions from "../../store/actions/releaseRequestsA";

class RealeaseRequests extends React.Component {
  state = {
    selectedTicket: null
  };
  componentDidMount() {
    this.props.onInitReleaseRequest();
  }
  onSingleSelect_EventHandler = selectedTicket => {
    this.setState({ selectedTicket: selectedTicket });
  };

  render() {
    const { selectedTicket } = this.state;
    const {
      releaseRequests,
      onStatusChange,
      onSearchOccured,
      onInitReleaseRequest,
      onChangeRequestStatusAction
    } = this.props;

    return (
      <div className="RealeaseRequestsContainer">
        <div>{this.props.loading}</div>
        <div className="section">
          <ActionBar
            onStatusChange={onStatusChange}
            onSearch={onSearchOccured}
            onRefresh={() => onInitReleaseRequest()}
            onRealese={() => onChangeRequestStatusAction(2)}
            onReject={() => onChangeRequestStatusAction(3)}
            status={releaseRequests.status}
          />
        </div>
        <div className="section">
          <TicketsTable
            data={releaseRequests.requests}
            onSingleSelect={this.onSingleSelect_EventHandler}
          />
        </div>
        <div>
          <TicketDetails selectedTicket={selectedTicket} />
        </div>
        {this.props.loading ? (
          <CircularProgress className="circularProgress" size={80} />
        ) : null}
        <Snakebar isOpen={this.props.error} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    releaseRequests: state.releaseRequests,
    checkedRequests: state.checkedRequests,
    error: state.error,
    loading: state.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    /*onInitReleaseRequests: () => dispatch(actions.initReleaseRequests()),
    onStatusChange: selectedStatus =>
      dispatch(actions.fetchReleaseRequestsByStatus(selectedStatus)),
    onFetchReleaseRequestsBySearch: searchText =>
      dispatch(actions.fetchReleaseRequestsBySearch(searchText)),
    onSetCheckedRequests: chekedTickets =>
      dispatch(actions.setCheckedRequests(chekedTickets)),
    ticketStatusAction: checkedRequests =>
      dispatch(actions.ticketStatusAction(checkedRequests))*/
    onSearchOccured: searchText => dispatch(actions.searchOccured(searchText)),
    onInitReleaseRequest: () => dispatch(actions.initReleaseRequest()),
    onStatusChange: selectedStatus =>
      dispatch(actions.statusChanged(selectedStatus)),
    onChangeRequestStatusAction: newStatus =>
      dispatch(actions.changeRequestStatusAction(newStatus))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RealeaseRequests);
