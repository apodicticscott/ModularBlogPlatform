import React from "react";
import TextEditor from "../../../components/textEditor/TextEditor";


export default function Page({params}) {
    const articleId = params.slug;
    return(
        <>
            <div className="w-full h-max dark:bg-base-100-dark pt-[67px]">
                <TextEditor articleId={articleId}/>
            </div>
        </>
    )

}
