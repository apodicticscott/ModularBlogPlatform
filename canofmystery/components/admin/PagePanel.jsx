import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { RiSearchFill } from "react-icons/ri";
import { MdDone, MdClose, MdDelete, MdOutlinePreview } from "react-icons/md";
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import Pagination from '@mui/material/Pagination';
import { FaPen } from "react-icons/fa";

import { 
    fetchPages, 
    deletePages, 
    setPagesApproval,
    getTotalUnapprovedPages,
    } from "../../firebase/articleUtils/articleUtils";

import NeoButton from "../TextComponents/NeoButton"

const PagePanel = ({setNumUnapproved, numUnapproved, setPages, pages, classes}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedPages, setSelectedPages] = useState([])
    const [currentPages, setCurrentPages] = useState([])
    const pagesPerPage = 25; // Now displaying pages per page

    // Calculate the indices of the pages to display
    const indexOfLastPage = currentPage * pagesPerPage;
    const indexOfFirstPage = indexOfLastPage - pagesPerPage;


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

    return(
        <div className="flex flex-col h-full w-full justify-between p-7">
            <div className="flex flex-col gap-[25px] w-full">
                <div className="w-full flex flex-col gap-[28px] sm:gap-[15px] sm:flex-row sm:gap-0 justify-between">
                    <div className="w-full sm:w-max h-full flex gap-[15px]">
                        <RiSearchFill style={{fontSize: "30px"}} role="link"/> 
                        <input type="search" name="search" required minLength="4" className="neo-input grow sm:w-[180px]"/>
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
                        `You have ${numUnapproved} unapproved ${numUnapproved > 1 ? 'pages' : 'page'}.`
                        :
                        'You are all up to date!'
                    }
                    </div>
                    <div className="w-full h-max flex flex-wrap 2xl:flex-col gap-[15px]">
                        {
                            currentPages
                            &&
                            currentPages.map((page) => (
                                <div className={`w-full h-max sm:w-[calc(100%_/_2)] shadow md:w-max 2xl:w-full rounded-md h-full 2xl:h-[50px] border-3 overflow-hidden flex flex-col 2xl:flex-row text-lg ${selectedPages.includes(page.id) && 'bg-[#c8c8c8]'}`} key={page.id} onClick={() => handleSelection(page.id)}>
                                    <div className="flex w-full md:w-max 2xl:grow grow 2xl:h-full flex-col 2xl:flex-row">
                                        <div className="flex grow w-full md:w-[200px] py-[15px] 2xl:py-0 pl-[10px] min-h-[50px] items-center">
                                            {page.Publisher}
                                        </div>
                                        <Divider orientation="vertical"   className="hidden 2xl:flex" flexItem />
                                        <Divider   className="flex 2xl:hidden" flexItem />
                                        <div className="flex h-full w-full md:w-[200px] py-[15px] 2xl:py-0 pl-[10px] min-h-[50px] items-center">
                                            {page.Author}
                                        </div>
                                        <Divider orientation="vertical"   className="hidden 2xl:flex" flexItem />
                                        <Divider   className="flex 2xl:hidden" flexItem />
                                        <div className="flex h-full w-full md:w-[200px] py-[15px] 2xl:py-0 pl-[10px] min-h-[50px] items-center">
                                            {page.Title}
                                        </div>
                                        <Divider orientation="vertical"   className="hidden 2xl:flex" flexItem />
                                        <Divider   className="flex 2xl:hidden" flexItem />
                                        <div className="flex h-full w-full md:w-[200px] py-[15px] 2xl:py-0 pl-[10px] items-center min-h-[50px]">
                                            {page.Time} 
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
                                        <div className={`h-full w-full md:w-[200px] 2xl:grow flex border-y-3 2xl:border-x-3 2xl:border-y-0 pl-[10px] py-[15px] items-center ${page.Approved ? "bg-primary-dark" : "bg-[#fd6666]"}`}>
                                            {
                                                page.Approved
                                                ?
                                                "Approved"
                                                :
                                                "Unapproved"
                                            }
                                        </div>
                                    </div>
                                    <div className="flex h-full w-full 2xl:w-max p-[10px] max-h-[39px] 2xl:max-h-full 2xl:gap-[10px] justify-between">
                                        <Tooltip classes={{ tooltip: classes.customTooltip }} title="Edit">
                                            <button onClick={() => router.push(`/editor/page/${page.id}`)} >
                                                <FaPen className="text-xl w-[25px]"/>
                                            </button>
                                        </Tooltip>
                                        <Divider orientation="vertical" flexItem />
                                        <Tooltip classes={{ tooltip: classes.customTooltip }} title="View">
                                            <button onClick={() => router.push(`/pages/${page.PageName}`)}>
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
    