import React, {useState, useEffect} from 'react';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Divider, Tooltip } from '@mui/material';
import { AnimatePresence, motion } from "framer-motion";

import { useRouter } from 'next/navigation';

import { MdDone, MdClose, MdDelete, MdOutlinePreview  } from 'react-icons/md';
import { FaPen } from 'react-icons/fa';

import Header from '../TextComponents/Header1';
import NeoButton from '../TextComponents/NeoButton';
import Paragraph from "../TextComponents/Paragraph"
import { deleteArticles, fetchArticles,  getTotalUnapprovedArticles, setArticlesApproval} from '../../firebase/articleUtils/articleUtils';
import { fetchSessions, addSession } from '../../firebase/sessionUtils/sessionUtils';
import { TextField } from '@mui/material';

const HomePanel = ({articles, setArticles, classes, setNumUnapproved, sessions, setSessions, users, setUsers}) => {
    const [sessionInfo, setSessionInfo] = useState({ID: null, Experation: null});
    const [sessionError, setSessionError] = useState("");
    const [sessionErrorIsVisible, setSessionErrorIsVisible] = useState(false);


    const [currentPage, setCurrentPage] = useState(1);
    const [selectedArticles, setSelectedArticles] = useState([])
    const [selectedSession, setSelectedSession] = useState();
    const articlesPerPage = 25; // Now displaying 2 articles per page

    // Calculate the indices of the articles to display
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

    const router = useRouter();
    const dayjs = new AdapterDayjs(); 

    
    const handleFetchSessions = async () => {
        const tempSessions = await fetchSessions()
        setSessions(tempSessions)
    }

    const handleSelectAll = () => {
        setSelectedArticles(selectedArticles.length < articles.length ? articles.map(article => article.id) : []);
    }

    const handleDeleteArticles = async () => {
        deleteArticles(selectedArticles)
        setSelectedArticles([]);
        const tempArticles = await fetchArticles();
        setArticles(tempArticles); // Refresh articles list after deletion
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

    useEffect(() => {
        if(!sessions){
            handleFetchSessions();
        }
    }, [])
    
    const handleAddSession = () => {

        if(sessionInfo.Experation !== null && sessionInfo.ID !== null){
            addSession(sessionInfo.ID, sessionInfo.Experation, false)
            handleFetchSessions();
        }else{
            if(sessionInfo.Experation === null && sessionInfo.ID === null){
                setSessionErrorIsVisible(true);
                setSessionError("The ID and expiration cannot be blank");
                setTimeout(() => setSessionErrorIsVisible(false), 3000);
            }else if(sessionInfo.Experation === null){
                setSessionErrorIsVisible(true);
                setSessionError("The expiration cannot be blank.");
                setTimeout(() => setSessionErrorIsVisible(false), 3000);
            }else{
                setSessionErrorIsVisible(true);
                setSessionError("The ID cannot be blank.");
                setTimeout(() => setSessionErrorIsVisible(false), 3000);
            }
        }
    }

    const handleGenerateSession = () => {
        setSessionInfo({ID: Math.random().toString(36).substr(2, 6), Experation: sessionInfo.Experation})
    }

    const handleSetSessionDate = (Date) => {
        setSessionInfo({ID: sessionInfo.ID, Experation: Date.format()})
    }

    const convertDateTime = (dateTime) => {
        const date = new Date(dateTime);
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // getMonth() returns 0-11
        const day = date.getDate();
        return `${year}-${month}-${day}`;
      };


      const isTimeInPast = (time) => new Date(time) < new Date()

      const handleSetSelectedArticles = (id) => {
        if(selectedArticles.includes(id)){
            const tempArticles = selectedArticles.filter(item => item !== id);
            setSelectedArticles(tempArticles)
        }else{
            setSelectedArticles(prevState => [...prevState, id])
        }
      }

    return(
        <>
            <div className="h-full w-full flex flex-col 2xl:flex-row  gap-7 p-7 bg-grid-image transition duration-100">
                <div className=" rounded-md border-3 flex flex-col md:flex-row justify-between 2xl:flex-col p-[15px] shadow pb-0 gap-7 bg-base-100">
                    <div className="flex flex-col gap-[15px] w-full xl:w-[40%] pb-[20px] 2xl:w-full 2xl:pb-0 h-max ">
                        <div className="w-full h-max ">
                            <Header type="sm" >
                                Class Session
                            </Header>
                        </div>
                        
                        <span className="text-lg underline decoration-dashed">
                            Session ID
                        </span>
                        <span className="text-lg">
                            {
                                sessionInfo.ID
                                ?
                                <>
                                    {sessionInfo.ID}
                                </>
                                :
                                <>
                                    No ID generated.
                                </>
                            }
                        </span>
                        <Tooltip classes={{ tooltip: classes.customTooltip }} title="The date this session id will expire">
                            <span className="text-lg underline decoration-dashed">
                                Expiration
                            </span>
                        </Tooltip>
                        
                        <div className="h-max">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                color="secondary"
                                label="Basic date picker"
                                defaultValue={sessionInfo.Experation}
                                onChange={(newValue) => handleSetSessionDate(newValue)}
                                slotProps={{ textField: { size: 'small' } }}
                                renderInput={(params) => <TextField size="small" {...params} />}
                                
                                />
                            </ LocalizationProvider>
                        </div>
                        <div className="flex justify-between">
                            <NeoButton classes="bg-primary" onClick={() => handleGenerateSession()}>
                                New Session
                            </NeoButton>
                            <NeoButton classes="bg-primary-dark" onClick={() => handleAddSession()}>
                                Save
                            </NeoButton>
                        </div>
                        <AnimatePresence>
                            {sessionErrorIsVisible && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="rounded-md p-[15px]"
                                    style={{ background: '#fd6666', color: "black", marginTop: "15px"}}
                                >
                                    {sessionError}
                                </motion.div>
                            )}
                        </AnimatePresence>

                    </div>
                    <div className="grow flex flex-col w-full xl:w-[30%] 2xl:w-full ">
                        <div className={`flex justify-between w-full h-max px-[15px] py-[5px] items-center text-lg `}>
                            <Tooltip classes={{ tooltip: classes.customTooltip }} title="The selected session id">
                                <div className="flex-1 underline decoration-dashed">
                                    Session ID
                                </div>
                                </Tooltip>
                            <Tooltip classes={{ tooltip: classes.customTooltip }} title="The expiration date for the session id.">
                                <div className="flex-1 px-[15px] underline decoration-dashed">
                                    Expiration
                                </div>
                            </Tooltip>
                            <Tooltip classes={{ tooltip: classes.customTooltip }} title="Whether the session id has expired.">
                                <div className="flex-1 text-right underline decoration-dashed">
                                    Is Expired
                                </div>
                            </Tooltip>
                        </div>
                        <div className="flex w-full grow flex flex-col text-lg Unapproved200 rounded-t-md  border-3 border-b-0 bg-base-200 min-h-[400px] md:min-h-0 overflow-y-scroll scrollbar-hide">
                            {
                                sessions
                                ?
                                <>
                                    {
                                        sessions.map((data, index) => (
                                            <div key={index} className={`flex justify-between w-full h-max px-[15px] hover:bg-base-200 border-b-3 bg-base-100 shadow items-center ${(index === 0 && "rounded-t-md")}`} onClick={() => setSelectedSession(data.id)}>
                                                <div className="flex-1 py-[5px]"  onClick={() => setSelectedSession(data.id)}>
                                                    {data.id}
                                                </div>
                                                <Divider orientation="vertical" />
                                                <div className="flex-1 px-[15px] py-[5px]"  onClick={() => setSelectedSession(data.id)}>
                                                    {convertDateTime(data.Experation)}
                                                </div>
                                                <Divider orientation="vertical" />
                                                <div className="flex-1 text-right py-[5px]" onClick={() => setSelectedSession(data.id)}>
                                                    {isTimeInPast(convertDateTime(data.Experation)) ? "True" : "False"}
                                                </div>
                                            </div>
                                        ))
                                    }
                                </>
                                :
                                <>
                                    NO DATA!
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-7 grow h-full'>
                <div className="h-max rounded-md border-3 flex flex-col xl:flex-row p-[15px] pb-0 gap-[25px] text-lg bg-base-100 shadow">
                    <div className="flex w-full flex-col items-start sm:items-center lg:items-start md:justify-between sm:flex-row xl:flex-col lg:w-max lg:w-auto xl:grow gap-[15px]">
                        <div className="flex flex-col w-max grow gap-[15px]">
                            <Header type="sm" >
                                Class Session
                            </Header>
                            <Tooltip classes={{ tooltip: classes.customTooltip }} title="The selected session ID.">
                                <span className="text-lg underline decoration-dashed">
                                    Selected Session ID
                                </span>
                            </Tooltip>
                            <span className="text-lg">
                                {
                                    selectedSession
                                    ?
                                    selectedSession
                                    :
                                    <>
                                    No Session has been selected. 
                                    <br />
                                    Showing All users.
                                    </>
                                    
                                }
                            </span>
                        </div>
                        <div className="grow flex ">
                            <div className="h-full w-[200px] flex text-center flex-col justify-center lg:justify-start">
                                <Tooltip classes={{ tooltip: classes.customTooltip }} title="Users who have signed up using the selected session ID.">
                                    <span className="text-lg underline decoration-dashed">
                                        Users This Session
                                    </span>
                                </Tooltip>
                                
                                <div className="w-full h-max text-7xl">
                                    {users.filter(user => !selectedSession || user.sessionCode === selectedSession).length}
                                </div>
                            </div>
                            <div className="h-full w-[200px] flex text-center flex-col justify-center lg:justify-start">
                                <Tooltip classes={{ tooltip: classes.customTooltip }} title="Users who have submitted an article with the selected session ID.">
                                    <span className="text-lg underline decoration-dashed">
                                        User Submittions
                                    </span>
                                </ Tooltip>
                                <div className="w-full h-max text-7xl">
                                    {users.filter(user => !selectedSession || (user.sessionCode === selectedSession && user.hasPublished)).length}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="h-full flex flex-col w-full xl:w-[60%] gap-[25px]">
                        <div className="w-full flex flex-col grow gap-[15px]">
                            <div className="w-full flex h-min">
                                <Tooltip classes={{ tooltip: classes.customTooltip }} title="the user's first name">
                                    <div className="flex grow w-full md:basis-[200px] py-[15px] 2xl:py-0 pl-[10px] items-center underline decoration-dashed">
                                        First Name
                                    </div>
                                </Tooltip>
                                <Tooltip classes={{ tooltip: classes.customTooltip }} title="the user's last name">
                                    <div className="flex h-max w-full md:basis-[200px] py-[15px] 2xl:py-0 pl-[10px] items-center underline decoration-dashed">
                                        Last Name
                                    </div>
                                </Tooltip>
                                <Tooltip classes={{ tooltip: classes.customTooltip }} title="The user's current session id for their log in">
                                    <div className="flex h-max w-full md:basis-[200px] py-[15px] 2xl:py-0 pl-[10px] items-center underline decoration-dashed">
                                        Session ID
                                    </div>
                                </Tooltip>
                                <Tooltip classes={{ tooltip: classes.customTooltip }} title="Whether the user has published or not.">
                                    <div className="flex h-max w-full md:basis-[200px] py-[15px] 2xl:py-0 pl-[10px] items-center underline decoration-dashed">
                                        Has Published
                                    </div>
                                </Tooltip>
                            </div>
                            <div className="flex w-full h-[300px] min-h-[400px] xl:min-h-[300px] sm:h-auto sm:grow flex flex-col text-lg  rounded-t-md  border-3 border-b-0 bg-base-200 overflow-y-scroll scrollbar-hide">
                                {
                                    users
                                    &&
                                    selectedSession
                                    ?
                                    users.filter(user => !selectedSession || user.sessionCode === selectedSession).length !== 0
                                    ?
                                    users.filter(user => !selectedSession || user.sessionCode === selectedSession).map((user, index) => (
                                        <div key={index} className={`flex justify-between w-full h-max  bg-base-100 items-center shadow ${index === 0 && "rounded-t-md"} ${index !== (users.length - 1) && "border-b-3"}`}>
                                            <div className="flex grow md:basis-[200px] py-[15px] 2xl:py-0 pl-[10px] min-h-[50px] items-center">
                                                {user.firstName}
                                            </div>
                                            <Divider orientation="vertical"/>
                                            <div className="hidden md:flex basis-[200px] py-[15px] 2xl:py-0 pl-[10px] min-h-[50px] items-center">
                                                {user.lastName}
                                            </div>
                                            <Divider orientation="vertical"/>
                                            <div className="hidden md:flex basis-[200px] py-[15px] 2xl:py-0 pl-[10px] items-center min-h-[50px]">
                                                {user.sessionCode}
                                            </div>
                                            <Divider orientation="vertical"/>
                                            <div className={`hidden md:flex basis-[200px] 2xl:grow pl-[10px] py-[15px] items-center`}>
                                                {
                                                user.hasPublished
                                                ?
                                                "Has Published"
                                                :
                                                "Has Not Published"
                                                }
                                            </div>
                                        </div>
                                    ))
                                    :
                                    <div className='w-full h-full flex items-center justify-center text-shadow'>
                                        <div className='w-[300px]'>
                                            <Header type="lg" classes="w-[300px] text-center">
                                                    Oops!
                                            </Header>
                                            <Paragraph type="md" classes="text-t-header-dark text-center text-shadow">
                                                    It looks like you dont have an ID selected!
                                                    Click one.
                                            </Paragraph>
                                        </div>
                                    </div>
                                    :
                                    <div className='w-full h-full flex items-center justify-center text-shadow'>
                                        <div className='w-[300px]'>
                                            <Header type="lg" classes="w-[300px] text-center">
                                                    Oops!
                                            </Header>
                                            <Paragraph type="md" classes="text-t-header-dark text-center text-shadow">
                                                    It looks like no one has used this session code yet!
                                                    Check again later.
                                            </Paragraph>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" rounded-md border-3 flex flex-col xl:flex-row p-[15px] pb-0 gap-[25px] text-lg bg-base-100 shadow">
                    <div className="flex w-full flex-col items-start sm:items-center lg:items-start md:justify-between sm:flex-row xl:flex-col lg:w-max lg:w-auto xl:grow gap-[15px]">
                    <div className="flex flex-col w-max grow gap-[15px]">
                            <Header type="sm" >
                                Class Session
                            </Header>
                            <Tooltip classes={{ tooltip: classes.customTooltip }} title="The selected session ID.">
                                <span className="text-lg underline decoration-dashed">
                                    Selected Session ID
                                </span>
                            </Tooltip>
                            <span className="text-lg">
                                {
                                    selectedSession
                                    ?
                                    selectedSession
                                    :
                                    "No Session has been selected"
                                }
                            </span>
                        </div>
                        <div className="grow flex ">
                            <div className="h-full w-[200px] flex text-center flex-col">
                                <Tooltip classes={{ tooltip: classes.customTooltip }} title="The amount of submitted articles this session">
                                    <span className="text-lg underline decoration-dashed">
                                        Articles This Session
                                    </span>
                                </Tooltip>
                                
                                <div className="w-full h-max text-7xl">
                                    {articles.filter(article => !selectedSession || article.SessionCode === selectedSession).length}
                                </div>
                            </div>
                            <div className="h-full w-[200px] flex text-center flex-col">
                                <Tooltip classes={{ tooltip: classes.customTooltip }} title="how many articles have been approved this session">
                                    <span className="text-lg underline decoration-dashed">
                                        Approved
                                    </span>
                                </ Tooltip>
                                <div className="w-full h-max text-7xl">
                                    {articles.filter(article => !selectedSession || (article.SessionCode === selectedSession && article.Approved)).length}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="h-full flex flex-col w-full xl:w-[60%] gap-[15px]">
                        <div className="w-full flex flex-col gap-[28px] sm:gap-[15px] sm:flex-row sm:gap-0 justify-end">
                            <div className="w-full flex  sm:w-max ">
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
                        <div className="w-full flex flex-col grow gap-[15px]">
                            <div className="w-full flex h-min">
                                <Tooltip classes={{ tooltip: classes.customTooltip }} title="The user who published the article">
                                    <div className="flex grow w-full md:basis-[200px] py-[15px] 2xl:py-0 pl-[10px] items-center underline decoration-dashed">
                                        Publisher
                                    </div>
                                </Tooltip>
                                <Tooltip classes={{ tooltip: classes.customTooltip }} title="The display title of the article">
                                    <div className="flex h-max w-full md:basis-[200px] py-[15px] 2xl:py-0 pl-[10px] items-center underline decoration-dashed">
                                        Title
                                    </div>
                                </Tooltip>
                                <Tooltip classes={{ tooltip: classes.customTooltip }} title="The date the article was submitted">
                                    <div className="flex h-max w-full md:basis-[200px] py-[15px] 2xl:py-0 pl-[10px] items-center underline decoration-dashed">
                                        Date
                                    </div>
                                </Tooltip>
                                <Tooltip classes={{ tooltip: classes.customTooltip }} title="Whether the article is approved or not">
                                    <div className="flex h-max w-full md:basis-[200px] py-[15px] 2xl:py-0 pl-[10px] items-center underline decoration-dashed">
                                        Approval
                                    </div>
                                </Tooltip>
                                <div className="flex h-full min-w-[90px] p-[10px] max-h-[39px] 2xl:max-h-full 2xl:gap-[10px] justify-between">

                                </div>
                            </div>
                            <div className={`flex w-full min-h-[400px] xl:min-h-[300px] sm:h-auto sm:grow  flex flex-col text-lg bg-base-200 rounded-t-md  border-3 border-b-0 overflow-y-scroll scrollbar-hide ${articles.length === 0 && !sessionInfo.ID && "justify-center"}`}>
                                {
                                    articles
                                    &&
                                    articles.length !== 0
                                    ?
                                    selectedSession
                                    ?
                                    articles.filter(article => !selectedSession || article.SessionCode === selectedSession).map((article, index) => (
                                        <div key={index} className={`flex justify-between w-full h-max border-b-3 bg-base-100 shadow items-center ${selectedArticles.includes(article.id) ? "bg-base-200" : ""} ${index === 0 ? "rounded-t-md" : ""}`} onClick={() => handleSetSelectedArticles(article.id)}>
                                            <div className="flex grow md:basis-[200px] py-0 pl-[10px] min-h-[50px] items-center">
                                                {article.Publisher}
                                            </div>
                                            <Divider orientation="vertical"/>
                                            <div className="hidden md:flex basis-[200px] py-0 pl-[10px] min-h-[50px] items-center">
                                                {article.Title}
                                            </div>
                                            <Divider orientation="vertical"/>
                                            <div className="hidden md:flex basis-[200px]  py-0 pl-[10px] items-center min-h-[50px]">
                                                {new Date(article.Time.seconds * 1000 + article.Time.nanoseconds/1000000).toLocaleDateString()}
                                                
                                            </div>
                                            <div className={`hidden md:flex basis-[200px] grow border-x-3 max-w-[70px] border-y-0 h-full pl-[10px] items-center ${article.Approved ? "bg-primary-dark" : "bg-[#fd6666]"} `}>
                                                {article.Approved ? "True" : "False"}
                                            </div>
                                            <div className="flex h-full w-full w-max p-[10px] max-h-[39px] max-h-full gap-[10px] justify-between">
                                                <Tooltip classes={{ tooltip: classes.customTooltip }} title="Edit">
                                                    <button onClick={() => router.push(`/editor/blog/${article.id}`)} >
                                                        <FaPen className="text-xl w-[25px]"/>
                                                    </button>
                                                </Tooltip>
                                                <Divider orientation="vertical"/>
                                                <Tooltip classes={{ tooltip: classes.customTooltip }} title="View">
                                                    <button>
                                                        <MdOutlinePreview className="text-2xl w-[25px]" />
                                                    </button>
                                                </Tooltip>
                                            </div>
                                        </div>
                                        ))
                                        :
                                        <div className='w-full h-full flex items-center justify-center text-shadow'>
                                            <div className='w-[300px]'>
                                                <Header type="lg" classes="w-[300px] text-center">
                                                        Oops!
                                                </Header>
                                                <Paragraph type="md" classes="text-t-header-dark text-center text-shadow">
                                                        It looks like you dont have an ID selected!
                                                        Click one.
                                                </Paragraph>
                                            </div>
                                        </div>
                                        :
                                        <div className='w-full h-full flex items-center justify-center text-shadow'>
                                            <div className='w-[300px]'>
                                                <Header type="lg" classes="w-[300px] text-center">
                                                        Oops!
                                                </Header>
                                                <Paragraph type="md" classes="text-t-header-dark text-center text-shadow">
                                                        It looks like no one has used this session code yet!
                                                        Check again later.
                                                </Paragraph>
                                            </div>
                                        </div>

                                }
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </>
    )
}

export default HomePanel;