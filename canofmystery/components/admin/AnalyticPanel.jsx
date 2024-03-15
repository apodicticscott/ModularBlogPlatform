import React, {useState, useEffect} from "react";

import { BarChart } from '@mui/x-charts';
import LinearProgress from '@mui/material/LinearProgress';
import WorldMap from "../../Maps/mapUtils"

import { fetchGoogleAnalyticsReport} from "../../firebase/analitics/analyticsUtils"

const propertyId = process.env.NEXT_PUBLIC_PROPERTY_ID;


const AnalyticsPanel = ({chartData, setChartData, locationData, setLocationData, setLocNumber, locNumber}) => {


    function calculateCountryUserPercentage(data) {
        // Initialize a map to hold country totals
        const countryTotals = new Map();
        console.log(data)
        // Calculate total users and accumulate totals by country
        let totalUsers = 0;
        data.forEach(item => {
          const users = parseInt(item.number, 10);
          totalUsers += users;
          if (countryTotals.has(item.country)) {
            countryTotals.set(item.country, countryTotals.get(item.country) + users);
          } else {
            countryTotals.set(item.country, users);
          }
        });
      
        // Convert to desired output format with percentage calculation
        const result = Array.from(countryTotals).map(([country, numUsers]) => ({
          country,
          percentage: (numUsers / totalUsers * 100).toFixed(2),
          numUsers
        }));
      
        return result;
      }

    const handleFetch = async () => {
        const {pivotReport, realTimeReport} = await fetchGoogleAnalyticsReport(propertyId)
        setLocNumber(calculateCountryUserPercentage(pivotReport.result))
        setLocationData(pivotReport)
        setChartData(realTimeReport)
        
    }

    useEffect(() => {
        console.log(chartData.result, locationData.result, locNumber)
        if(!chartData.result && !locationData.result && !locNumber){
            handleFetch()
        }
        
    }, [])

    const valueFormatter = (value) => `${value} Users`;

    return(
        <>
            <div className="flex w-full h-max ">
                <div className="w-0 h-full flex items-center py-7">
                    {
                        chartData !== undefined
                        &&
                        <div className="w-max h-full p-7 relative left-[25px] bg-base-100 rounded-md flex flex-col justify-start gap-[15px] border-3 z-10">
                            <span className="text-lg underline decoration-dashed">
                                USERS IN LAST 30 MINUTES.
                            </span>
                            <span className="text-3xl">
                                1
                            </span>
                            <span className="text-lg underline decoration-dashed">
                                USERS PER MINUTE
                            </span>
                            {
                                chartData.result
                                &&
                                <BarChart
                                    width={350}
                                    color="secondary"
                                    height={100}
                                    dataset={chartData.result}
                                    
                                    yAxis={[{label: "Number of Users"}]}
                                    xAxis={[{scaleType: 'band', dataKey: "time", valueFormatter}]}
                                    series={[{ dataKey: 'numUsers', valueFormatter, color: "#000000"}]}
                                    margin={{
                                        top: 5, right: 30, left: 20, bottom: 5,
                                    }}
                                />
                            }

                            <div className="w-full flex justify-between">
                                <span className="text-lg underline decoration-dashed">
                                    TOP 3 COUNTRIES.
                                </span>
                                <span className="text-lg underline decoration-dashed">
                                    USERS
                                </span>
                            </div>
                            {
                                locNumber
                                &&
                                locNumber.map((data) => (
                                    <>
                                        <div className="w-full flex justify-between">
                                            <span className="text-lg decoration-dashed">
                                                {data.country}
                                            </span>
                                            <span className="text-lg decoration-dashed">
                                                {data.numUsers}
                                            </span>
                                        </div>
                                        <LinearProgress color="secondary" variant="determinate" value={data.percentage}/>
                                    </>
                                ))
                            }

                        </div>
                    }
                </div>
                <WorldMap className="w-full" locationData={locationData.result}/>
            </div>
        </>
    )
};


export default AnalyticsPanel