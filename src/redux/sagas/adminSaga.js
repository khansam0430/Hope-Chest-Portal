import { put, takeEvery} from 'redux-saga/effects';
import axios from 'axios';

// Displays all events on Admin page with table
function* admin (action) {
    console.log("ADMIN saga coming from admin with:", action.payload);
  try {
    const response = yield axios.get("/admin", action.payload);
    console.log("in saga with", response.data);
    yield put({ type: "SET_ADMIN", payload: response.data });
  } catch (error) {
    console.log(error);
  }
}

//Get selected event form details to display on Admin Review page 
function* getAdminEvent(action) { 
  console.log("saga coming from adminSaga with:", action.payload);
  try {
    const response = yield axios.get(`/admin/get/${action.formId}`);
    console.log("in saga GETADMINEVENT with", response.data);
    yield put({ type: 'SET_DETAILS', payload: response.data });
  } catch (error) {
    console.log("getAdminEvent Error", error);
  }
}

// function* getThisForm(action) {
//   console.log("saga coming from getThisForm with:", action.payload.id);
//   try {
//     const newForm = yield axios.get(`/form/form/${action.payload.id}`);
//     console.log("in saga with", newForm.data);
//     yield put({ type: "DISPLAY_FORM", payload: newForm.data });
//   } catch (error) {
//     console.log(error);
//   }
// }

//Edit event form details on Admin Review page
// function* updateAdminForm(action) {
//   try {
//   console.log('in updateAdminForm from ADMIN with', action.payload, 'id', action.id);
//     // yield axios.put(`/admin/${action.id}`, action.payload);
//     // console.log('update ADMIN FORM from admin saga');
// } catch (error) {
//   console.log("Error updating event:", error);
//   yield put({ type: "REVIEWING_EVENT_FAILED" });
// }
// }

function* updateAdminForm(action) {
  try {
    console.log("in updateFORM with", action.payload);
    yield axios.put(`/admin/review/${action.id}`, action.payload);
    console.log("back from update server");
    yield put({ type: "GET_ADMIN_FORM", payload: action });
    yield put({ type: "TOGGLE_EDIT" });
  } catch (error) {
    console.log("Error updating event:", error);
    yield put({ type: "ADDING_EVENT_FAILED" });
  }
}
 
//Edit approval status between approved and unapproved on Admin Page
function* updateApprovalStatus(update) {
  console.log("in updateTask of ADMIN saga", update.payload, update.approved);
  try {
    yield axios.put(`admin/update/${update.payload}`, {
      approved: update.approved
    })
    yield put({ type:"GET_ADMIN"});
  } catch (error) {
    console.log("Error updating approval status", error);
  }
}

function* adminSaga() {
  yield takeEvery('GET_ADMIN', admin);
  yield takeEvery("UPDATE_ADMIN_FORM", updateAdminForm);
  yield takeEvery('GET_ADMIN_FORM', getAdminEvent);
  yield takeEvery('SET_STATUS_1', updateApprovalStatus);
}

export default adminSaga;
