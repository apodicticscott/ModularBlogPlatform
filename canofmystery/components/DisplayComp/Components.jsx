import React from "react";
import { GoDotFill } from "react-icons/go";




const LargeP = () => {
    return (
        <>
        
        </>
    )

}

const Button = ({children}) => {
    return (
        <>
            <button className="text-xl w-max xs:tracking-[-1.76px] 3xl:text-[1.25vw] lg:text-2xl lg:tracking-[-2.76px] xl:text-2xl xl:tracking-[-3.32px] tracking-[-5.76px] border-2 lg:border-3 p-1 pr-3 rounded-md bg-primary-dark shadow-md ">
                {children}
            </button>            
        </>
    )
}

const Header = ({children}) => {
    return (
        <>
            <div className="flex flex-wrap text-3xl md:text-4xl 3xl:text-[3.5vw] tracking-[-3.76px] md:tracking-[-4.76px] lg:w-[100%] xl:w-[90%] lg:text-6xl lg:tracking-[-13px] 2xl:text-7xl 2xl:tracking-[-15px] font-bold text-t-header-light dark:text-t-dark">
                {children}
            </div>
        </>
    )
}

const SubHeader = ({children}) => {
    return (
        <>
            <h2 className="text-3xl 3xl:text-[1.5vw] font-bold tracking-[-5.76px]">
                {children}
            </h2>
        </>
    )
}


const SubText = ({children}) => {
    return (
        <>  
            <h2 className="w-content text-xl tracking-[-1.5px] xl:text-2xl xl:tracking-[-3.32px] 3xl:text-[1.25vw] tracking-[-5.76px]">
                {children}
            </h2>
        </>
    )
}

const Components = () => {

    return (
        <div className="h-screen w-screen flex flex-col bg-base-100 p-[50px] gap-4">
            Button 
            <Button>
                Button Name
            </Button>
            <Header>
                    Header Text
            </Header>
            Sub Header
            <SubHeader>
                Sub Header Text
            </SubHeader>
            Sub Text
            <SubText>
                Sub Text
            </SubText>
        </div>
    );
};

module.export = {Button, Header, SubHeader, SubText};


export default Components;