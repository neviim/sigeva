import FieldError from '../FieldError';
import DateRangeModel from '../../models/dateRange.model';

const compareDates = (dateBegin_, dateEnd_) => {
  const str = dateBegin_;
  const date = new Date(str.split('/').reverse().join('/'));
  const str2 = dateEnd_;
  const date2 = new Date(str2.split('/').reverse().join('/'));

  if (date > date2) {
    return false;
  }
  else {
    return true;
  }
};

const periodFormat = (dateBegin_, dateEnd_, local_) => {
  const arrDateBegin = dateBegin_.split('/');
  const stringFormated = arrDateBegin[1] + '-' + arrDateBegin[0] + '-' + arrDateBegin[2];

  const arrDateEnd = dateEnd_.split('/');
  const stringFormated2 = arrDateEnd[1] + '-' + arrDateEnd[0] + '-' + arrDateEnd[2];

  const dateBeginFormated = new Date(stringFormated);
  console.log('Data formatada 1: ' + dateBeginFormated);

  const dateEndFormated = new Date(stringFormated2);
  console.log('Data formatada 2: ' + dateEndFormated);

  const month = new Array(12);
  month[0] = "Janeiro";
  month[1] = "Fevereiro";
  month[2] = "Março";
  month[3] = "Abril";
  month[4] = "Maio";
  month[5] = "Junho";
  month[6] = "Julho";
  month[7] = "Agosto";
  month[8] = "Setembro";
  month[9] = "Outubro";
  month[10] = "Novembro";
  month[11] = "Dezembro";

  console.log(month[dateBeginFormated.getMonth()]);
  console.log(arrDateBegin[0]);

  console.log(month[dateEndFormated.getMonth()]);
  console.log(arrDateEnd[0]);

  const period = arrDateBegin[0] + ' a ' + arrDateEnd[0] + ' de ' + month[dateEndFormated.getMonth()] + ' ' + local_;
  console.log("periodo :" + period);

  return period;

};

const eventFieldsParse = (fields) => {
  let fieldsStr = '';
  const fieldsArray = fields.split(',');
  fieldsArray.forEach((f) => {
    fieldsStr = fieldsStr.concat(f);
    fieldsStr = fieldsStr.concat(' ');
  });
  return fieldsStr;
};

const eventMessage = (eventObject_) =>{
  const dateInicio = eventO
}

const isBetweenLength = (field_, min_, max_ = 255) => {
  // [MR] não se deve reassinar um parametro
  const field = field_.trim(); // Removes spaces bars from the borders
  if (field.length < min_ || field.length > max_) return false;
  return true;
};

/**
 * Formats a event to return through the API
 * @param eventObject_ event to be formated
 */
const formatEvent = (eventObject_) => {
  return {
    _id: eventObject_._id,
    name: eventObject_.name,
    subtitle: eventObject_.subtitle,
    active: eventObject_.active,
    eventPeriod: eventObject_.eventPeriod,
    enrollmentPeriod: eventObject_.enrollmentPeriod,
    location: eventObject_.location,
  };
};

/**
 * Parse a String date into Date format
 * @param date String date to be parsed
 * @return parsed date | false if it is invalid
 */
const parseDate = (date) => {
  const parsedDate = Date.parse(date);
  if (isNaN(parsedDate) || parsedDate < 0) {
    return false;
  }
  return parsedDate;
};

/**
 * Mount a DateRange object model
 * @param dateBegin initial date to mount
 * @param dateEnd final date to mount
 * @param errors errors buffer
 * @param errorFieldName field name to error display
 * @return false if handle a error, a DateRangeModel otherwise
 */
const mountDateRange = (dateBegin, dateEnd, errors, errorFieldName) => {
  if (!dateBegin || !dateEnd) {
    errors.push(FieldError(errorFieldName, 'Alguma data é inválida ou não foi preenchida'));
    return false;
  }
  // Compare dates
  if (dateEnd < dateBegin) {
    errors.push(FieldError(errorFieldName, 'A data inicial não pode ser posterior à data final'));
    return false;
  }
  // The dates are valid
  return DateRangeModel({
    begin: dateBegin,
    end: dateEnd,
  });
};

export { eventFieldsParse,
  isBetweenLength,
  formatEvent,
  parseDate,
  compareDates,
  periodFormat,
  mountDateRange,
};
