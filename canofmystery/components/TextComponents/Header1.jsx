'use client'
import React from "react";

const Header = ({children, text, type, classes, style, editable, highlight, onClick, onInput, onKeyUp, onKeyDown, id}) => {


    


    let styles = {
        sm: {
            width: "w-full",
            flex: "",
            gap: "",
            style: "font-bold",
            lightColor: "text-t-header-light",
            darkColor: "dark:text-t-dark",
            tracking: "tracking-[-3px]",
            trackingMd: "",
            trackingLg: "",
            tracking2xl: "",
            tracking3xl: "",
            size: "text-2.2xl",
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
            style: "font-bold",
            lightColor: "text-t-header-light",
            darkColor: "dark:text-t-dark",
            tracking: "tracking-[-4px]",
            trackingMd: "",
            trackingLg: "",
            tracking2xl: "",
            tracking3xl: "",
            size: "text-3xl",
            sizeMd: "",
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
            tracking: "tracking-[-4px]",
            trackingMd: "",
            trackingLg: "",
            tracking2xl: "",
            tracking3xl: "",
            size: "text-4xl",
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
            tracking: "tracking-[-6px]",
            trackingMd: "",
            trackingLg: "lg:tracking-[-11px]",
            tracking2xl: "",
            tracking3xl: "",
            size: "text-5xl",
            sizeMd: "",
            sizeLg: "lg:text-6xl",
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
            trackingMd: "",
            trackingLg: "lg:tracking-[-11px]",
            tracking2xl: "",
            tracking3xl: "",
            size: "text-4xl",
            sizeMd: "md:text-7xl",
            sizeLg: "lg:text-6xl",
            sizeXL: "xl:text-5xl",
            size2XL: "2xl:text-[4.6vw]",
            size3XL: "3xl:text-[4.5vw]",
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
        }else if(type === "lg"){
            return(
                <div id={id} data-compid={id}  className={`${styles.lg} ${classes}`} contentEditable={editable} suppressContentEditableWarning={true} onClick={onClick} onKeyUp={onKeyUp} onKeyDown={onKeyDown} dangerouslySetInnerHTML={createMarkup()}>
    
                </div>
            )
        }else if(type === "xl"){
            return(
                <div id={id} data-compid={id}  className={`${styles.xl} ${classes}`} contentEditable={editable} suppressContentEditableWarning={true} onClick={onClick} onKeyUp={onKeyUp} onKeyDown={onKeyDown} dangerouslySetInnerHTML={createMarkup()}>
    
                </div>
            )
        }
        else if(type === "landerTitle"){
            return(
                <div id={id} data-compid={id}  className={`${styles.landerTitle} ${classes}`} contentEditable={editable} suppressContentEditableWarning={true} onKeyUp={onKeyUp} onKeyDown={onKeyDown} dangerouslySetInnerHTML={createMarkup()}>
    
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
        }else if(type === "lg"){
            return(
                <div id={id} className={`${styles.lg} ${classes}`} onClick={onClick} onKeyUp={onKeyUp} onKeyDown={onKeyDown} >
                    {children}
                </div>
            )
        }else if(type === "xl"){
            return(
                <div id={id} className={`${styles.xl} ${classes}`} onClick={onClick} onKeyUp={onKeyUp} onKeyDown={onKeyDown} >
                    {children}
                </div>
            )
        }
        else if(type === "landerTitle"){
            return(
                <div id={id} className={`${styles.landerTitle} ${classes}`} onKeyUp={onKeyUp} onKeyDown={onKeyDown} >
                    {children}
                </div>
            )
        }
    }


} 


export default Header;
