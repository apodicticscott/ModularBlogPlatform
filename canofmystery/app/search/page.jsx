'use client'
import React, { useEffect, useState } from "react";
import Tag from "../../components/TextComponents/NeoTag";
import { useRouter } from "next/navigation";
import DropDown from "../../components/TextComponents/dropDown";
import { searchArticles, searchByTag, fetchArticles } from "../../firebase/articleUtils/articleUtils";
import { Divider } from "@material-ui/core";

const SearchPage = () => {
    const [searchResults, setSearchResults] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [articles, setArticles] = useState(null);
    const [selectedTags, setSelectedTags] = useState([]);
    const [uniqueTags, setUniqueTags] = useState([]);

    const router = useRouter();

    const SearchSubmit = async (event) => {
        event.preventDefault();
        const tags_arr = tags.split(",").filter((value) => {return value != "";});
        
        var array = []
        const terms = searchterm.split(" ").filter((value) => {return value != "";});
        if(tags_arr.length > 0 && terms.length > 0 ){
            const tagmatches = await searchByTag(tags_arr);
            array = await searchArticles(terms, tagmatches, true);
            setJson(array);
        }
        else if(terms.length > 0 ){
            array = await searchArticles(terms, articles, true);
            setJson(array);
        }
        else if(tags_arr.length > 0){
            array = await searchByTag(tags_arr, articles, true);
            setJson(array);
        }
        else{
            setJson(array);
        }
        console.log(array)
        setSearchResults(array);
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
                setUniqueTags(newTags);
            });
        }
    }, []);



    return(
        <div className="flex flex-col justify-start self-center min-h-screen align-center dark:bg-base-100-dark p-20 gap-[50px]">
            {articles ? (
                <>
                    <div className="w-full flex flex-col gap-[25px] mt-[25px]">
                        <form  className="gap-[15px]">
                            <div className="flex flex-row gap-[20px] items-center pt-[20px]">
                                <input type="search" name="search" placeholder="Search" onChange={(e) => (setSearchTerm(e.target.value), SearchChange(e))} required id="search" className="neo-input w-[300px] rounded-md p-3 h-[40px]"/>
                            </div>
                        </form>
                        <div className="z-10">
                            {
                                uniqueTags
                                &&
                                <DropDown tags={uniqueTags} setSelectedTags={setSelectedTags} selectedTags={selectedTags} label={"Tags"}>
                                
                                </DropDown>
                            }

                        </div>
                        <div className="z-0 flex flex-wrap gap-[10px] min-h-[50px] w-full">
                            {
                                selectedTags
                                &&
                                selectedTags.map((tag, index) => (
                                    <Tag tag={tag.Text} backgroundColor={tag.Color} key={index} isDeletable={true} handleDelete={handleDelete}  id={index}>

                                    </Tag>
                                ))
                            }
                        </div>
                    </div>
                    <Divider />

                    <div className="resize-none flex flex-wrap gap-[20px] grid-flow-row auto-rows-max">
                        {
                            searchResults
                            ?
                            searchResults.map((article, index) => (
                                <div className="w-[274px] mt-[20px] h-max flex flex-col justify-start bg-secondary-content border-3 rounded-md shadow-lg gap-[5px] pb-[15px] dark:bg-base-100 hover:scale-105 transition duration-100" onClick={(e) => handleArticleClick(e, article.id)} key={index}>
                                    <div className="w-full p-[10px] pb-0 h-max">
                                        <img src={article.CoverImage} className="w-full h-[160px] rounded-md border-2">
                        
                                        </img>
                                    </div>
                                    <div className="flex items-center justify-between gap-[15px] h-[50x] w-full  px-[10px] text-2xl">
                                        <div className="truncate h-[35px] w-full flex items-center">
                                            {article.Title}
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between gap-[15px] h-[50x] w-full  px-[10px] text-xl">
                                        {article.Author}
                                    </div>
                                    <div className="flex items-center justify-between gap-[15px] h-[50x] pt-[5px] w-full  px-[10px] text-2.5xl">
                                        {
                                            article.Tags
                                            &&
                                            article.Tags.map((tag, index) => (
                                                <div className={`rounded-md text-shadow px-[10px] py-[2.5px] text-lg border-2 shadow-md max-h-[30px] min-w-max `}  onClick={() => handleTagClick(tag)} style={{backgroundColor: tag.Color}} id="tag" key={index}>
                                                    {tag.Text}
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            ))
                            :
                            articles.map((article, index) => (
                                <div className="w-[274px] mt-[20px] h-max flex flex-col justify-start bg-secondary-content border-3 rounded-md shadow-lg gap-[5px] pb-[15px] dark:bg-base-100 hover:scale-105 transition duration-100" onClick={(e) => handleArticleClick(e, article.id)} key={index}>
                                    <div className="w-full p-[10px] pb-0 h-max">
                                        <img src={article.CoverImage} className="w-full h-[160px] rounded-md border-2">
                        
                                        </img>
                                    </div>
                                    <div className="flex items-center justify-between gap-[15px] h-[50x] w-full  px-[10px] text-2xl">
                                        <div className="truncate h-[35px] w-full flex items-center">
                                            {article.Title}
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between gap-[15px] h-[50x] w-full  px-[10px] text-xl">
                                        {article.Author}
                                    </div>
                                    <div className="flex items-center justify-between gap-[15px] h-[50x] pt-[5px] w-full  px-[10px] text-2.5xl">
                                        {
                                            article.Tags
                                            &&
                                            article.Tags.map((tag, index) => (
                                                <div className={`rounded-md text-shadow px-[10px] py-[2.5px] text-lg border-2 shadow-md max-h-[30px] min-w-max `}  onClick={() => handleTagClick(tag)} style={{backgroundColor: tag.Color}} id="tag" key={index}>
                                                    {tag.Text}
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </div>
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
    );
};

export default SearchPage
