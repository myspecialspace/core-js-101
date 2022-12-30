/* *******************************************************************************************
 *                                                                                           *
 * Please read the following tutorial before implementing tasks:                              *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates#Date_object
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date     *
 *                                                                                           *
 ******************************************************************************************* */


/**
 * Parses a rfc2822 string date representation into date value
 * For rfc2822 date specification refer to : http://tools.ietf.org/html/rfc2822#page-14
 *
 * @param {string} value
 * @return {date}
 *
 * @example:
 *    'December 17, 1995 03:24:00'    => Date()
 *    'Tue, 26 Jan 2016 13:48:02 GMT' => Date()
 *    'Sun, 17 May 1998 03:00:00 GMT+01' => Date()
 *     new Date() => When called as a constructor, returns a new Date object.
 */
function parseDataFromRfc2822(value) {
  return new Date(value);
}

/**
 * Parses an ISO 8601 string date representation into date value
 * For ISO 8601 date specification refer to : https://en.wikipedia.org/wiki/ISO_8601
 *
 * @param {string} value
 * @return {date}
 *
 * @example :
 *    '2016-01-19T16:07:37+00:00'    => Date()
 *    '2016-01-19T08:07:37Z' => Date()
 */
function parseDataFromIso8601(value) {
  return new Date(value);
}


/**
 * Returns true if specified date is leap year and false otherwise
 * Please find algorithm here: https://en.wikipedia.org/wiki/Leap_year#Algorithm
 *
 * @param {date} date
 * @return {bool}
 *
 * @example :
 *    Date(1900,1,1)    => false
 *    Date(2000,1,1)    => true
 *    Date(2001,1,1)    => false
 *    Date(2012,1,1)    => true
 *    Date(2015,1,1)    => false
 *
 * const moonLanding = new Date('July 20, 69 00:20:18');
   console.log(moonLanding.getFullYear()); // expected output: 1969

   const birthday = new Date('August 19, 1975 23:15:30');
   const date1 = birthday.getDate(); // только число 19 из даты вытягиваем
   console.log(date1); // expected output: 19

   getDate() method returns the day of the month for the specified date according to local time.
   getFullYear() returns year
   в високосном году в Феврале 29 дней
   new Date(year, monthIndex, day) => new Date(year, 1, 29)
 */
function isLeapYear(date) {
  const fullYear = (new Date(date)).getFullYear();
  return new Date(fullYear, 1, 29).getDate() === 29;
}


/**
 * Returns the string representation of the timespan between two dates.
 * The format of output string is "HH:mm:ss.sss"
 *
 * @param {date} startDate
 * @param {date} endDate
 * @return {string}
 *
 * @example:
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,11,0,0)   => "01:00:00.000"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,10,30,0)       => "00:30:00.000"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,10,0,20)        => "00:00:20.000"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,10,0,0,250)     => "00:00:00.250"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,15,20,10,453)   => "05:20:10.453"
 *    Math.abs => модуль числа
 *    getHours() => только часы
 *    getMinutes()  => только минуты
 *    getSeconds()   => только секунды
 *    getMilliseconds()  => только милисек
 *    padStart(2, '0') => заполняет строку вначале слева до нужной длины другой строкой
 *    str.padStart(targetLength [, padString])
 *   'abc'.padStart(8, "0");     // "00000abc"
 */
function timeSpanToString(startDate, endDate) {
  const HH = Math.abs(startDate.getHours() - endDate.getHours()).toString().padStart(2, '0'); // hours
  const mm = Math.abs(startDate.getMinutes() - endDate.getMinutes()).toString().padStart(2, '0'); // minutes
  const ss = Math.abs(startDate.getSeconds() - endDate.getSeconds()).toString().padStart(2, '0'); // seconds
  const sss = Math.abs(startDate.getMilliseconds() - endDate.getMilliseconds()).toString().padStart(3, '0'); // milliseconds
  const str = `${HH}:${mm}:${ss}.${sss}`; // string
  return str;
}


/**
 * Returns the angle (in radians) between the hands of an analog clock
 * for the specified Greenwich time.
 * If you have problem with solution please read: https://en.wikipedia.org/wiki/Clock_angle_problem
 *
 * SMALL TIP: convert to radians just once, before return in order to not lost precision
 *
 * @param {date} date
 * @return {number}
 *
 * @example:
 *    Date.UTC(2016,2,5, 0, 0) => 0
 *    Date.UTC(2016,3,5, 3, 0) => Math.PI/2
 *    Date.UTC(2016,3,5,18, 0) => Math.PI
 *    Date.UTC(2016,3,5,21, 0) => Math.PI/2
 *
*  The hour hand of a normal 12-hour analogue clock turns 360° in 12 hours (720 minutes)
   or 0.5° per minute.
 * The minute hand rotates through 360° in 60 minutes or 6° per minute.
   Equation for the angle of the hour hand 0.5°*(60*H + M)
   Equation for the angle of the minute hand 6°* M
 */
function angleBetweenClockHands(date) {
  const newDate = new Date(date);
  const HH = newDate.getUTCHours() % 12; // часы utc
  const mm = newDate.getUTCMinutes(); // минуты utc
  let angle = Math.abs((60 * HH + mm) / 2 - 6 * mm); // формула вычисления угла, по модулю берем
  angle = angle > 180 ? 360 - angle : angle; // тупой угол или острый
  return (angle * Math.PI) / 180; // в радианы
}


module.exports = {
  parseDataFromRfc2822,
  parseDataFromIso8601,
  isLeapYear,
  timeSpanToString,
  angleBetweenClockHands,
};
