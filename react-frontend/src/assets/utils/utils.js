import { padStart, isString } from 'lodash';
import { DateTime } from 'luxon';

export const executeOnEnter = (event, callback) => {
  if (event.which === 13 || event.keyCode === 13 || event.key === 'Enter') {
    callback(event);
  }
}

const getDateTimeFromMillisOrISOString = date => {
  if (isString(date)) {
    return DateTime.fromISO(date);
  } else {
    return DateTime.fromMillis(date);
  }
}

export const printDatePretty = date => {
  const dt = getDateTimeFromMillisOrISOString(date);
  return dt.toLocaleString({ month: 'long', day: 'numeric' });
}

export const printDateTimePretty = date => {
  const dt = getDateTimeFromMillisOrISOString(date);
  return dt.toLocaleString({ month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit' });
}

export const printTimePretty = date => {
  const dt = getDateTimeFromMillisOrISOString(date);
  return dt.toLocaleString({ hour: 'numeric', minute: '2-digit' });
}

export const printDateWithWeekdayPretty = date => {
  const dt = getDateTimeFromMillisOrISOString(date);
  return dt.toLocaleString({ weekday: 'long', month: 'long', day: 'numeric' });
}

export const printDateTimeWithWeekdayPretty = date => {
  const dt = getDateTimeFromMillisOrISOString(date);
  return dt.toLocaleString({ weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit' });
}


export const printDurationPretty = (durationInMilliseconds, showDecimals = false, padMinutes = false) => {
  let hours = Math.floor(durationInMilliseconds / 3600000);
  durationInMilliseconds %= 3600000;
  let minutes = Math.floor(durationInMilliseconds / 60000);
  durationInMilliseconds %= 60000;
  let seconds = Math.floor(durationInMilliseconds / 1000);
  let decimalString = 's';
  if (showDecimals) {
    decimalString = '.' + padStart(Math.round((durationInMilliseconds % 1000) / 10), 2, '0') + 's';
  }
  if (hours) {
    minutes = padStart(minutes + 'm', padMinutes ? 3 : 2, '0');
    seconds = padStart(seconds, 2, '0');
    return hours + 'h ' + minutes + ' ' + seconds + decimalString;
  } else {
    minutes = padStart(minutes + 'm', padMinutes ? 3 : 2, '0');
    seconds = padStart(seconds, 2, '0');
    return minutes + ' ' + seconds + decimalString;
  }
}
