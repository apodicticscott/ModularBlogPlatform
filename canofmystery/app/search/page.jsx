'use client'
import React, { useEffect, useState } from "react";
import Tag from "../../components/TextComponents/NeoTag";
import { useRouter } from "next/navigation";
import TextDropDown from "../../components/TextComponents/TextDropDown";
import IconDropDown from "../../components/TextComponents/IconDropDown";
import { BsFillGridFill } from "react-icons/bs";
import Pagination from '@mui/material/Pagination';
import { searchArticles, searchByTag, fetchArticles } from "../../firebase/articleUtils/articleUtils";
import { FaSlidersH, FaSortAlphaDown, FaSortAlphaUp, FaSortNumericDown, FaSortNumericUp  } from "react-icons/fa";
import { Divider } from "@material-ui/core";

const SearchPage = () => {
    const [searchResults, setSearchResults] = useState(null);
    const [searchTerm, setSearchTerm] = useState(null);
    const [articles, setArticles] = useState(null);
    const [selectedTags, setSelectedTags] = useState(null);
    const [selectedFilter, setSelectedFilter] = useState()
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [uniqueTags, setUniqueTags] = useState([]);
    const [currentDropDown, setCurrentDropDown] = useState('');
    const [articlesPerPage, setArticlesPerPage] = useState(50)

    const [currentPage, setCurrentPage] = useState(1);
    const [currentArticles, setCurrentArticles] = useState([])

    // Calculate the indices of the pages to display
    const indexOfLastPage = currentPage * articlesPerPage;
    const indexOfFirstPage = indexOfLastPage - articlesPerPage;

    // Handle page change
    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage);
    };


    useEffect(() => {
        if(searchResults){
            setFilteredArticles(searchResults.filter(article => selectedTags.length === 0 || article.Tags.some(tag => selectedTags.map(selectedTag => selectedTag.Text).includes(tag.Text))).sort((a, b) => {
                if(selectedFilter){
                    if ( selectedFilter.id === 0) {
                        return a.Title.localeCompare(b.Title);
                    } else if (selectedFilter.id === 1){
                        return b.Title.localeCompare(a.Title);
                    }else{
                        return 0; // No sorting applied if neither filter is selected
                    }
                }else{
                    return 0;
                }
            }))
        }else{
            if(articles){
                setFilteredArticles(articles.filter(article => selectedTags.length === 0 || article.Tags.some(tag => selectedTags.map(selectedTag => selectedTag.Text).includes(tag.Text))).sort((a, b) => {
                    if(selectedFilter){
                        if ( selectedFilter.id === 0) {
                            return a.Title.localeCompare(b.Title);
                        } else if (selectedFilter.id === 1){
                            return b.Title.localeCompare(a.Title);
                        }else{
                            return 0; // No sorting applied if neither filter is selected
                        }
                    }else{
                        return 0;
                    }
                }))
            }
        }
    }, [articles, searchResults, selectedTags, selectedFilter, articlesPerPage]);

    useEffect(() => {
        setCurrentArticles(filteredArticles.slice(indexOfFirstPage, indexOfLastPage))
    }, [filteredArticles, currentPage])

    const router = useRouter();

    const SearchChange = async (event) => {
        const term = event.target.value;

        console.log(term)
        setSearchTerm(term);

        if(term) {
            const terms = term.split(" ");
            if(terms.length > 0 ){
                const array = await searchArticles(terms, articles, true);
                // const array2 = await searchArticles2(terms, articles, true);
                setSearchResults(array);
            }
        } else {
            setSearchResults(null);
        }
    };

    const handleDelete = (index) => {
        if(selectedTags){
            setSelectedTags(prevState => prevState.filter((item, idx) => idx !== index));
        }
    }

    const handleTagClick = (tag) => {
        if (!selectedTags.some(selectedTag => selectedTag.Text.toLowerCase() === tag.Text.toLowerCase())) {
            setSelectedTags(prevTags => [...prevTags, tag]);
        }
    };

    const handleArticleClick = (e, url) => {
        if(e.target.id !== "tag"){
            router.push("/blog/" + url)
        }else{
            return;
        }
    }

    const updateUrl = (tags) => {
        const tagQuery = tags.map(tag => encodeURIComponent(tag.Text)).join(',');
        router.push(`/search?search=${encodeURIComponent(searchTerm)}&tags=${tagQuery}`, undefined, { shallow: true });
    };


    useEffect(() => {
        console.log(selectedTags, searchTerm)
        if(selectedTags || searchTerm){
            console.log("here")
            updateUrl(selectedTags)
        }
    }, [selectedTags, searchTerm])


    useEffect(() => {
        if(!articles){
            fetchArticles().then(articles => {
                setArticles(articles);
                const newTags = articles.reduce((acc, article) => {
                    article.Tags.forEach(tag => {
                        if (!acc.some(accTag => accTag.Text.toLowerCase() === tag.Text.toLowerCase())) {
                            acc.push(tag);
                        }
                    });
                    return acc;
                }, []);
                newTags.push({Text:"Spooky", Color:"#69d3e8"});
                newTags.push({Text:"Unsolved", Color:"#69d3e8"});
                newTags.push({Text:"Folklore", Color:"#69d3e8"});
                newTags.push({Text:"Creature", Color:"#69d3e8"});
                setUniqueTags(newTags);
            });
        }
    }, []);

    const sortOptions = [
        {
            fragment: <div className="flex justify-between items-center w-[250px] h-max p-3 text-left">A to Z <FaSortAlphaDown className="text-2.5xl"/> </div>,
            text: "A to Z", 
            id: 0,
        },
        {
            fragment: <div className="flex justify-between items-center w-[250px] h-max p-3 text-left">Z to A <FaSortAlphaUp className="text-2.5xl"/> </div>,
            text: "Z to A",
            id: 1,
        },
        {
            fragment: <div className="flex justify-between items-center w-[250px] h-max p-3 text-left">Old to New <FaSortNumericUp className="text-2.5xl"/> </div>,
            text: "Old to New",
            id: 2,
        },
        {
            fragment: <div className="flex justify-between items-center w-[250px] h-max p-3 text-left hover:bg-base-200">New to Old <FaSortNumericDown className="text-2.5xl"/> </div>,
            text: "New to Old",
            id: 3,
        }
    ]

    const gridOptions = [
        {
            fragment: <div className="p-3 w-[80px]">100</div>,
            num: 100, 
            id: 0,
        },
        {
            fragment: <div className="p-3 w-[80px]">50</div>,
            num: 50,
            id: 1,
        },
        {
            fragment: <div className="p-3 w-[80px]">25</div>,
            num: 25,
            id: 2,
        },
        {
            fragment: <div className="p-3 w-[80px]">1</div>,
            num: 1,
            id: 2,
        },
    ]

    const handleSetSortOption = (option, id) => {
        setSelectedFilter({text: option.text, id: id});
    };

    const handleDeleteSortOption = () => {
        setSelectedFilter();
    }

    const handleSetPageOption = (option, id) => {
        setArticlesPerPage(option.num)
    }



    return(
        <div className="w-screen min-h-screen h-max overflow-hidden">
            <div className="flex flex-col justify-center self-center h-full w-full  max-w-full align-center dark:bg-base-100-dark py-[50px] sm:py-[100px] px-7 xl:px-14 gap-[25px]">
                {articles ? (
                    <>
                        <div className="h-max w-full flex flex-col gap-[10px] mt-[25px] ">

                            <div className="z-10 flex w-full gap-[15px] items-center py-3 pb-4 rounded-md dark:bg-gradient-to-r from-cyan-500 to-blue-500">
                                {
                                    uniqueTags
                                    &&
                                    <div className="flex justify-between w-full h-max items-center">
                                        <div className="flex flex-row gap-[20px] items-center ">
                                            <input type="search" name="search" placeholder="Search" onChange={(e) => SearchChange(e)} required id="search" className="neo-input w-full xs-sm:w-[300px] rounded-md shadow-md p-3 h-[40px]"/>
                                        </div>

                                        <TextDropDown id={1} tags={uniqueTags} handleSetSelected={(text, color) => setSelectedTags([...selectedTags, {Text: text, Color: color}])} label={"Tags"} classes="hidden md:flex" dropDownControl={setCurrentDropDown} currentDrop={currentDropDown}>
                                        
                                        </TextDropDown>
                                    </ div>


                                }
                                <div className="h-max flex gap-[15px]">
                                    <IconDropDown id={2} icon={< FaSlidersH  className="text-2.5xl text-t-header-light dark:text-t-header-dark "/>} options={sortOptions} handleSetSelected={handleSetSortOption}  dropDownControl={setCurrentDropDown} currentDrop={currentDropDown}  />
                                    <IconDropDown id={2} icon={< BsFillGridFill  className="text-2.5xl text-t-header-light dark:text-t-header-dark"/>} options={gridOptions} handleSetSelected={handleSetPageOption}  dropDownControl={setCurrentDropDown} currentDrop={currentDropDown}  />
                                </div>
                                
                            </div>
                            <div className="z-0 flex flex-wrap gap-[10px] w-full">
                                {
                                    selectedTags
                                    &&
                                    selectedTags.map((tag, index) => (
                                        <Tag tag={tag.Text} backgroundColor={tag.Color} key={index} isDeletable={true} handleDelete={handleDelete}  id={index}>

                                        </Tag>
                                    ))
                                }
                                {
                                    selectedFilter
                                    &&
                                    <Tag tag={selectedFilter.text} isDeletable={true} handleDelete={handleDeleteSortOption}  id={selectedFilter.id}>

                                    </Tag>
                                }
                            </div>
                        </div>
                        <div className="resize-none flex flex-wrap gap-[20px] grid-flow-row auto-rows-max w-full grow rounded-md">
                            {
                                currentArticles.filter(article => selectedTags.length === 0 || article.Tags.some(tag => selectedTags.map(selectedTag => selectedTag.Text).includes(tag.Text))).sort((a, b) => {
                                    if(selectedFilter){
                                        if ( selectedFilter.id === 0) {
                                            return a.Title.localeCompare(b.Title);
                                        } else if (selectedFilter.id === 1){
                                            return b.Title.localeCompare(a.Title);
                                        }else{
                                            return 0; // No sorting applied if neither filter is selected
                                        }
                                    }else{
                                        return 0;
                                    }
                                }).map((article, index) => (
                                    <div key={index}>
                                        <div className="hover:bg-base-100  w-[calc(100vw_-_56px)] h-[80vw] xs-sm:w-[calc(((100vw_-_56px)_/_2)_-_10px)]  xs-sm:h-[calc(100vw_/_2.5)] md:w-[calc(((100vw_-_56px)_/_3)_-_13.5px)] md:h-[calc(100vw_/_3.8)] lg:w-[calc(((100vw_-_56px)_/_4)_-_15px)] lg:h-[calc(100vw_/_5)] xl:w-[calc(((100vw_-_112px)_/_5)_-_16px)] xl:h-[calc(100vw_/_6.5)] 2xl:w-[calc(((100vw_-_112px)_/_6)_-_17px)] mt-[1.4vw] sm:mt-[20px] 2xl:h-[calc(100vw_/_7.5)] flex flex-col justify-start shadow-lg bg-secondary-content border-3 rounded-md dark:bg-base-100 sm:hover:scale-105 transition duration-100 cursor-pointer" onClick={(e) => handleArticleClick(e, article.id)} >
                                            <div className="w-full p-[3.5vw] xs-sm:p-[1.2vw] md:p-[1vw] lg:p-[.8vw] xl:p-[.6vw] 2xl:p-[.4vw] h-[80%] xs-sm:h-[75%]">
                                                {
                                                    article.CoverImage 
                                                    ?
                                                    <img src={article.CoverImage} className="w-full h-full rounded-md border-2">
                                
                                                    </img>
                                                    :
                                                    <div className="w-full h-full rounded-md border-2 bg-image-missing-image">
                                
                                                    </div>
                                                         
                                                }

                                            </div>
                                            <div className="flex w-full grow flex-col justify-center gap-[1vw] xs-sm:gap-0 pb-[3.5vw] xs-sm:pb-[1.2vw] md:pb-[1vw] lg:pb-[.8vw] xl:pb-[.6vw] 2xl:pb-[.4vw] px-[3.5vw] xs-sm:px-[1.2vw] md:px-[1vw] lg:px-[.8vw] xl:px-[.6vw] 2xl:px-[.4vw]">
                                                {/* <div className="flex flex-col justify-between gap-[1.4vw] xs-sm:gap-[.8vw] md:gap-[.6vw] lg:gap-[.4vw] xl:gap-[.2vw] 2xl:gap-[.1vw] h-max w-full  text-[4vw]  xs-sm:text-[2vw] md:text-[1.4vw] lg:text-[1.2vw] xl:text-[1vw] 2xl:text-[.8vw]"> */}
                                                    <div className="truncate h-max w-full text-[4vw]  xs-sm:text-[2vw] md:text-[1.4vw] lg:text-[1.2vw] xl:text-[1vw] 2xl:text-[.8vw]">
                                                        {article.Title}
                                                    </div>
                                                    <div className="text-t-light font-light text-[3.25vw]  xs-sm:text-[1.75vw] md:text-[1.3vw] lg:text-[1.1vw] xl:text-[.9vw] 2xl:text-[.7vw]">
                                                        {
                                                            article.Author
                                                            ?
                                                            <>
                                                                By: {article.Author}
                                                            </>
                                                            :
                                                            <>
                                                            No Author Available
                                                            </>
                                                            
                                                        }
                                                    </div>
                                                {/* </div> */}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-[4vw] xs-sm:gap-[2vw] md:gap-[1.8vw] lg:gap-[1.4vw] xl:gap-[1.2vw] 2xl:gap-[1vw] min-h-max pt-0 2xl:pt-[.2vw] w-full ">
                                            {
                                                article.Tags
                                                &&
                                                article.Tags.map((tag, index) => (
                                                    <div className={`rounded-md text-shadow shadow-md mt-[6vw]  xs-sm:mt-[3.5vw] md:mt-[2.5vw] lg:mt-[2.25vw] xl:mt-[2vw] 2xl:mt-[1vw] px-[1.8vw] xs-sm:px-[1.2vw] md:px-[1vw] lg:px-[.8vw] xl:px-[.6vw] 2xl:px-[.4vw] py-[1vw] xs-sm:py-[.6vw] md:py-[.4vw] lg:py-[.2vw] xl:py-[.15vw] 2xl:py-[.1vw] text-[3.25vw] xs-sm:text-[1.75vw] md:text-[1.3vw] lg:text-[1.1vw] xl:text-[.9vw] 2xl:text-[.7vw] border-2  max-h-max min-w-max hover:scale-105 transition duration-100 cursor-pointer`}  onClick={() => handleTagClick(tag)} style={{backgroundColor: tag.Color}} id="tag" key={index}>
                                                        {tag.Text}
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        {
                        (Math.ceil(filteredArticles.length / articlesPerPage) > 1)
                        &&
                        <div className="w-full flex justify-center h-max">
                            <Pagination count={Math.ceil(filteredArticles.length / articlesPerPage)} page={currentPage} onChange={handleChangePage} variant="outlined" shape="rounded"   sx={{'& .MuiButtonBase-root': { borderWidth: '2px', borderRadius: '5px', borderColor: 'black' }}}  />
                        </div>
                    }
                    </>
                ): (
                    <div className="h-screen w-screen flex items-center ">
                        <div className="loader">
                            <div className="dot"></div>
                            <div className="dot"></div>
                            <div className="dot"></div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchPage
