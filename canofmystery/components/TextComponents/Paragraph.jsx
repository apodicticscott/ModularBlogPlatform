'use client'
import React from "react";

const paragraph = ({children, text, type, classes, style, editable, highlight, onClick, onInput, onKeyUp, onKeyDown, id, indent, innerHTML}) => {
    let indentVal;

    if(indent){
        indentVal === "indent-[50px]"
    }else{
        indentVal === ""
    }


    let styles = {
        sm: {
            width: "w-full",
            flex: "",
            gap: "",
            style: "",
            lightColor: "text-t-header-light",
            darkColor: "dark:text-t-dark",
            tracking: "tracking-tighter",
            trackingMd: "",
            trackingLg: "",
            tracking2xl: "",
            tracking3xl: "",
            size: "text-lg",
            paddingTop: "py-[15px]",
            sizeMd: "md:text-lg",
            sizeLg: "",
            sizeXL: "",
            size2XL: "",
            size3XL: "",
        },
        md: {
            width: "w-full",
            flex: "",
            gap: "",
            style: "",
            lightColor: "text-t-header-light",
            darkColor: "dark:text-t-dark",
            tracking: "tracking-tighter",
            trackingMd: "",
            trackingLg: "",
            tracking2xl: "",
            tracking3xl: "",
            size: "text-xl",
            paddingTop: "py-[15px]",
            sizeMd: "md:text-xl",
            sizeLg: "",
            sizeXL: "",
            size2XL: "",
            size3XL: "",
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


    if(type === "sm"){
        return(
            <div id={id} className={`dark:font-extralight ${styles.sm} ${classes}`} highlighted={highlight} onClick={onClick} onKeyUp={onKeyUp} onKeyDown={onKeyDown} dangerouslySetInnerHTML={{__html: innerHTML}}>
                {children}
            </div>
        )
    }else if(type === "md"){
        return(
            <div id={id} className={`dark:font-extralight ${styles.md} ${classes}`} highlighted={highlight} onClick={onClick} onKeyUp={onKeyUp} onKeyDown={onKeyDown} dangerouslySetInnerHTML={{__html: innerHTML}}>
                {children}
            </div>
        )
    }


} 


export default paragraph;
