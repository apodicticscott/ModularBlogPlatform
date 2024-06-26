import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { RiSearchFill } from "react-icons/ri";
import { MdDone, MdClose, MdDelete, MdOutlinePreview } from "react-icons/md";
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import Pagination from '@mui/material/Pagination';
import { FaPen } from "react-icons/fa";
import useDocumentClassChange from '../../hooks/useDocumentClassChange';
import DynamicLabel from '../TextComponents/DynamicLabel';

import { 
    fetchPages, 
    deletePages, 
    setPagesApproval,
    getTotalUnapprovedPages,
    searchArticles
    } from "../../firebase/articleUtils/articleUtils";

import NeoButton from "../TextComponents/NeoButton"

const PagePanel = ({setNumUnapproved, numUnapproved, setPages, pages, classes}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedPages, setSelectedPages] = useState([])
    const [currentPages, setCurrentPages] = useState([])
    const [searchResults, setSearchResults] = useState(null);
    const [searchTerm, setSearchTerm] = useState(null);
    const pagesPerPage = 35; // Now displaying pages per page

    const [authorBasis, setAuthorBasis] = useState(200);
    const [publisherBasis, setPublisherBasis] = useState(200);
    const [titleBasis, setTitleBasis] = useState(200);
    const [timeBasis, setTimeBasis] = useState(200);
    const [dateBasis, setDateBasis] = useState(100);
    const [imageBasis, setImageBasis] = useState(150);
    
    const labels = [
        { key: 'author', label: 'Author', basis: authorBasis, setBasis: (value) => setAuthorBasis(value) },
        { key: 'publisher', label: 'Publisher', basis: publisherBasis, setBasis: (value) => setPublisherBasis(value) },
        { key: 'title', label: 'Title', basis: titleBasis, setBasis: (value) => setTitleBasis(value) },
        { key: 'time', label: 'Time', basis: timeBasis, setBasis: (value) => setTimeBasis(value) },
        { key: 'date', label: 'Date', basis: dateBasis, setBasis: (value) => setDateBasis(value) },
        { key: 'image', label: 'Cover Image', basis: imageBasis, setBasis: (value) => setImageBasis(value) },
    ];
    

    // Calculate the indices of the pages to display
    const indexOfLastPage = currentPage * pagesPerPage;
    const indexOfFirstPage = indexOfLastPage - pagesPerPage;

    const currentTheme = useDocumentClassChange();
    
    useEffect(() => {
        setCurrentPages(pages.slice(indexOfFirstPage, indexOfLastPage))
    }, [pages])

    const router = useRouter();

    // Handle page change
    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const handleSelection = (id) => {
        setSelectedPages(prevSelected => prevSelected.includes(id) ? prevSelected.filter(pageId => pageId !== id) : [...prevSelected, id]);
    }

    const handleSelectAll = () => {
        setSelectedPages(selectedPages.length < pages.length ? pages.map(page => page.id) : []);
    }

    const handleDeletePages = async () => {
        deletePages(selectedPages)
        setSelectedPages([]);
        const tempPages = await fetchPages();
        setPages(tempPages); // Refresh pages list after deletion
    };

    const handleSetPagesApproved = async () => {
        await setPagesApproval(selectedPages, true);
        setPages(await fetchPages());
        setNumUnapproved(await getTotalUnapprovedPages());
        setSelectedPages([])
    }

    const handleSetPagesUnapproved = async () => {
        await setPagesApproval(selectedPages, false);
        setPages(await fetchPages());
        setNumUnapproved(await getTotalUnapprovedPages());
        setSelectedPages([])
    }

    const handleSearchChange = async (event) => {
        const term = event.target.value;
 
        setSearchTerm(term);
        
        

        if(term) {
            const terms = term.split(" ");
            if(terms.length > 0 ){
                const array = await searchArticles(terms, pages, true);
                // const array2 = await searchArticles2(terms, articles, true);
                setSearchResults(array);
            }
        } else {
            setSearchResults(null);
        }
    };

    return(
        <div className="flex flex-col h-full w-full justify-between p-7">
            <div className="flex flex-col gap-[25px] w-full">
                <div className={`w-full flex flex-col gap-[28px] sm:gap-[15px] sm:flex-row sm:gap-0 justify-between bg-base-200 dark:bg-[#322e38] p-3 rounded-md ${currentTheme === "dark" && "shadow-lg-dark"}`}>
                    <div className="w-full sm:w-max h-full flex gap-[15px] items-center">
                        <RiSearchFill className={"text-base-100-dark"} style={{fontSize: "30px"}} role="link"/> 
                        <input type="search" name="search" required minLength="4" onChange={(e) => handleSearchChange(e)} className="neo-input grow sm:w-[180px] dark:bg-[#18161b]"/>
                    </div>
                    <Divider   className="flex sm:hidden" flexItem />
                    <div className="w-full flex sm:w-max ">
                        <div className="flex w-full justify-between gap-[15px]">
                            <div className="flex justify-between">  
                                <Tooltip classes={{ tooltip: classes.customTooltip }} title="Approve">
                                    <button className="w-[35px]  flex justify-center items-center" onClick={() => handleSetPagesApproved()}>
                                        <MdDone className="text-2.5xl items-center"/>
                                    </button >
                                </Tooltip>
                                <Tooltip classes={{ tooltip: classes.customTooltip }} title="Unapprove">
                                    <button className="w-[35px]  flex justify-center items-center" onClick={() => handleSetPagesUnapproved()}>
                                        <MdClose className="text-2.5xl" />
                                    </button>  
                                </Tooltip>
                                <Tooltip classes={{ tooltip: classes.customTooltip }} title="Delete">
                                    <button className="w-[35px]  flex justify-center items-center" onClick={() => handleDeletePages()}>
                                        <MdDelete className="text-2.5xl" />
                                    </button> 
                                </Tooltip>                    
                            </div>
                            <NeoButton classes="bg-primary-dark dark:text-t-header-light " onClick={handleSelectAll}>
                                Select All
                            </NeoButton>
                            <NeoButton classes="bg-primary-dark font-normal dark:text-t-header-light" onClick={() => router.push("/editor/page/new", undefined, {shallow: true})}>
                                Create New
                            </NeoButton>
                        </div>
                    </div>
                </div>
                <div className="w-full h-max dark:font-extralight">
                    {
                        numUnapproved > 0
                        ?
                        `You have ${numUnapproved} unapproved ${numUnapproved > 1 ? 'pages' : 'page'}.`
                        :
                        'You are all up to date!'
                    }
                    </div>
                    <div className='flex flex-col 2xl:p-2 rounded-md 2xl:bg-base-200 2xl:dark:bg-[#322e38] gap-[25px] 2xl:pt-[25px]'>
                        <div className='w-[80%] h-max hidden text-xl 2xl:flex dark:font-extralight'>
                            <DynamicLabel labels={labels}/>
                        </div>
                        <div className="w-full h-max flex flex-wrap 2xl:flex-col gap-[15px]">
                            {
                                !searchResults
                                ?
                                currentPages.map((page) => (
                                    <div className={`w-full h-max sm:w-[calc((100%_/_2)_-_10px)] ${currentTheme === "dark" ? "shadow-lg-dark" : "shadow"} md:max-w-[200px] 2xl:max-w-none 2xl:w-full rounded-md h-full 2xl:h-[50px] border-3 dark:border-2 dark:border-[#302c38] overflow-hidden flex flex-col 2xl:flex-row text-lg dark:font-extralight hover:dark:bg-[#18161b] cursor-pointer max-w-full ${selectedPages.includes(page.id) ? 'bg-[#c8c8c8] dark:bg-[#18161b]' : 'bg-base-100 dark:bg-base-100-dark '}`} key={page.id} onClick={() => handleSelection(page.id)}>
                                            <div className='flex flex-col 2xl:flex-row w-full justify-between'>  
                                                <div className="flex w-full 2xl:w-[80%] md:w-max 2xl:w-full 2xl:h-full flex-col 2xl:flex-row">
                                                    <div className={`flex w-full py-[15px] 2xl:py-0 pl-[10px] min-h-[50px] items-center `} style={(document.body.clientWidth > 1500) ? {width: authorBasis} : {width: "200px"}}>
                                                        <div className='h-max w-full truncate'>
                                                            {page.firstName + " " + page.lastName}
                                                        </div>   
                                                    </div>
                                                    <div className='min-w-[10px] h-full flex justify-center'>
                                                        <Divider orientation="vertical" className={`${currentTheme === "dark" ? classes.customDividerDark : classes.customDividerLight} hidden 2xl:flex`} flexItem />
                                                    </div>
                                                    <Divider className={`${currentTheme === "dark" ? classes.customDividerDark : classes.customDividerLight} flex 2xl:hidden`} flexItem />
                                                    <div className={`flex h-full w-full py-[15px] 2xl:py-0 pl-[10px] min-h-[50px] items-center truncate`} style={(document.body.clientWidth > 1500) ? {width: publisherBasis} : {width: "200px"}}>
                                                        <div className='h-max w-full truncate'>
                                                            {page.Author}
                                                        </div>   
                                                    </div>
                                                    <div className='min-w-[10px] h-full flex justify-center'>
                                                        <Divider orientation="vertical" className={`${currentTheme === "dark" ? classes.customDividerDark : classes.customDividerLight} hidden 2xl:flex`} flexItem />
                                                    </div>
                                                    <Divider className={`${currentTheme === "dark" ? classes.customDividerDark : classes.customDividerLight} flex 2xl:hidden`} flexItem />
                                                    <div className="flex h-[69px] lg:h-max w-full py-[15px] 2xl:py-0 px-[10px] min-h-[50px] items-center truncate" style={(document.body.clientWidth > 1500) ? {width: titleBasis} : {width: "200px"}}>
                                                        <div className='h-max w-full truncate'>
                                                            {page.Title}
                                                        </div> 
                                                    </div>
                                                    <div className='min-w-[10px] h-full flex justify-center'>
                                                        <Divider orientation="vertical" className={`${currentTheme === "dark" ? classes.customDividerDark : classes.customDividerLight} hidden 2xl:flex`} flexItem />
                                                    </div>
                                                    <Divider className={`${currentTheme === "dark" ? classes.customDividerDark : classes.customDividerLight} flex 2xl:hidden`} flexItem />
                                                    <div className="flex h-full w-full py-[15px] 2xl:py-0 px-[10px] items-center min-h-[50px]" style={(document.body.clientWidth > 1500) ? {width: timeBasis} : {width: "200px"}}>
                                                        <div className='h-max w-full truncate'>
                                                            {new Date(page.Time.seconds * 1000 + page.Time.nanoseconds/1000000).toLocaleTimeString()}
                                                        </div> 
                                                    </div>
                                                    <div className='min-w-[10px] h-full flex justify-center'>
                                                        <Divider orientation="vertical" className={`${currentTheme === "dark" ? classes.customDividerDark : classes.customDividerLight} hidden 2xl:flex`} flexItem />
                                                    </div>
                                                    <Divider className={`${currentTheme === "dark" ? classes.customDividerDark : classes.customDividerLight} flex 2xl:hidden`} flexItem />
                                                    <div className="flex h-full w-full py-[15px] 2xl:py-0 px-[10px] items-center min-h-[50px]" style={(document.body.clientWidth > 1500) ? {width: dateBasis} : {width: "200px"}}>
                                                        <div className='h-max w-full truncate'>
                                                            {new Date(page.Time.seconds * 1000 + page.Time.nanoseconds/1000000).toLocaleDateString()}
                                                        </div>
                                                    </div>
                                                    <div className='min-w-[10px] h-full flex justify-center'>
                                                        <Divider orientation="vertical" className={`${currentTheme === "dark" ? classes.customDividerDark : classes.customDividerLight} hidden 2xl:flex`} flexItem />
                                                    </div>
                                                    <Divider className={`${currentTheme === "dark" ? classes.customDividerDark : classes.customDividerLight} flex 2xl:hidden`} flexItem />
                                                    <div className="flex h-full w-full flex items-center py-[15px] px-[10px] min-h-[50px] " style={(document.body.clientWidth > 1500) ? {width: imageBasis} : {width: "200px"}}>
                                                        <div className='h-max w-full truncate'>
                                                            {
                                                                page.coverImage
                                                                ?
                                                                <>
                                                                    Available
                                                                </>
                                                                :
                                                                <>
                                                                    Unavailable
                                                                </>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='flex flex-col w-full  md:w-[200px] 2xl:flex-row 2xl:w-max'>     
                                                    <div className={`h-full w-full md:w-[200px] 2xl:w-max flex border-y-3 2xl:border-x-3 2xl:border-y-0 px-[10px] py-[15px] items-center dark:text-t-header-light font-normal dark:border-x-[#302c38] ${page.Approved ? "bg-primary-dark" : "bg-[#fd6666]"}`}>
                                                        <div className='h-max w-full min-w-[40px] truncate flex justify-center'>
                                                            {
                                                                page.Approved
                                                                ?
                                                                "True"
                                                                :
                                                                "False"
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="flex h-full w-full 2xl:w-max p-[10px] max-h-[39px] 2xl:max-h-full 2xl:gap-[10px] justify-between">
                                                        <Tooltip classes={{ tooltip: classes.customTooltip }} title="Edit">
                                                            <button onClick={() => router.push(`/editor/page/${page.id}`, undefined, {shallow: true})} >
                                                                <FaPen className="text-xl w-[25px]"/>
                                                            </button>
                                                        </Tooltip>
                                                        <Divider orientation="vertical" flexItem className={currentTheme === "dark" ? classes.customDividerDark : classes.customDividerLight} />
                                                        <Tooltip classes={{ tooltip: classes.customTooltip }} title="View">
                                                            <button onClick={() => router.push(`/pages/${page.PageName}`, undefined, {shallow: true})}>
                                                                <MdOutlinePreview className="text-2xl w-[25px]" />
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                ))
                                :
                                searchResults.map((page) => (
                                    <div className={`w-full h-max sm:w-[calc((100%_/_2)_-_10px)] ${currentTheme === "dark" ? "shadow-lg-dark" : "shadow"} md:max-w-[200px] 2xl:max-w-none 2xl:w-full rounded-md h-full 2xl:h-[50px] border-3 dark:border-2 dark:border-[#302c38] overflow-hidden flex flex-col 2xl:flex-row text-lg dark:font-extralight hover:dark:bg-[#18161b] cursor-pointer max-w-full ${selectedPages.includes(page.id) ? 'bg-[#c8c8c8] dark:bg-[#18161b]' : 'bg-base-100 dark:bg-base-100-dark '}`} key={page.id} onClick={() => handleSelection(page.id)}>
                                            <div className='flex flex-col 2xl:flex-row w-full justify-between'>  
                                                <div className="flex w-full 2xl:w-[80%] md:w-max 2xl:w-full 2xl:h-full flex-col 2xl:flex-row">
                                                    <div className={`flex w-full py-[15px] 2xl:py-0 pl-[10px] min-h-[50px] items-center `} style={(document.body.clientWidth > 1500) ? {width: authorBasis} : {width: "200px"}}>
                                                        <div className='h-max w-full truncate'>
                                                            {page.firstName + " " + page.lastName}
                                                        </div>   
                                                    </div>
                                                    <div className='min-w-[10px] h-full flex justify-center'>
                                                        <Divider orientation="vertical" className={`${currentTheme === "dark" ? classes.customDividerDark : classes.customDividerLight} hidden 2xl:flex`} flexItem />
                                                    </div>
                                                    <Divider className={`${currentTheme === "dark" ? classes.customDividerDark : classes.customDividerLight} flex 2xl:hidden`} flexItem />
                                                    <div className={`flex h-full w-full py-[15px] 2xl:py-0 pl-[10px] min-h-[50px] items-center truncate`} style={(document.body.clientWidth > 1500) ? {width: publisherBasis} : {width: "200px"}}>
                                                        <div className='h-max w-full truncate'>
                                                            {page.Author}
                                                        </div>   
                                                    </div>
                                                    <div className='min-w-[10px] h-full flex justify-center'>
                                                        <Divider orientation="vertical" className={`${currentTheme === "dark" ? classes.customDividerDark : classes.customDividerLight} hidden 2xl:flex`} flexItem />
                                                    </div>
                                                    <Divider className={`${currentTheme === "dark" ? classes.customDividerDark : classes.customDividerLight} flex 2xl:hidden`} flexItem />
                                                    <div className="flex h-[69px] lg:h-max w-full py-[15px] 2xl:py-0 px-[10px] min-h-[50px] items-center truncate" style={(document.body.clientWidth > 1500) ? {width: titleBasis} : {width: "200px"}}>
                                                        <div className='h-max w-full truncate'>
                                                            {page.Title}
                                                        </div> 
                                                    </div>
                                                    <div className='min-w-[10px] h-full flex justify-center'>
                                                        <Divider orientation="vertical" className={`${currentTheme === "dark" ? classes.customDividerDark : classes.customDividerLight} hidden 2xl:flex`} flexItem />
                                                    </div>
                                                    <Divider className={`${currentTheme === "dark" ? classes.customDividerDark : classes.customDividerLight} flex 2xl:hidden`} flexItem />
                                                    <div className="flex h-full w-full py-[15px] 2xl:py-0 px-[10px] items-center min-h-[50px]" style={(document.body.clientWidth > 1500) ? {width: timeBasis} : {width: "200px"}}>
                                                        <div className='h-max w-full truncate'>
                                                            {new Date(page.Time.seconds * 1000 + page.Time.nanoseconds/1000000).toLocaleTimeString()}
                                                        </div> 
                                                    </div>
                                                    <div className='min-w-[10px] h-full flex justify-center'>
                                                        <Divider orientation="vertical" className={`${currentTheme === "dark" ? classes.customDividerDark : classes.customDividerLight} hidden 2xl:flex`} flexItem />
                                                    </div>
                                                    <Divider className={`${currentTheme === "dark" ? classes.customDividerDark : classes.customDividerLight} flex 2xl:hidden`} flexItem />
                                                    <div className="flex h-full w-full py-[15px] 2xl:py-0 px-[10px] items-center min-h-[50px]" style={(document.body.clientWidth > 1500) ? {width: dateBasis} : {width: "200px"}}>
                                                        <div className='h-max w-full truncate'>
                                                            {new Date(page.Time.seconds * 1000 + page.Time.nanoseconds/1000000).toLocaleDateString()}
                                                        </div>
                                                    </div>
                                                    <div className='min-w-[10px] h-full flex justify-center'>
                                                        <Divider orientation="vertical" className={`${currentTheme === "dark" ? classes.customDividerDark : classes.customDividerLight} hidden 2xl:flex`} flexItem />
                                                    </div>
                                                    <Divider className={`${currentTheme === "dark" ? classes.customDividerDark : classes.customDividerLight} flex 2xl:hidden`} flexItem />
                                                    <div className="flex h-full w-full flex items-center py-[15px] px-[10px] min-h-[50px] " style={(document.body.clientWidth > 1500) ? {width: imageBasis} : {width: "200px"}}>
                                                        <div className='h-max w-full truncate'>
                                                            {
                                                                page.coverImage
                                                                ?
                                                                <>
                                                                    Available
                                                                </>
                                                                :
                                                                <>
                                                                    Unavailable
                                                                </>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='flex flex-col w-full  md:w-[200px] 2xl:flex-row 2xl:w-max'>     
                                                    <div className={`h-full w-full md:w-[200px] 2xl:w-max flex border-y-3 2xl:border-x-3 2xl:border-y-0 px-[10px] py-[15px] items-center dark:text-t-header-light font-normal dark:border-x-[#302c38] ${page.Approved ? "bg-primary-dark" : "bg-[#fd6666]"}`}>
                                                        <div className='h-max truncate flex justify-center'>
                                                                {
                                                                    page.Approved
                                                                    ?
                                                                    "True"
                                                                    :
                                                                    "False"
                                                                }
                                                        </div>
                                                    </div>
                                                    <div className="flex h-full w-full 2xl:w-max p-[10px] max-h-[39px] 2xl:max-h-full 2xl:gap-[10px] justify-between">
                                                        <Tooltip classes={{ tooltip: classes.customTooltip }} title="Edit">
                                                            <button onClick={() => router.push(`/editor/page/${page.id}`, undefined, {shallow: true})} >
                                                                <FaPen className="text-xl w-[25px]"/>
                                                            </button>
                                                        </Tooltip>
                                                        <Divider orientation="vertical" flexItem className={currentTheme === "dark" ? classes.customDividerDark : classes.customDividerLight} />
                                                        <Tooltip classes={{ tooltip: classes.customTooltip }} title="View">
                                                            <button onClick={() => router.push(`/page/${page.PageName}`, undefined, {shallow: true})}>
                                                                <MdOutlinePreview className="text-2xl w-[25px]" />
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                ))
                            }            
                        </div>

                    </div> 
                </div>
                {
                    (Math.ceil(pages.length / pagesPerPage) > 1)
                    &&
                    <div className="w-full flex justify-center h-max">
                        <Pagination count={Math.ceil(pages.length / pagesPerPage)} page={currentPage} onChange={handleChangePage} variant="outlined" shape="rounded"   sx={{'& .MuiButtonBase-root': { borderWidth: '2px', borderRadius: '5px', borderColor: 'black' }}}  />
                    </div>
                }
            </div>
        )
    }
    
    export default PagePanel;
    