// apiActionFactory(action, apiCall, errorAction) returns an action creator that
// will 1) dispatch <action>, 2) execute the <apiCall>, then 3) dispatch <errorAction>
// if the api call fails.
// The fourth, optional parameter, will change the order of these actions.
// If <blocking> is true, then the action creator will instead
// 1) execute the <apiCall>, then on success will 2a) dispatch <action>
// and on failure will 2b) dispatch <errorAction>
export const apiActionFactory = (action, apiCall, errorAction, blocking = false) => {
  if (!action || !apiCall || !errorAction) {
    throw new Error('Improper use of `apiActionFactory`: <action> <apiCall>, and <errorAction> must be defined.');
  }

  return payload => {
    return async dispatch => {
      try {
        // Dispatch the action before making the API call if <blocking> is set to false
        if (!blocking) {
          dispatch(action(payload));
        }

        // Executes the api call, and dispatches the <errorAction> in the case of failure.
        let data = await apiCall(payload);

        if (data) {
          // If <blocking> was set to true, then we need to dispatch the action now.
          if (blocking) {
            dispatch(action(data));
          }
          return data;
        } else {
          dispatch(errorAction());
          return null;
        }

      } catch (err) {
        dispatch(errorAction());
      }
    }
  }
}