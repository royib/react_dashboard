import React from "react";
import "./TicketDetails.css";

export default props => {
  const { selectedTicket } = props;
  return (
    <div className="ticketDetails">
      <div>
        <div className="tabHeader">Details</div>
        {selectedTicket ? (
          <div className="ticketContent">
            <div className="emailInfo">
              <div className="rowHeader">Email Information</div>
              <div className="detailsRow">
                <div>Id</div>
                <div>{selectedTicket.id}</div>
              </div>
              <div className="detailsRow">
                <div>Recieved Time</div>
                <div>{selectedTicket.ReceivedTime}</div>
              </div>
              <div className="detailsRow">
                <div>Recipient</div>
                <div>{selectedTicket.Recipient}</div>
              </div>
              <div className="detailsRow">
                <div>sender</div>
                <div>{selectedTicket.sender}</div>
              </div>
              <div className="detailsRow">
                <div>subject</div>
                <div>{selectedTicket.subject}</div>
              </div>
              <div className="detailsRow">
                <div>categorized as</div>
                <div>{selectedTicket.category.description}</div>
              </div>
            </div>
            <div className="requestInfo">
              <div className="rowHeader">Request Information</div>
              <div className="detailsRow">
                <div>Request Time</div>
                <div>{selectedTicket.RequestTime}</div>
              </div>
              <div className="detailsRow">
                <div>Requested By</div>
                <div>{selectedTicket.RequestedBy}</div>
              </div>
              <div className="detailsRow">
                <div>justification</div>
                <div>{selectedTicket.justification}</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="ticketContent">Please select a ticket</div>
        )}
      </div>
    </div>
  );
};
