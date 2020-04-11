import { statuses } from "./common";

export const changeStatus = (tickets, status) => {
  return Object.keys(tickets).reduce((accu, ticketKey) => {
    tickets[ticketKey].status = statuses[status];
    accu.push(tickets[ticketKey]);
    return accu;
  }, []);
   
};
