import React from 'react'


const Container = ({type, children, style, classes}) => {

    console.log(type)
    let styles = {
        col: {
            flex: "flex",
            dir: "",
            items: "",
            gap: "",
            width: "w-full",
            height: "h-max",
        },
        row: {
            flex: "",
            items: "",
            gap: "",
            width: "w-full",
            height: "h-max",
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
        col: convertStylesToString(tempStyles.col),
        row: convertStylesToString(tempStyles.row),
    };


    if(type === "col"){
        return(
            <div className={`${styles.col} ${classes}`}>
                {children}
            </div>
        )
    }else if(type === "row"){
        return(
            <div className={`${styles.row} ${classes}`}>
                {children}
            </div>
        )
    }
}

export default Container;