import React, { useState } from "react";
import DatePicker from "react-datepicker";
import PropTypes from 'prop-types';
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import de from 'date-fns/locale/de';
import { subDays } from "date-fns";
import { addDays } from "date-fns";

import "react-datepicker/dist/react-datepicker.css";

export default function Shopping() {
  
  
  
  /*   const Example = () => {
    const [startDate, setStartDate] = useState(new Date());
    return (
      <DatePicker selected={startDate} onChange={(date:Date) => setStartDate(date)} />
      );
    }; */
    
/*     registerLocale('de', de)
  setDefaultLocale('de')

  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      closeOnScroll={true}
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      //locale="pt-BR"
      locale="en"
      showTimeSelect
      timeFormat="p"
      timeIntervals={15}
      dateFormat="dd.MM.yyyy h:mm aa"
    />
  ); */
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  console.log("🚀 ~ startTime", startTime)
  //console.log("🚀 ~ startDate", startDate)
  const highlightWithRanges = [
    {
      "react-datepicker__day--highlighted-custom-1": [
        subDays(new Date(), 4),
        subDays(new Date(), 3),
        subDays(new Date(), 2),
        subDays(new Date(), 1),
      ],
    },
    {
      "react-datepicker__day--highlighted-custom-2": [
        addDays(new Date(), 1),
        addDays(new Date(), 2),
        addDays(new Date(), 3),
        addDays(new Date(), 4),
      ],
    },
  ];

  return (
    <>
    <DatePicker
      closeOnScroll={true}
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      highlightDates={highlightWithRanges}
      placeholderText="Please select day and time"
      locale="en"
      showTimeSelect
      timeFormat="p"
      timeIntervals={15}
      dateFormat="dd.MM.yyyy h:mm aa"
    />
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      highlightDates={highlightWithRanges}
      placeholderText="This highlight two ranges with custom classes"
    />
    <DatePicker
      closeOnScroll={true}
      selected={startTime}
      onChange={(date) => setStartTime(date)}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      locale="en"
      timeCaption="Time"
      dateFormat="h:mm aa"
    />
  </>
  );

}
