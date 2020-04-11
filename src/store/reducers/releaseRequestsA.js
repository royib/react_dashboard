import * as actionTypes from "../actions/actionTypes";

const initialState = {
  releaseRequests: {
    status: 0,
    searchPhrase: "",
    page_start: 0,
    page_end: 0,
    page_size: 0,
    fetchInProgress: false,
    results_number: 0,
    selectAll: false,
    requests: [],
    checkedRequests: []
  },
  error: false,
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CHECKED_REQUESTS:
      return {
        ...state,
        releaseRequests: {
          ...state.releaseRequests,
          checkedRequests: action.checkedRequests
        }
      };
    case actionTypes.SET_FETCH_IN_PROGRESS:
      return {
        ...state,
        releaseRequests: {
          ...state.releaseRequests,
          fetchInProgress: action.fetchStatus
        }
      };
    case actionTypes.SET_LOADING_STATUS:
      return {
        ...state,
        loading: action.loading
      };
    case actionTypes.SET_RELEASE_REQUESTS_FAILED:
      return {
        ...state,
        error: true
      };
    case actionTypes.SET_RELEASE_REQUESTS_PARAMS:
      return {
        ...state,
        releaseRequests: {
          ...state.releaseRequests,
          ...action.newReleaseRequestsParams
        }
      };
    default:
      return state;
  }
};

export default reducer;
