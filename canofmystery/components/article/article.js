'use client'
import React from "react";
import Header from "../TextComponents/Header1"
import Paragraph from "../TextComponents/Paragraph";
import Resource from "../TextComponents/Resource";
import YoutubeEmbed from "../TextComponents/YoutubeEmbed";
import Image from "../TextComponents/Image"
import Tag from "../TextComponents/NeoTag"
 
const Article = ({article}) => {
    return (
        <div className="w-full flex justify-center px-7 md:px-0 bg-base-100 dark:bg-base-100-dark min-h-screen">
            <div className="w-full flex flex-col items-center max-w-[800px] h-max " id="article">
            {article ? (
                <>
                <div k className="pb-[50px] w-full pt-[100px]">
                    {
                        <Header type="xl" classes="flex w-full justify-center" >
                            {article.Title}
                        </Header>
                    }
                    {
                        article.Author
                        &&
                        <Header type="sm" classes="w-full">
                            By: {article.Author}
                        </Header>
                    }
                    {article.Content.map((comp, index) => (
                        <div key={index}>
                            {(comp.Type === "paragraph")&& (
                                <>
                                    <Paragraph type={comp.Size}  key={comp.ID} indent={false} innerHTML={comp.Content} classes={`w-full ${comp.Style}`}></Paragraph> 
                                </>
                            )}
                            {(comp.Type === "image")&& (
                                <>
                                    <Image id={comp.ID} src={comp.Image} key={comp.ID} classes="w-full"/>
                                </>
                            )}
                            {(comp.Type === "header") && (
                                <>
                                    <Header type={comp.Size}  key={comp.ID} indent={false} innerHTML={comp.Content} classes="w-full"></Header> 
                                </>
                            )}
                            {(comp.Type === "resource") && (
                                <>
                                    <Resource type={comp.Size}  key={comp.ID} innerHTML={comp.Content} classes="w-full"></Resource> 
                                </>
                            )}
                            {(comp.Type === "youtube") && (
                                <>
                                    <YoutubeEmbed id={comp.ID} embededId={comp.VideoEmbededId} key={comp.ID} classes="w-full"></YoutubeEmbed> 
                                </> 
                            )}
                        </ div>
                    ))}
                </div>
                {
                    article.Tags.length !== 0 
                    &&
                    <div className={`flex items-center w-full gap-[30px] pb-[100px]`} >
                        <div className="flex flex-col h-max w-full gap-[15px]">
                            <Header type="sm" classes="border-b-[2px] border-b-black w-full">
                                Tags:
                            </Header>
                            <div className="flex flex-wrap items-center w-full h-max">
                            {
                                article.Tags.map((tag, index) =>  (
                                    <>
                                        <Tag key={`${index}-${tag.Text}`} backgroundColor={tag.Color} tag={tag.Text} />
                                    </>
                                    
                                ))
                            }
                            </div>
                        </div>
                    </div>
                }
                </>
            ) : (
                <div className="h-screen w-screen flex items-center ">
                    <div class="loader">
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                    </div>
                </div>
            )}
        </div>
                    
    </div>
  );
}

export default Article;