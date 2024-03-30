'use client'
import React, { useEffect, useState } from "react";
import Tag from "../../components/TextComponents/NeoTag";
import { useRouter } from "next/navigation";
import TextDropDown from "../../components/TextComponents/TextDropDown";
import IconDropDown from "../../components/TextComponents/IconDropDown";
import Pagination from '@mui/material/Pagination';
import { searchArticles, searchByTag, fetchArticles } from "../../firebase/articleUtils/articleUtils";
import { FaSlidersH, FaSortAlphaDown, FaSortAlphaUp, FaSortNumericDown, FaSortNumericUp  } from "react-icons/fa";
import { Divider } from "@material-ui/core";

const SearchPage = () => {
    const [searchResults, setSearchResults] = useState(null);
    const [searchTerm, setSearchTerm] = useState(null);
    const [articles, setArticles] = useState(null);
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState()
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [uniqueTags, setUniqueTags] = useState([]);
    const [currentDropDown, setCurrentDropDown] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [currentArticles, setCurrentArticles] = useState([])
    const articlesPerPage = 25; // Now displaying pages per page

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
    }, [articles, searchResults, selectedTags, selectedFilter]);

    useEffect(() => {
        setCurrentArticles(filteredArticles.slice(indexOfFirstPage, indexOfLastPage))
    }, [filteredArticles, currentPage])

    const router = useRouter();

    const SearchChange = async (event) => {
        const term = event.target.value;
        setSearchTerm(term);

        if(term) {
            const terms = term.split(" ");
            if(terms.length > 0 ){
                const array = await searchArticles(terms, articles, true);
                setSearchResults(array);
            }
        } else {
            setSearchResults(null);
        }
    };

    const handleDelete = (index) => {
        setSelectedTags(prevState => prevState.filter((item, idx) => idx !== index));
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


    useEffect((e) => {
        updateUrl(selectedTags)
    }, [selectedTags, searchTerm])


    useEffect(() => {
        console.log(articles)
        if(!articles){
            fetchArticles().then(articles => {
                console.log(articles)
                setArticles(articles);
                const newTags = articles.reduce((acc, article) => {
                    article.Tags.forEach(tag => {
                        if (!acc.some(accTag => accTag.Text.toLowerCase() === tag.Text.toLowerCase())) {
                            acc.push(tag);
                        }
                    });
                    return acc;
                }, []);
                console.log(newTags)
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
            fragment: <>A to Z <FaSortAlphaDown className="text-2.5xl"/> </>,
            text: "A to Z", 
            id: 0,
        },
        {
            fragment: <>Z to A <FaSortAlphaUp className="text-2.5xl"/> </>,
            text: "Z to A",
            id: 1,
        },
        {
            fragment: <>Old to New <FaSortNumericUp className="text-2.5xl"/> </>,
            text: "Old to New",
            id: 2,
        },
        {
            fragment: <>New to Old <FaSortNumericDown className="text-2.5xl"/> </>,
            text: "New to Old",
            id: 3,
        }
    ]

    const handleSetSortOption = (option, id) => {
        setSelectedFilter({text: option.text, id: id});
    };

    const handleDeleteSortOption = () => {
        setSelectedFilter();
    }



    return(
        <div className="w-screen min-h-screen">
            <div className="flex flex-col justify-center self-center h-full w-max max-w-full align-center dark:bg-base-100-dark py-20 px-7 xl:px-14  gap-[25px] pb-30">
                {articles ? (
                    <>
                        <div className="h-max grow flex flex-col gap-[25px] mt-[25px]">
                            <form  className="gap-[15px]">
                                <div className="flex flex-row gap-[20px] items-center pt-[20px]">
                                    <input type="search" name="search" placeholder="Search" onChange={(e) => SearchChange(e)} required id="search" className="neo-input w-[300px] rounded-md p-3 h-[40px]"/>
                                </div>
                            </form>
                            <div className="z-10 flex w-full gap-[15px] items-center justify-between">
                                {
                                    uniqueTags
                                    &&
                                    <TextDropDown id={1} tags={uniqueTags} handleSetSelected={(text, color) => setSelectedTags([...selectedTags, {Text: text, Color: color}])} label={"Tags"} dropDownControl={setCurrentDropDown} currentDrop={currentDropDown}>
                                        
                                    </TextDropDown>
                                }
                                <IconDropDown id={2} icon={< FaSlidersH  className="text-2.5xl text-t-header-light "/>} options={sortOptions} handleSetSelected={handleSetSortOption}  dropDownControl={setCurrentDropDown} currentDrop={currentDropDown}  />
                            </div>
                            <div className="z-0 flex flex-wrap gap-[10px] min- h-max w-full">
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
                        <div className="resize-none flex flex-wrap gap-[20px] grid-flow-row auto-rows-max w-full">
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
                                    <div className="w-[274px]  w-[calc((100%_/_2)_-_20px)]  h-[calc(100vw_/_2)] md:w-[calc((100%_/_3)_-_20px)] md:h-[calc(100vw_/_3)] lg:w-[calc((100%_/_4)_-_20px)] lg:h-[calc(100vw_/_4)] xl:w-[calc((100%_/_5)_-_20px)] xl:h-[calc(100vw_/_5.5)] 2xl:w-[calc((100%_/_6)_-_20px)] mt-[20px] 2xl:h-[calc(100vw_/_6.5)] flex flex-col justify-start shadow-lg bg-secondary-content border-3 rounded-md  gap-[1vw] md:gap-[.8vw] lg:gap-[.6vw] xl:gap-[.4vw] 2xl:gap-[.2vw] pb-[15px] dark:bg-base-100 hover:scale-105 transition duration-100" onClick={(e) => handleArticleClick(e, article.id)} key={index}>
                                        <div className="w-full  p-[1.2vw] md:p-[1vw] lg:p-[.8vw] xl:p-[.6vw] 2xl:p-[.4vw] pb-0 min-h-[65%]">
                                            <img src={article.CoverImage} className="w-full h-full rounded-md border-2">
                            
                                            </img>
                                        </div>
                                        <div className="flex w-full grow flex-col justify-between  px-[1.2vw] md:px-[1vw] lg:px-[.8vw] xl:px-[.6vw] 2xl:px-[.4vw]">
                                            <div className="flex items-center justify-between gap-[15px]  h-max w-full    text-[2vw] md:text-[1.4vw] lg:text-[1.2vw] xl:text-[1vw] 2xl:text-[.8vw]">
                                                <div className="truncate h-max w-full flex items-center">
                                                    {article.Title}
                                                </div>
                                            </div>
                                            <div className="h-min w-full    text-[2vw] md:text-[1.4vw] lg:text-[1.2vw] xl:text-[1vw] 2xl:text-[.8vw] text-ellipsis">
                                                {
                                                    article.Author
                                                    &&
                                                    <>
                                                        By: {article.Author}
                                                    </>
                                                    
                                                }
                                            </div>
                                            <div className="flex items-center justify-between gap-[15px] min-h-max pt-0 2xl:pt-[.2vw] w-full ">
                                                {
                                                    article.Tags
                                                    &&
                                                    article.Tags.map((tag, index) => (
                                                        <div className={`rounded-md text-shadow  px-[1.2vw] md:px-[1vw] lg:px-[.8vw] xl:px-[.6vw] 2xl:px-[.4vw]  py-[.6vw] md:py-[.4vw] lg:py-[.2vw] xl:py-[.15vw] 2xl:py-[.1vw]  text-[2vw] md:text-[1.4vw] lg:text-[1.2vw] xl:text-[1vw] 2xl:text-[.8vw] border-2  max-h-max min-w-max `}  onClick={() => handleTagClick(tag)} style={{backgroundColor: tag.Color}} id="tag" key={index}>
                                                            {tag.Text}
                                                        </div>
                                                    ))
                                                }
                                            </div>
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
