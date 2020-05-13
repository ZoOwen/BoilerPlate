import axios from "axios";
import swal from "sweetalert";
export const GET_DATA_BEGIN = "GET_DATA_BEGIN";
export const GET_DATA_SUCCESS = "GET_DATA_SUCCESS";
export const GET_DATA_FAILED = "GET_DATA_FAILED";
export function getDataBegin() {
  return {
    type: GET_DATA_BEGIN,
  };
}

export function getDataSuccess(result) {
  return {
    type: GET_DATA_SUCCESS,
    result,
  };
}

export function getDataFailed(error) {
  return {
    type: GET_DATA_FAILED,
    error,
  };
}

export function getDataEvent() {
  return function (dispatch) {
    dispatch(getDataBegin());

    axios
      .get("https://5e9f0a2711b078001679c0a2.mockapi.io/main_event")
      .then((result) => dispatch(getDataSuccess(result.data)))
      .catch((error) => dispatch(getDataFailed(error.massage)));
  };
}

export function postDataEvent(objEvent) {
  return function (dispatch) {
    dispatch(getDataBegin());

    axios
      .post("https://5e9f0a2711b078001679c0a2.mockapi.io/main_event", objEvent)
      .then(() => dispatch(getDataEvent()))
      .catch((error) => dispatch(getDataFailed(error.massage)));
  };
}

export const deleteDataEvent = (id) => {
  return function (dispatch) {
    dispatch(getDataBegin());
    axios
      .delete(`https://5e9f0a2711b078001679c0a2.mockapi.io/main_event/${id}`)
      .then(() => dispatch(getDataEvent()))
      .then(swal("Deleted!", "Data already deleted", "success"))
      .catch((error) => dispatch(getDataFailed(error.massage)));
  };
};
