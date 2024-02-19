'use client'
import React from "react";

const Resource = ({children, text, type, classes, style, editable, highlight, onClick, onInput, onKeyUp, onKeyDown, id}) => {


    


    let styles = {
        sm: {
            width: "w-full",
            flex: "",
            gap: "",
            style: "",
            lightColor: "text-t-header-light",
            darkColor: "dark:text-t-dark",
            tracking: "tracking-[-1.5px]",
            trackingMd: "",
            trackingLg: "",
            tracking2xl: "",
            tracking3xl: "",
            paddingTop: "py-[15px]",
            paddingLeft: "pl-[36px]",
            size: "text-md",
            sizeMd: "md:text-lg",
            sizeLg: "",
            sizeXL: "",
            size2XL: "",
            size3XL: "",
            textIndent: "indent-[-36px]"
        },
        md: {
            width: "w-full",
            flex: "",
            gap: "",
            style: "",
            lightColor: "text-t-header-light",
            darkColor: "dark:text-t-dark",
            tracking: "tracking-[-2px]",
            trackingMd: "",
            trackingLg: "",
            tracking2xl: "",
            tracking3xl: "",
            size: "text-lg",
            paddingTop: "py-[15px]",
            paddingLeft: "pl-[36px]",
            sizeMd: "md:text-xl",
            sizeLg: "",
            sizeXL: "",
            size2XL: "",
            size3XL: "",
            textIndent: "indent-[-36px]"
        }
    }

    let tempStyles = styles;

    if(style){
        let StyleKeys = Object.keys(style);

        Object.keys(tempStyles).forEach(key => {
            if(key === type){
                Object.keys(tempStyles[key]).forEach(prop => {
                    if(StyleKeys.includes(prop)){
                        tempStyles[type][prop] = style[prop]
                    }
                });
            }
        });
    }


    const convertStylesToString = (styleObj) => {
        return Object.values(styleObj).filter(val => val).join(" ");
    };

    styles = {
        sm: convertStylesToString(tempStyles.sm),
        md: convertStylesToString(tempStyles.md),
    };

    const createMarkup = () => {
        return {__html: text};
    };

    if(text){
        if(type === "sm"){
            return(
                <div id={id} data-compid={id} className={`${styles.sm} ${classes}`} contentEditable={editable} suppressContentEditableWarning={true} highlighted={highlight} onClick={onClick} onKeyUp={onKeyUp} onKeyDown={onKeyDown}  dangerouslySetInnerHTML={createMarkup()}>
                
                </div>
            )
        }else if(type === "md"){
            return(
                <div id={id} data-compid={id}  className={`${styles.md} ${classes}`} contentEditable={editable} suppressContentEditableWarning={true} highlighted={highlight} onClick={onClick} onKeyUp={onKeyUp} onKeyDown={onKeyDown} dangerouslySetInnerHTML={createMarkup()}>
                    
                </div>
            )
        }
    }else{
        if(type === "sm"){
            return(
                <div id={id} className={`${styles.sm} ${classes}`} highlighted={highlight} onClick={onClick} onKeyUp={onKeyUp} onKeyDown={onKeyDown} >
                    {children} 
                </div>
            )
        }else if(type === "md"){
            return(
                <div id={id} className={`${styles.md} ${classes}`} highlighted={highlight} onClick={onClick} onKeyUp={onKeyUp} onKeyDown={onKeyDown} >
                    {children} 
                </div>
            )
        }
    }


} 


export default Resource;
