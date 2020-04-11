import * as actionTypes from "./actionTypes";
import api from "../../api";
import { changeStatus } from "../../utils";
import { keys } from "@material-ui/core/styles/createBreakpoints";

const page_size = 20;
const defaultSort = "_sort=id&_order=asc";

// synced action creators

export const setCheckedRequests = checkedRequests => {
  return {
    type: actionTypes.SET_CHECKED_REQUESTS,
    checkedRequests: checkedRequests
  };
};
export const setLoadingRequests = loadingStatus => {
  return {
    type: actionTypes.SET_LOADING_STATUS,
    loading: loadingStatus
  };
};
export const featchDataAsyncFailed = () => {
  return {
    type: actionTypes.SET_RELEASE_REQUESTS_FAILED
  };
};
export const seteReleaseRequestParams = newReleaseRequestsParams => {
  return {
    type: actionTypes.SET_RELEASE_REQUESTS_PARAMS,
    newReleaseRequestsParams: newReleaseRequestsParams
  };
};
export const initReleaseRequest = () => {
  return (dispatch, getState) => {
    const currentReleaseRequestsParams = getState().releaseRequests;
    const newReleaseRequests = {
      ...currentReleaseRequestsParams,
      status: 1,
      searchPhrase: "",
      page_start: 0,
      page_end: page_size,
      page_size: page_size,
      results_number: 0,
      selectAll: false,
      requests: [],
      checkedRequests: {}
    };
    dispatch(seteReleaseRequestParams(newReleaseRequests));
    dispatch(featchDataAsync());
  };
};
export const paginationReleaseRequests = () => {
  return (dispatch, getState) => {
    const { releaseRequests, loading } = getState();
    const currentReleaseRequestsParams = releaseRequests;
    // check if we have more results in db ?
    if (
      currentReleaseRequestsParams.results_number >
      currentReleaseRequestsParams.page_end
    ) {
      // calc page end
      const newPage_end =
        currentReleaseRequestsParams.page_end + page_size <
        currentReleaseRequestsParams.results_number
          ? currentReleaseRequestsParams.page_end + page_size
          : currentReleaseRequestsParams.results_number;

      const newReleaseRequests = {
        ...currentReleaseRequestsParams,
        page_start: currentReleaseRequestsParams.page_end,
        page_end: newPage_end,
        checkedRequests: {},
        selectAll: false
      };
      dispatch(seteReleaseRequestParams(newReleaseRequests));
      if (getState().loading) {
        console.log("legging");
        setTimeout(() => {
          dispatch(featchDataAsync());
        }, 500);
      } else {
        dispatch(featchDataAsync());
      }
    }
  };
};
export const statusChanged = status => {
  return (dispatch, getState) => {
    const currentReleaseRequestsParams = getState().releaseRequests;
    const newReleaseRequests = {
      ...currentReleaseRequestsParams,
      status: status,
      searchPhrase: "",
      page_start: 0,
      page_end: page_size,
      results_number: 0,
      selectAll: false,
      requests: [],
      checkedRequests: {}
    };
    dispatch(seteReleaseRequestParams(newReleaseRequests));
    dispatch(featchDataAsync());
  };
};
export const searchOccured = searchPhrase => {
  return (dispatch, getState) => {
    const currentReleaseRequestsParams = getState().releaseRequests;
    const newReleaseRequests = {
      ...currentReleaseRequestsParams,
      status: 0,
      searchPhrase: searchPhrase,
      page_start: 0,
      page_end: page_size,
      results_number: 0,
      selectAll: false,
      requests: [],
      checkedRequests: {}
    };
    dispatch(seteReleaseRequestParams(newReleaseRequests));
    dispatch(featchDataAsync());
  };
};
export const setSelectAll = selectAllChecked => {
  return (dispatch, getState) => {
    const currentReleaseRequestsParams = getState().releaseRequests;
    const newReleaseRequests = {
      ...currentReleaseRequestsParams,
      selectAll: selectAllChecked
    };
    dispatch(seteReleaseRequestParams(newReleaseRequests));
  };
};
// async action creators

export const featchDataAsync = () => {
  return (dispatch, getState) => {
    const { releaseRequests } = getState();
    let query = `ReleaseRequests?${defaultSort}&`;
    if (releaseRequests.searchPhrase !== "") {
      query = `${query}q=${releaseRequests.searchPhrase}`;
    } else {
      query = `${query}status.id=${releaseRequests.status}`;
    }
    // add pagination
    query = `${query}&_start=${releaseRequests.page_start}&_end=${
      releaseRequests.page_end
    }`;

    dispatch(setLoadingRequests(true));
    api
      .get(`${query}`)
      .then(response => {
        const results_number = response.headers["x-total-count"];
        // check if we are in pagination
        const results =
          releaseRequests.page_start > 0
            ? [...releaseRequests.requests, ...response.data]
            : response.data;

        const newReleaseRequests = {
          ...releaseRequests,
          results_number: parseInt(results_number),
          requests: results
        };
        dispatch(seteReleaseRequestParams(newReleaseRequests));
      })
      .catch(error => {
        dispatch(featchDataAsyncFailed());
      })
      .finally(() => dispatch(setLoadingRequests(false)));
  };
};

export const changeRequestStatusAction = newStatus => {
  return (dispatch, getState) => {
    const { checkedRequests } = getState().releaseRequests;

    if (checkedRequests && Object.keys(checkedRequests).length > 0) {
      // set new status on checked requests
      const checkedRequestsWithNewStatus = changeStatus(
        { ...checkedRequests },
        newStatus
      );
      console.log(checkedRequestsWithNewStatus);

      dispatch(setLoadingRequests(true));
      Promise.all([
        checkedRequestsWithNewStatus.map(request =>
          api.put(`ReleaseRequests/${request.id}`, request)
        )
      ])
        .then(response => {
          setTimeout(() => {
            dispatch(statusChanged(newStatus));
          }, 1000);
        })
        .catch(error => {
          dispatch(featchDataAsyncFailed());
          dispatch(setLoadingRequests(false));
        })
        .finally(() => {
          //dispatch(setSelectAll(false));
        });
    }
  };
};
