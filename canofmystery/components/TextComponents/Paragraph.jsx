'use client'
import React from "react";

const Paragraph = ({children, type, classes, style, editable, onClick}) => {


    


    let styles = {
        sm: {
            width: "w-full",
            flex: "",
            gap: "",
            style: "",
            lightColor: "text-t-header-light",
            darkColor: "dark:text-t-dark",
            tracking: "tracking-[-3px]",
            trackingMd: "",
            trackingLg: "",
            tracking2xl: "",
            tracking3xl: "",
            size: "text-xl",
            sizeMd: "",
            sizeLg: "",
            sizeXL: "",
            size2XL: "",
            size3XL: ""
        },
        md: {
            width: "w-full",
            flex: "",
            gap: "",
            style: "",
            lightColor: "text-t-header-light",
            darkColor: "dark:text-t-dark",
            tracking: "tracking-[-2.76px]",
            trackingMd: "",
            trackingLg: "xl:tracking-[-3.32px]",
            tracking2xl: "",
            tracking3xl: "",
            size: "text-3xl",
            sizeMd: "",
            sizeLg: "lg:text-2xl",
            sizeXL: "xl:text-2.5xl",
            size2XL: "2xl:text-2.7xl",
            size3XL: "3xl:text-[1.25vw]"
        },
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

    
    if(type === "sm"){
        return(
            <p className={`3xl:w-full lg:mt-[30px]lg:w-[80%] xl:mr-[118px] h-max ${styles.sm}`} contentEditable={editable}  onClick={onClick}>
                {children}
            </p>
        )
    }else if(type === "md"){
        return(
            <p className="3xl:w-full lg:mt-[30px]lg:w-[80%] xl:mr-[118px] h-max" contentEditable={editable} onClick={onClick}>
                {children}
            </p>
        )
    }

} 


export default Paragraph;
