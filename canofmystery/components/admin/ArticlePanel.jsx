import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RiSearchFill } from "react-icons/ri";
import { MdDone, MdClose, MdDelete, MdOutlinePreview } from "react-icons/md";
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import Pagination from '@mui/material/Pagination';
import { FaPen } from "react-icons/fa";

import { 
    fetchArticles, 
    deleteArticles, 
    setArticlesApproval,
    getTotalUnapprovedArticles,
    } from "../../firebase/articleUtils/articleUtils";

import NeoButton from "../TextComponents/NeoButton"

const ArticlePanel = ({setNumUnapproved, numUnapproved, setArticles, articles, classes}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedArticles, setSelectedArticles] = useState([])
    const articlesPerPage = 25; // Now displaying 2 articles per page

    // Calculate the indices of the articles to display
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

    const router = useRouter();


    // Handle page change
    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };

    // const handleSearchChange = (e) => {
    //     e.preventDefault()
    //     setSearch(e.target.value);
    // }

    const handleSelection = (id) => {
        setSelectedArticles(prevSelected => prevSelected.includes(id) ? prevSelected.filter(articleId => articleId !== id) : [...prevSelected, id]);
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
                                <div className={`w-full h-max sm:w-[calc(100%_/_2)] shadow md:w-max 2xl:w-full rounded-md h-full 2xl:h-[50px] border-3 overflow-hidden flex flex-col 2xl:flex-row text-lg ${selectedArticles.includes(article.id) && 'bg-[#c8c8c8]'}`} key={article.id} onClick={() => handleSelection(article.id)}>
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
                                            {/* {article.Time}  */}
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
                                            <button onClick={() => router.push(`/blogs/${page.PageName}`)}>
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

export default ArticlePanel;
