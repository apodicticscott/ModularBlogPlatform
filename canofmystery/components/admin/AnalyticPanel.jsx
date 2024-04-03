import React, {useState, useEffect} from "react";


import { BarChart } from '@mui/x-charts';
import LinearProgress from '@mui/material/LinearProgress';
import WorldMap from "../../Maps/mapUtils"
import { Divider } from "@material-ui/core";
import Header from "../TextComponents/Header1";
import { Tooltip } from "@mui/material";
import { fetchGoogleAnalyticsReport} from "../../firebase/analitics/analyticsUtils"

const propertyId = process.env.NEXT_PUBLIC_PROPERTY_ID;



const AnalyticsPanel = ({chartData, setChartData, locationData, setLocationData, setLocNumber, locNumber, pageVisitData, setPageVisitData, classes}) => {

    function calculateCountryUserPercentage(data) {
        // Initialize a map to hold country totals
        const countryTotals = new Map();
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
        const {pivotReport, realTimeReport, pageVisitReport} = await fetchGoogleAnalyticsReport(propertyId)
        setPageVisitData(pageVisitReport.result)
        setLocNumber(calculateCountryUserPercentage(pivotReport.result))
        setLocationData(pivotReport)
        setChartData(realTimeReport)
        
    }

    useEffect(() => {
        if(!chartData.result && !locationData.result && !locNumber){
            handleFetch()
        }
    }, [])

    const valueFormatter = (value) => `${value} Users`;

    useEffect(() => {
        
    })

    console.log()

    return(
        <>
            <div className="flex flex-col w-full dark:font-extralight ">
                <div className="flex w-full h-max shadow">
                    <div className="w-0 h-full flex items-center py-7">
                        {
                            chartData !== undefined
                            &&
                            <div className="w-max h-full p-7 relative left-[25px] bg-base-100 rounded-md flex flex-col justify-start gap-[15px] border-3 z-10 dark:bg-base-100-dark">
                                <Tooltip classes={{ tooltip: classes.customTooltip }} title="how many unique users have visited in the last 30 minutes.">
                                    <span className="text-lg underline decoration-dashed" >
                                        USERS IN LAST 30 MINUTES.
                                    </span>
                                </Tooltip>
                                <span className="text-3xl">
                                    1
                                </span>
                                <Tooltip classes={{ tooltip: classes.customTooltip }} title="Average users per minute.">
                                    <span className="text-lg underline decoration-dashed">
                                        USERS PER MINUTE
                                    </span>
                                </Tooltip>
                                <div className="dark:bg-[#353335] p-2 rounded">
                                    {
                                        chartData.result
                                        &&
                                        <BarChart
                                            width={350}
                                            color={"primary"}
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
                                </ div>
                                <div className="w-full flex justify-between">
                                    <Tooltip classes={{ tooltip: classes.customTooltip }} title="Top 3 countries of visting users.">
                                        <span className="text-lg underline decoration-dashed" >
                                            TOP 3 COUNTRIES.
                                        </span>
                                    </Tooltip>
                                    <Tooltip classes={{ tooltip: classes.customTooltip }} title="Users that have visited">
                                        <span className="text-lg underline decoration-dashed">
                                            USERS
                                        </span>
                                    </Tooltip>
                                </div>
                                <div className="dark:bg-[#353335] p-2 rounded h-max flex flex-col gap-[10px]">
                                    {
                                        locNumber
                                        &&
                                        locNumber.map((data, index) => (
                                            <>
                                                <div className="w-full flex justify-between" key={index}>
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
                            </div>
                        }
                    </div>
                    <WorldMap className="w-full" locationData={locationData.result}/>
                </div>
                <div className="flex w-full max-h-[600px] bg-base-100 p-7 grid grid-cols-4 grid-rows-2 gap-7 bg-base-100 dark:bg-secondary-dark">
                        <div className="col-span-2 row-span-2 rounded-md border-3 bg-base-100 flex flex-col shadow dark:bg-base-100-dark">
                            <div className="flex flex-col p-3 p-[15px] pb-0 gap-[15px]">
                                <Tooltip classes={{ tooltip: classes.customTooltip }} title="The number of visits the page has even from unregistered users.">
                                    <Header type="sm" className="text-lg underline">
                                        Page Visits
                                    </Header>
                                </Tooltip>
                            </div>
                            <div className={`flex justify-between w-full h-max items-center rounded-t-md text-lg p-[15px] pb-0`}>
                                <Tooltip classes={{ tooltip: classes.customTooltip }} title="The path of a page (usually blog/<ID HERE>) that has page views by registered and unregistered users together.">
                                    <div className="flex grow md:basis-[200px] py-[15px] 2xl:py-0 min-h-[50px] items-center underline decoration-dashed" title="The page and it's url that has been visited.">
                                        Page Path
                                    </div>
                                </Tooltip>
                                <Tooltip classes={{ tooltip: classes.customTooltip }} title="The number of visits the page has from unregistered and registered users together.">
                                    <div className="hidden md:flex basis-[200px] py-[15px] 2xl:py-0 min-h-[50px] items-center underline decoration-dashed" title="how many users have visited this page.">
                                        Number Of Visits
                                    </div>
                                </Tooltip>
                            </div>
                            <div className="w-full h-max border-t-3 bg-base-200 dark:bg-secondary-dark text-lg overflow-y-scroll scrollbar-hide rounded-b-md">
                                {
                                    pageVisitData
                                    &&
                                    <>
                                        {
                                            pageVisitData.map((visit, index) => (
                                                <div key={index} className={`flex justify-between w-full h-max px-[15px] py-[5px]  bg-base-100 shadow items-center dark:bg-[#353335]  ${index !== (pageVisitData.length - 1) ? "border-b-3" : "rounded-bl-md border-b-0"}`} onClick={() => setSelectedSession(data.id)}>
                                                    <div className="flex-1">
                                                        {visit.path}
                                                    </div>
                                                    <Divider orientation="vertical"/>
                                                    <div className="flex-2 basis-[200px]">
                                                        {visit.number}
                                                    </div>
                                                </div>
                                                
                                            ))
                                        }
                                    </>
                                }
                            </div>
                        </div>
                        <div className="col-span-2 bg-base-100 h-[295px] rounded-md border-3">

                        </div>
                </div>
            </div>
        </>
    )
};


export default AnalyticsPanel