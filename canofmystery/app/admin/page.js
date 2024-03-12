'use client'
import React, {useState, useEffect, useMemo} from "react"
import { searchArticles, fetchArticles, deleteArticles, getTotalUnapprovedArticles, setArticlesApproval } from "../../firebase/articleUtils/articleUtils"
import { fetchGoogleAnalyticsReport, ApiSignIn } from "../../firebase/analitics/analyticsUtils"
import { makeStyles } from '@material-ui/core/styles';
import Header from "../../components/TextComponents/Header1"
import { app } from "../firebase"
import { FaPen } from "react-icons/fa";
import { useRouter } from 'next/navigation'
import { MdDelete } from "react-icons/md";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import { RiSearchFill } from "react-icons/ri"
import { MdOutlineDownloadDone, MdOutlinePreview,  MdClose, MdDone  } from "react-icons/md";
import { Checkbox, Badge, Tooltip, Divider, Pagination} from "@mui/material"
import { BarChart } from '@mui/x-charts';
import { NeoButton } from "../../components/TextComponents"
import { MdArticle, MdAccountCircle,  MdAnalytics } from "react-icons/md";

import Loader from "../../components/loader/loader"

const useStyles = makeStyles((theme) => ({
    customTooltip: {
      // Customize letter-spacing
      letterSpacing: '0.1em', // Adjust as needed
    },
  }));

const useChartData = (reportData) => {
    return useMemo(() => {
        if (!reportData) return [];
        if (!reportData.report) return[];

        let eventData = reportData.report.rows
            .map(row => ({
                rawTime: row.dimensionValues[0].value,
                time: row.dimensionValues[0].value,
                numUsers: +row.metricValues[0].value,
            }))
            .sort((a, b) => a.rawTime.localeCompare(b.rawTime));

        const minTime = parseInt(eventData[0]?.rawTime, 10);
        const maxTime = parseInt(eventData[eventData.length - 1]?.rawTime, 10);

        const filledEventData = [];
        for (let time = minTime; time <= maxTime; time++) {
            const timeStr = time.toString().padStart(2, '0');
            const existingData = eventData.find(event => event.rawTime === timeStr);
            if (existingData) {
                filledEventData.push(existingData);
            } else {
                filledEventData.push({ rawTime: timeStr, time: timeStr, numUsers: 0 });
            }
        }

        return filledEventData.map(data => ({
            ...data,
            time: timeValueFormatter(data.time),
        }));
    }, [reportData]);
};

const timeValueFormatter = (value) => {
    if(value[0] === "0"){
        return `${value[1]} Mins Ago`
    }else{
        return `${value} Mins Ago`
    }
};


const Admin = () => {
    const [articles, setArticles] = useState([]);
    const [numUnapproved, setNumUnapproved] = useState();
    const [selectedArticles, setSelectedArticles] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPanel, setCurrentPanel] = useState("articles");
    const [isSignedIn, setIsSignedIn] = useState(false)
    const [loading, setLoading] = useState(true);
    const [isSideBarOpen, setIsSideBarOpen] = useState(true)
    const [currentEvent, setCurrentEvent] = useState();
    const router = useRouter()

    const classes = useStyles();
    

    const handleFetchArticles = async () => {
        setArticles(await fetchArticles());
        setNumUnapproved(await getTotalUnapprovedArticles());
        setLoading(false)
    };

    const handleSearchArticles = async (search) => {
        setArticles(await searchArticles(search))
    }

    useEffect(() => {
        if (search.trim() === "") {
            handleFetchArticles();
        } else {
            handleSearchArticles(search);
        }
    }, [search]);

    const handleSearchChange = (e) => {
        e.preventDefault()
        setSearch(e.target.value);
    }

    const handleSelection = (id) => {
        setSelectedArticles(prevSelected => prevSelected.includes(id) ? prevSelected.filter(articleId => articleId !== id) : [...prevSelected, id]);
    }

    const handleSelectAll = () => {
        setSelectedArticles(selectedArticles.length < articles.length ? articles.map(article => article.id) : []);
    }

    const handleDeleteArticles = async () => {
        deleteArticles(selectedArticles)
        setSelectedArticles([]);
        setArticles(await fetchArticles()); // Refresh articles list after deletion
    };

    const handleSetArticlesApproved = async () => {
        await setArticlesApproval(selectedArticles, true);
        setArticles(await fetchArticles());
        setNumUnapproved(await getTotalUnapprovedArticles());
        setSelectedArticles([])
    }

    
    const handleSetArticlesUnapproved = async () => {
        await setArticlesApproval(selectedArticles, false);
        setArticles(await fetchArticles());
        setNumUnapproved(await getTotalUnapprovedArticles());
        setSelectedArticles([])
    }


    const reportRequest = {
        minuteRanges: [
            {
              startMinutesAgo: 29,
              endMinutesAgo: 0
            }
        ],
        metrics: [
            {
              name: "activeUsers"
            }
        ],
        dimensions: [
            {
              name: "minutesAgo"
            }
        ],
    };

    const [reportData, setReportData] = useState(null);
    const [error, setError] = useState(null);

    const propertyId = process.env.NEXT_PUBLIC_PROPERTY_ID;
    
    const chartData = useChartData(reportData);

    const handleFetchReport = async () => {
        setError(null); // Clear any previous errors
        try {
            const report = await fetchGoogleAnalyticsReport(propertyId, reportRequest);
            setReportData(report); // Update the state with the fetched report data
        } catch (err) {
            console.error(err); // Log any errors that occurred during the fetch
            setError(err); // Update the error state with the caught error
        } 
    };

    const timeValueFormatter = (value) => {
        if(value[0] === "0"){
            return `${value[1]} Mins Ago`
        }else{
            return `${value} Mins Ago`
        }
    }

    const handleSignIn = async () => {
        await ApiSignIn();
        setIsSignedIn(true); // Update the state based on actual sign-in status
    };

    useEffect(() => {
        // Check if the user is signed in before setting the interval
        if (isSignedIn) {
            // Call the function immediately if needed, then set the interval
            handleFetchReport(); // Optional: Remove if you don't want to execute immediately
    
            const intervalId = setInterval(() => {
                handleFetchReport();
            }, 1000); // 5000 milliseconds = 5 seconds
    
            // Cleanup function to clear the interval when the component unmounts
            return () => clearInterval(intervalId);
        }
        // If the isSignedIn status changes, the effect will rerun.
    }, [isSignedIn]);

    if(isSignedIn === false){
        return(
            <div className="w-full h-screen pt-[69px] flex items-center justify-center gap-[50px]">
                <Header type="sm" classes={"w-max"}>
                    Are you an admin?
                </Header>
                <NeoButton classes={"bg-primary-dark"} onClick={() => handleSignIn()}>
                    Sign In
                </NeoButton>
            </div>
        )
    }


    const ArticlePanel = () => {
        const [currentPage, setCurrentPage] = useState(1);
        const articlesPerPage = 25; // Now displaying 2 articles per page
    
        // Calculate the indices of the articles to display
        const indexOfLastArticle = currentPage * articlesPerPage;
        const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
        const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);
    
    
        // Handle page change
        const handleChangePage = (event, newPage) => {
            setCurrentPage(newPage);
        };

        return(
            <div className="flex flex-col h-full w-full justify-between ">
                <div className="flex flex-col gap-[25px] w-full">
                    <div className="w-full flex flex-col gap-[28px] sm:gap-[15px] sm:flex-row sm:gap-0 justify-between">
                        <div className="w-full sm:w-max h-full flex gap-[15px]">
                            <RiSearchFill style={{fontSize: "30px"}} role="link">SearchPage</RiSearchFill>  
                            <input type="search" name="search" required minLength="4" className="neo-input grow sm:w-[180px]" value={search} onChange={(e) => handleSearchChange(e)}/>
                        </div>
                        <Divider   className="flex sm:hidden" flexItem />
                        <div className="w-full flex sm:w-max ">
                            <div className="flex w-full justify-between gap-[15px]">
                                <div className="flex justify-between">  
                                    <Tooltip classes={{ tooltip: classes.customTooltip }} title="Approve">
                                        <button className="w-[35px]  flex justify-center items-center" onClick={() => handleSetArticlesApproved()}>
                                            <MdDone className="text-2.5xl items-center"/>
                                        </button >
                                    </Tooltip>
                                    <Tooltip classes={{ tooltip: classes.customTooltip }} title="Unapprove">
                                        <button className="w-[35px]  flex justify-center items-center" onClick={() => handleSetArticlesUnapproved()}>
                                            <MdClose className="text-2.5xl" />
                                        </button>  
                                    </Tooltip>
                                    <Tooltip classes={{ tooltip: classes.customTooltip }} title="Delete">
                                        <button className="w-[35px]  flex justify-center items-center" onClick={() => handleDeleteArticles()}>
                                            <MdDelete className="text-2.5xl" />
                                        </button> 
                                    </Tooltip>                    
                                </div>
                                <NeoButton classes="bg-primary-dark" onClick={handleSelectAll}>
                                    Select All
                                </NeoButton>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-max">
                        {
                            numUnapproved > 0
                            ?
                            `You have ${numUnapproved} unapproved ${numUnapproved > 1 ? 'articles' : 'article'}.`
                            :
                            'You are all up to date!'
                        }
                        
                    </div>
                    <div className="w-full h-max flex flex-wrap 2xl:flex-col gap-[15px]">
                        {
                            currentArticles
                            &&
                            currentArticles.map((article) => (
                                    <div className={`w-full h-max sm:w-[calc(100%_/_2)]  md:w-max 2xl:w-full rounded-md h-full 2xl:h-[50px] border-3 overflow-hidden flex flex-col 2xl:flex-row text-lg ${selectedArticles.includes(article.id) && 'bg-[#c8c8c8]'}`} key={article.id} onClick={() => handleSelection(article.id)}>
                                        <div className="flex w-full md:w-max 2xl:grow grow 2xl:h-full flex-col 2xl:flex-row">
                                            <div className="flex grow w-full md:w-[200px] py-[15px] 2xl:py-0 pl-[10px] min-h-[50px] items-center">
                                                {article.Publisher}
                                            </div>
                                            <Divider orientation="vertical"   className="hidden 2xl:flex" flexItem />
                                            <Divider   className="flex 2xl:hidden" flexItem />
                                            <div className="flex h-full w-full md:w-[200px] py-[15px] 2xl:py-0 pl-[10px] min-h-[50px] items-center">
                                                {article.Author}
                                            </div>
                                            <Divider orientation="vertical"   className="hidden 2xl:flex" flexItem />
                                            <Divider   className="flex 2xl:hidden" flexItem />
                                            <div className="flex h-full w-full md:w-[200px] py-[15px] 2xl:py-0 pl-[10px] min-h-[50px] items-center">
                                                {article.Title}
                                            </div>
                                            <Divider orientation="vertical"   className="hidden 2xl:flex" flexItem />
                                            <Divider   className="flex 2xl:hidden" flexItem />
                                            <div className="flex h-full w-full md:w-[200px] py-[15px] 2xl:py-0 pl-[10px] items-center min-h-[50px]">
                                                {article.Time} 
                                            </div>
                                            <Divider orientation="vertical" className="hidden 2xl:flex" flexItem />
                                            <Divider   className="flex 2xl:hidden" flexItem />
                                            <div className="flex h-full w-full md:w-[200px] py-[15px] 2xl:py-0 pl-[10px] items-center min-h-[50px]">
                                                Date here
                                            </div>
                                            <Divider orientation="vertical"   className="hidden 2xl:flex" flexItem />
                                            <Divider   className="flex 2xl:hidden" flexItem />
                                            <div className="flex h-full w-full md:w-[200px] flex items-center py-[15px] pl-[10px] min-h-[50px]">
                                                No Cover Image Available
                                            </div>
                                            <div className={`h-full w-full md:w-[200px] 2xl:grow flex border-y-3 2xl:border-x-3 2xl:border-y-0 pl-[10px] py-[15px] items-center ${article.Approved ? "bg-primary-dark" : "bg-[#fd6666]"}`}>
                                                {
                                                    article.Approved
                                                    ?
                                                    "Approved"
                                                    :
                                                    "Unapproved"
                                                }
                                            </div>
                                        </div>
                                        <div className="flex h-full w-full 2xl:w-max p-[10px] max-h-[39px] 2xl:max-h-full 2xl:gap-[10px] justify-between">
                                            <Tooltip classes={{ tooltip: classes.customTooltip }} title="Edit">
                                                <button onClick={() => router.push(`/editor/${article.id}`)} >
                                                    <FaPen className="text-xl w-[25px]"/>
                                                </button>
                                            </Tooltip>
                                            <Divider orientation="vertical" flexItem />
                                            <Tooltip classes={{ tooltip: classes.customTooltip }} title="View">
                                                <button>
                                                    <MdOutlinePreview className="text-2xl w-[25px]" />
                                                </button>
                                            </Tooltip>
                                        </div>
                                    </div>
                            ))
                        }            
                    </div>

                </div>
                {
                    (Math.ceil(articles.length / articlesPerPage) > 1)
                    &&
                    <div className="w-full flex justify-center h-max">
                        <Pagination count={Math.ceil(articles.length / articlesPerPage)} page={currentPage} onChange={handleChangePage} variant="outlined" shape="rounded"   sx={{'& .MuiButtonBase-root': { borderWidth: '2px', borderRadius: '5px', borderColor: 'black' }}}  />
                    </div>
                }

            </div>
        )
    }


    const AnalyticsPanel = () => {

        return(
            <>

            </>
        )
    };

    const valueFormatter = (value) => `${value} Users`;


    return(
        <div className="h-max min-h-[calc(100vh_-_67px)] w-full flex pt-[67px]">
            <div className={`flex  ${isSideBarOpen ? 'w-max border-r-3' : 'w-0'}`}>
                <div className={`flex flex items-end h-[calc(100vh_-_80px)] ${isSideBarOpen ? 'w-max' : 'w-0'}`}>
                    <div className={`h-full dark:bg-base-dark  lg:w-[250px]  flex flex-col  gap-[25px] items-start 2xl:items-center 3xl:items-start overflow-hidden ${isSideBarOpen ? "w-max 2xl:min-w-max px-[25px] lg:pl-[50px]  2xl:pl-[25px] py-[152px]" : "w-0" }`}>
                        <button className="flex items-center gap-[15px] w-full" onClick={() => setCurrentPanel("analytics")}>
                            <Badge badgeContent={0} color="primary">
                                <MdAnalytics  className="text-2.7xl" /> 
                            </Badge>
                            <span className="hidden lg:inline">
                                Analytics
                            </span>
                        </button>
                        <button className="flex items-center gap-[15px] w-full" onClick={() => setCurrentPanel("users")}>
                            <Badge badgeContent={0} color="primary">
                                <MdAccountCircle className="text-2.7xl" /> 
                            </Badge>
                            <span className="hidden lg:inline">
                                Users
                            </span>
                        </button>
                        <button className="flex items-center gap-[15px] w-full" onClick={() => setCurrentPanel("articles")}>
                            <Badge badgeContent={numUnapproved} color="primary">
                                <MdArticle className="text-2.7xl"/> 
                            </Badge>
                            <span className="hidden lg:inline">
                                Articles
                            </span>
                        </button>
                    </div>
                    <div className='w-0 h-[45px] py-[2px] z-10'>
                        <div className={` relative rounded-r w-[30px] justify-center w-[30px] ${isSideBarOpen && "rounded-l rounded-r"}  h-full flex items-center  bg-base-300`} onClick={() => setIsSideBarOpen(!isSideBarOpen)}>
                            {
                                (isSideBarOpen)
                                ?
                                <IoIosArrowBack className="text-t-header-dark text-2xl " />
                                :
                                <IoIosArrowForward className="text-t-header-dark text-2xl"/>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="grow min-h-full  flex flex-col">
                <div className="w-full h-max border-b-3 flex items-center p-7">
                    <Header type="lg" classes="w-full">
                        {
                        (currentPanel === "articles")
                        &&
                        <>
                            Article Console.
                        </>
                        }
                    </Header>
                </div>
                <div className="h-full w-full p-7 flex flex-col items-center gap-[15px]">
                    {
                        (currentPanel === "articles")
                        &&
                        <ArticlePanel />
                    }
                    {
                        (currentPanel === "analytics")
                        &&
                        <div className="flex w-full">
                            {chartData &&
                                <BarChart
                                    width={500}
                                    height={200}
                                    dataset={chartData}
                                    yAxis={[{label: "Number of Users"}]}
                                    xAxis={[{scaleType: 'band', dataKey: "time", valueFormatter}]}
                                    series={[{ dataKey: 'numUsers', label: 'User Trafic', valueFormatter}]}
                                    margin={{
                                        top: 5, right: 30, left: 20, bottom: 5,
                                    }}
                                />
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Admin;