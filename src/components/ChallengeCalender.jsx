import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";

const ChallengeCalendar = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="bg-white rounded-xl p-4 shadow">
      <h2 className="text-xl font-semibold mb-4">
        Challenge Calendar
      </h2>

      <Calendar onChange={setDate} value={date} />

      <p className="mt-4 text-gray-600">
        Selected Date: {date.toDateString()}
      </p>
    </div>
  );
};

export default ChallengeCalendar;