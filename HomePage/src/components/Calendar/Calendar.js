import React, { useState } from "react";
import "./Calendar.scss";

function getNewDateObj(newDate) {
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const date = newDate.getDate();
  const day = newDate.getDay();
  const hours = newDate.getHours();
  const minutes = newDate.getMinutes();
  const seconds = newDate.getSeconds();

  return { year, month, date, day, hours, minutes, seconds };
}
function getMonthDate(newDate, page = 0) {
  const doMonth = getNewDateObj(
    new Date(newDate.year, newDate.month - 1 + page, 1)
  );

  const prevMonthLastDate = getNewDateObj(
    new Date(doMonth.year, doMonth.month - 1, 0)
  );
  const startDate =
    prevMonthLastDate.day === 0
      ? prevMonthLastDate
      : prevMonthLastDate.day === 6
      ? doMonth
      : getNewDateObj(
          new Date(doMonth.year, doMonth.month - 1, -prevMonthLastDate.day)
        );
  let monthDate = [];
  for (let i = 0; i < 42; i++) {
    monthDate.push(
      getNewDateObj(
        new Date(startDate.year, startDate.month - 1, startDate.date + i)
      )
    );
  }

  const week1 = monthDate.slice(0, 7);
  const week2 = monthDate.slice(7, 14);
  const week3 = monthDate.slice(14, 21);
  const week4 = monthDate.slice(21, 28);
  const week5 = monthDate.slice(28, 35);
  const week6 = monthDate.slice(35);

  const week4LastDate = week4[week4.length - 1];
  const week5LastDate = week5[week5.length - 1];
  const lastDate = new Date(doMonth.year, doMonth.month, 0);
  const isLastWeek4 =
    week4LastDate.month !== doMonth.month ||
    !(week4LastDate.date < lastDate.getDate());
  const isLastWeek5 =
    week5LastDate.month !== doMonth.month ||
    !(week5LastDate.date < lastDate.getDate());
  const dateArr = [week1, week2, week3, week4];

  return {
    year: doMonth.year,
    month: doMonth.month,
    date: isLastWeek4
      ? dateArr
      : isLastWeek5
      ? [...dateArr, week5]
      : [...dateArr, week5, week6],
  };
}

const Calendar = (props) => {
  const [pageData, setPageData] = useState(0);
  const [calendarData, setCalendarData] = useState(
    getMonthDate(getNewDateObj(new Date()))
  );
  const [currentDate, setCurrentDate] = useState();
  const [today, setToday] = useState(
    `${new Date().getFullYear()}.${
      new Date().getMonth() + 1
    }.${new Date().getDate()}`
  );

  const onClickPrev = () => {
    setCalendarData(getMonthDate(getNewDateObj(new Date()), pageData - 1));
    setPageData(pageData - 1);
  };

  const onClickNext = () => {
    setCalendarData(getMonthDate(getNewDateObj(new Date()), pageData + 1));
    setPageData(pageData + 1);
  };

  const onClickDaySelect = (e) => {
    setCurrentDate(e.currentTarget.value);
    props.onClick(e.currentTarget.value);
  };

  const disabledCheck = (data, currentDate) => {
    if (data.year < currentDate.getFullYear()) {
      return true;
    } else if (data.date < currentDate.getDate()) {
      return true;
    } else if (data.month < currentDate.getMonth() + 1) {
      return true;
    }
    return false;
  };

  return (
    <div className="calendar">
      <div className="calendar-btn">
        <button onClick={onClickPrev} className="calendar-btn-left"></button>
        {calendarData.year}.{calendarData.month}
        <button onClick={onClickNext} className="calendar-btn-right"></button>
      </div>
      <div className="calendar-content">
        <div className="calendar-content-date">
          <span>일</span>
          <span>월</span>
          <span>화</span>
          <span>수</span>
          <span>목</span>
          <span>금</span>
          <span>토</span>
        </div>

        {calendarData.date.map((item) => (
          <div className="calendar-content-week">
            {item.map((data) => (
              <button
                onClick={onClickDaySelect}
                value={`${data.year}.${data.month}.${data.date}`}
                disabled={disabledCheck(data, new Date())}
                className={`${
                  currentDate === `${data.year}.${data.month}.${data.date}` &&
                  "calendar-content-current-day"
                } ${
                  today === `${data.year}.${data.month}.${data.date}` &&
                  "calendar-content-today"
                }
                 calendar-content-day`}
              >
                {data.month === calendarData.month && data.date}{" "}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(Calendar);
