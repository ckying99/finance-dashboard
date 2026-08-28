import { useState, useEffect } from 'react'
import './App.css'
import useBudgets from './hooks/useBudgets.js'
import { useFinanceStore } from './store/useFinanceStore.js'
import DateRangePicker from './DateRangePicker.jsx'
import { subDays, subMonths, format } from "date-fns";

const DateFilters = () => {
    var [selectedDateFilter, setSelectedDateFilter] = useState("none");
    var [datePickerBoolean, toggleDatePickerBoolean] = useState(false);
    var setDateRange = useFinanceStore((state) => state.setDateRange)
    var dateRange = useFinanceStore((state) => state.dateRange)
    const hasRange = Boolean(dateRange?.from)
    const today = new Date();
    return (
        <div>

            <div className="flex flex-wrap gap-2 mb-4">
                <button onClick={ () => {
                    if (selectedDateFilter === "last 3 months") {
                        setDateRange({ from: undefined, to: undefined });
                        setSelectedDateFilter("none");
                    } else {
                        setDateRange({ from: subMonths(today, 3), to: today });
                        setSelectedDateFilter("last 3 months");
                    }
                    
                }}
                 className={selectedDateFilter === "last 3 months"
                    ? "bg-blue-500 text-white px-3 py-1 rounded"
                    : "bg-gray-200 px-3 py-1 rounded"}
                >Last 3 Months
                </button>

                {/* This year Button  */}
                <button onClick={ () => {
                    if (selectedDateFilter === "last 3 months") {
                        setDateRange({ from: undefined, to: undefined });
                        setSelectedDateFilter("none");
                    } else {
                        setDateRange({ from: subDays(today, 365), to: today });
                        setSelectedDateFilter("this year");
                    }

                }}
                 className={selectedDateFilter === "this year"
                    ? "bg-blue-500 text-white px-3 py-1 rounded"
                    : "bg-gray-200 px-3 py-1 rounded"}
                >This Year</button>

                {/* Logic to Show "pick a date" OR "selected Date range if available" */}
                <div className={"relative " + (selectedDateFilter === "date picker"
                    ? "bg-blue-500 text-white px-3 py-1 rounded"
                    : "bg-gray-200 px-3 py-1 rounded")}>
                {   
                    selectedDateFilter == "date picker" && dateRange?.from ? `${format(dateRange.from, 'dd MMM yyyy')}
                     - ${format(dateRange.to, 'dd MMM yyyy')}` :
                    <button onClick={() => {
                           toggleDatePickerBoolean(prev => !prev);
                    }
                    }>Pick Date Range</button>
                }

                {
                    // Button for clearing pick a date 
                    selectedDateFilter == "date picker" && <button onClick={ () => {
                            setSelectedDateFilter("none");
                            setDateRange({ from: undefined, to: undefined });
                        }}> x</button>
                }

                {/* date picker popup section - shows only when pick a date is selected */}
                {
                    datePickerBoolean &&
                    <div className="absolute top-full mt-2 left-0 z-10 bg-white rounded-lg border shadow-lg p-2">
                        <DateRangePicker > </DateRangePicker>
                        {/* done button in date picker */}
                        <div className="flex justify-end">
                            <button onClick={() => {
                                toggleDatePickerBoolean(false);
                                setSelectedDateFilter("date picker");
                                } } className="bg-blue-500 text-white px-4 py-2 rounded">
                                Done
                            </button>
                        </div>
                    </div>
                }
            </div>

            </div>

        </div>


    )
}

export default DateFilters
