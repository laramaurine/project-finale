import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* fetchFocusArea(action){
  const response = yield axios.get(`/api/focus`);
  yield put({ type: 'SET_FOCUS_AREA', payload: response.data });
}

function* changeFocusStatus(action) {
  const { focusId, newStatus } = action.payload;
  yield axios.put(`/api/question/question-status/${focusId}`, {newStatus: newStatus});
  yield put({ type:'FETCH_FOCUS_AREA' });

}

function* changeFocusText(action) {
  const { focusId, newText } = action.payload;
  yield axios.put(`/api/question/question-text/${focusId}`, {newText: newText});
  yield put({ type:'FETCH_FOCUS_AREA' });
}


//--------------------WATCHER SAGA---------------------------//
function* focusAreaSaga() {
  yield takeLatest('FETCH_FOCUS_AREA', fetchFocusArea);
  yield takeLatest('CHANGE_FOCUS_STATUS', changeFocusStatus);
  yield takeLatest('CHANGE_FOCUS_TEXT', changeFocusText);
}

export default focusAreaSaga;
