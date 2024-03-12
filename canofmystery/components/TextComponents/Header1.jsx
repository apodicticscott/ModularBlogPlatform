'use client'
import React from "react";

const Header = ({children, text, type, classes, style, highlight, onClick, onKeyUp, onKeyDown, id, innerHTML}) => {


    


    let styles = {
        sm: {
            width: "w-full",
            flex: "",
            gap: "",
            style: "font-bold",
            lightColor: "text-t-header-light",
            darkColor: "dark:text-t-dark",
            tracking: "tracking-[-2.3px]",
            trackingSm: "",
            trackingMd: "md:tracking-[-3px]",
            trackingLg: "",
            tracking2xl: "",
            tracking3xl: "",
            size: "text-xl",
            sizeSm: "",
            sizeMd: "md:text-2.2xl",
            sizeLg: "",
            sizeXL: "",
            size2XL: "",
            size3XL: ""
        },
        md: {
            width: "w-full",
            flex: "",
            gap: "",
            style: "font-bold",
            lightColor: "text-t-header-light",
            darkColor: "dark:text-t-dark",
            tracking: "tracking-[-3px]",
            trackingSm: "",
            trackingMd: "md:tracking-[-4px]",
            trackingLg: "",
            tracking2xl: "",
            tracking3xl: "",
            size: "text-2xl",
            sizeSm: "",
            sizeMd: "md:text-3xl",
            sizeLg: "",
            sizeXL: "",
            size2XL: "",
            size3XL: "3xl:text-[1.5vw]"
        },
        lg: {
            width: "w-full",
            flex: "",
            gap: "gap-[10px]",
            style: "font-bold",
            lightColor: "text-t-header-light",
            darkColor: "dark:text-t-dark",
            tracking: "tracking-[-3px]",
            trackingSm: "sm:tracking-[-3.5px]",
            trackingMd: "",
            trackingLg: "lg:text-[-4px]",
            tracking2xl: "",
            tracking3xl: "",
            size: "text-2.5xl",
            sizeSm: "sm:text-3xl",
            sizeMd: "md:text-4xl",
            sizeLg: "",
            sizeXL: "",
            size2XL: "",
            size3XL: "3xl:text-[2.5vw]"
        },
        xl: {
            width: "w-full",
            flex: "",
            gap: "gap-[10px]",
            style: "font-bold",
            lightColor: "text-t-header-light",
            darkColor: "dark:text-t-dark",
            tracking: "tracking-[-4px]",
            trackingSm: "sm:tracking-[-4.5px]",
            trackingMd: "md:tracking-[-5px]",
            trackingLg: "",
            tracking2xl: "",
            tracking3xl: "",
            size: "text-3xl",
            sizeSm: "sm:text-4xl",
            sizeMd: "md:text-5xl",
            sizeLg: "",
            sizeXL: "",
            size2XL: "",
            size3XL: "3xl:text-[3.5vw]"
        },
        landerTitle: {
            width: "w-full",
            flex: "",
            gap: "gap-[10px]",
            style: "font-bold",
            lightColor: "text-t-header-light",
            darkColor: "dark:text-t-dark",
            tracking: "tracking-[-6px]",
            trackingSm: "",
            trackingMd: "",
            trackingLg: "lg:tracking-[-11px]",
            tracking2xl: "",
            tracking3xl: "",
            size: "text-4xl",
            sizeSm: "",
            sizeMd: "md:text-5xl",
            sizeLg: "lg:text-6xl",
            sizeXL: "xl:text-5xl",
            size2XL: "2xl:text-6xl",
            size3XL: "3xl:text-7xl",
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
        lg: convertStylesToString(tempStyles.lg),
        xl: convertStylesToString(tempStyles.xl),
        landerTitle: convertStylesToString(tempStyles.landerTitle),
    };


        if(type === "sm"){
            return(
                <div id={id} className={`${styles.sm} ${classes}`} highlighted={highlight} onClick={onClick} onKeyUp={onKeyUp} onKeyDown={onKeyDown} dangerouslySetInnerHTML={{__html: innerHTML}}>
                    {children}
                </div>
            )
        }else if(type === "md"){
            return(
                <div id={id} className={`${styles.md} ${classes}`} highlighted={highlight} onClick={onClick} onKeyUp={onKeyUp} onKeyDown={onKeyDown} dangerouslySetInnerHTML={{__html: innerHTML}}>
                    {children}
                </div>
            )
        }else if(type === "lg"){
            return(
                <div id={id} className={`${styles.lg} ${classes}`} onClick={onClick} onKeyUp={onKeyUp} onKeyDown={onKeyDown} dangerouslySetInnerHTML={{__html: innerHTML}}>
                    {children}
                </div>
            )
        }else if(type === "xl"){
            return(
                <div id={id} className={`${styles.xl} ${classes}`} onClick={onClick} onKeyUp={onKeyUp} onKeyDown={onKeyDown} dangerouslySetInnerHTML={{__html: innerHTML}}>
                    {children}
                </div>
            )
        }
        else if(type === "landerTitle"){
            return(
                <div id={id} className={`${styles.landerTitle} ${classes}`} onKeyUp={onKeyUp} onKeyDown={onKeyDown} dangerouslySetInnerHTML={{__html: innerHTML}}>
                    {children}
                </div>
            )
        }


} 


export default Header;
