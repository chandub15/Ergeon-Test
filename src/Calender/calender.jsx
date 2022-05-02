import { useEffect, useRef, useState } from "react";
import "./calender.scss";

export default function Calender() {
  const [year, setYear] = useState();
  const [monthIndex, setMonthIndex] = useState();
  const [todayDate, setTodayDate] = useState();
  const [selectedDate, setSelectedDate] = useState();

  const [viewableDates, setViewableDates] = useState([]);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "November", "December"];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const datesRef = useRef();
  const currentDateRef = useRef();

  useEffect(() => {
    function updateCurrentDate() {
      let date = new Date();

      let today = new Date(date.getFullYear(), date.getMonth(), 1);

      setTodayDate(today);
      setYear(date.getFullYear());
      setMonthIndex(date.getMonth());
    }

    updateCurrentDate();
  }, []);

  useEffect(() => {
    let monthIndex = 0;
    let calenderDates = {};
    while (monthIndex < 12) {
      let daysInMonth = getDaysInMonth(monthIndex, year);
      calenderDates[monthIndex] = daysInMonth;
      monthIndex++;
    }
    setViewableDates(calenderDates);
  }, [monthIndex, year]);

  const getDaysInMonth = (month, year) => {
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const getDayName = (date) => {
    let dayIndex = new Date(date).getDay();
    return days[dayIndex];
  };

  const getDate = (date) => {
    return new Date(date).getDate();
  };

  const handleNav = (direction, monthIndex) => {
    if (direction === "left") {
      datesRef.current.scrollLeft -= datesRef.current.scrollWidth / (365 / 7);
    } else {
      datesRef.current.scrollLeft += datesRef.current.scrollWidth / (365 / 7);
    }
  };

  const setRef = (ref, today) => {
    if (today) currentDateRef.current = ref;
  };

  const selectDate = (date) => {
    setSelectedDate((prevState) => {
      if (prevState !== date) {
        return date;
      } else {
        return "";
      }
    });
  };

  const getFormattedDate = (date) => {
    const today = new Date(date);
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    return dd + "/" + mm + "/" + yyyy;
  };

  return (
    <div className="horizontal-calender-root">
      <div className="horizontal-calender">
        <div className="title"> Horizontal Calender</div>
        {Object.keys(viewableDates).length > 0 && (
          <div className="calender">
            <button className="prev-dates" onClick={() => handleNav("left")}>
              <img src="/images/left-arrow.svg" alt="left-arrow" width="50" height="50" />
            </button>
            <div className="all-dates" ref={datesRef}>
              {Object.keys(viewableDates).map((monthIndex, index) => {
                return (
                  <div key={`${months[monthIndex]}-${index}`} className={`${months[monthIndex]}`}>
                    <div className="month-year">
                      <span>{months[monthIndex]}</span> <span>{year}</span>
                    </div>
                    <div className="dates">
                      {viewableDates[monthIndex].map((date) => {
                        return (
                          <button
                            ref={(ref) => setRef(ref, todayDate.getTime() === date.getTime())}
                            id={date}
                            className={`date-selector ${selectedDate && selectedDate.getTime() === date.getTime() ? `selected-date-highlight` : ``} ${todayDate.getTime() === date.getTime() ? `today` : ``}`}
                            key={date}
                            onClick={(event) => selectDate(date)}
                          >
                            <div className="day">{getDayName(date)}</div>
                            <div className="date">{getDate(date)}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            <button className="prev-dates" onClick={() => handleNav("right")}>
              <img src="/images/right-arrow.svg" alt="right-arrow" width="50" height="50" />
            </button>
          </div>
        )}
        <div className="selected-date">Selected Date: <b>{selectedDate ? getFormattedDate(selectedDate) : `N/A`}</b></div>
      </div>
    </div>
  );
}
