import { useState } from 'react'
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useFinanceStore } from "./store/useFinanceStore.js";

export default function DateRangePicker() {
  const dateRange = useFinanceStore((state) => state.dateRange);
  const setDateRange = useFinanceStore((state) => state.setDateRange);

  return (
    <div>
      <DayPicker
      animate
      mode="range"
      selected={dateRange}
      onSelect={setDateRange}
     
    />  
    </div>
    

  );
}