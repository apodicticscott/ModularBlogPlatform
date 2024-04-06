'use client'
import React, {useEffect, useState} from "react";
import { Divider } from "@material-ui/core";
import Header from "../TextComponents/Header1";
import { Tooltip } from "@material-ui/core";
import { FaCheck } from "react-icons/fa";
import useDocumentClassChange from "../../hooks/useDocumentClassChange";
import { updateUserAttribute } from "../../firebase/userUtils/userUtils"

const UserPanel = ({users, handleUpdateUsers, classes}) => {

    const [selectedUser, setSelectedUser] = useState({userId: null, userName: null, userData: null})
    const [inputId, setInputId] = useState(null)
    const [changeValue, setChangeValue] = useState(null)

    const currentTheme = useDocumentClassChange();


    const handleChangeUserAttribute = (attribute, uid) => {
        updateUserAttribute(uid, attribute, changeValue)
        setInputId(null)
        handleUpdateUsers();
        document.getElementById(attribute).value = ""
    }
    
    useEffect(() => {
        if(selectedUser.userId !== null){
            const user = users.filter(user => user.userInfo.uid === selectedUser.userId )
            console.log(user)
            setSelectedUser({userId: user[0].userInfo.uid, userName: user[0].firstName + " " + user[0].lastName, userData: user[0]}) 
        }
    }, [users])

    return(
        <div className="flex flex-col lg:grid md:grid-rows-2 grid-cols-2 h-full w-full justify-between sm:p-7 sm:gap-7  dark:font-extralight">
            <div className="flex flex-col justify-between gap-[25px] col-span-1 row-span-2 sm:rounded-md border-b-3 dark:border-b-2 dark:border-b-[#302c38] sm:border-3 dark:sm:border-2 dark:sm:border-[#302c38] p-7 pb-0 text-lg w-full dark:bg-base-100-dark ">
                <div className="flex flex-col gap-[15px]">
                    <div className="w-full h-max flex flex-col">
                        <Header type="sm" >
                            Users
                        </Header>
                    </div>
                    <Tooltip classes={{ tooltip: classes.customTooltip }} title="The first and last name of the user">
                        <span className="text-lg underline decoration-dashed">
                            User First and Last Name.
                        </span>
                    </Tooltip>
                    <span className="text-lg h-[50px]">
                        {
                            selectedUser.userName
                            ?
                            <>
                                {selectedUser.userName}
                            </>
                            :
                            <>
                                No User Selected.
                            </>
                        }
                    </span>
                </div>
                <div className="h-full flex flex-col w-full gap-[25px]">
                    <div className="w-full flex flex-col grow gap-[15px]">
                        <div className="w-full flex h-min">
                            <Tooltip classes={{ tooltip: classes.customTooltip }} title="the user's first name">
                                <div className="flex grow w-full md:basis-[200px] py-[15px] 2xl:py-0 pl-[10px] items-center underline decoration-dashed">
                                    First Name
                                </div>
                            </Tooltip>
                            <Tooltip classes={{ tooltip: classes.customTooltip }} title="the user's last name">
                                <div className="flex h-max w-full md:basis-[200px] py-[15px] 2xl:py-0 pl-[10px] items-center underline decoration-dashed">
                                    Last Name
                                </div>
                            </Tooltip>
                            <Tooltip classes={{ tooltip: classes.customTooltip }} title="The user's current session id for their log in">
                                <div className="flex h-max w-full md:basis-[200px] py-[15px] 2xl:py-0 pl-[10px] items-center underline decoration-dashed">
                                    Session ID
                                </div>
                            </Tooltip>
                            <Tooltip classes={{ tooltip: classes.customTooltip }} title="Whether the user has published or not.">
                                <div className="flex h-max w-full md:basis-[200px] py-[15px] 2xl:py-0 pl-[10px] items-center underline decoration-dashed">
                                    Has Published
                                </div>
                            </Tooltip>
                        </div>
                        <div className="flex w-full h-full max-h-[450px] xl:min-h-0 sm:h-auto sm:grow flex flex-col text-lg  rounded-t-md  border-3 dark:border-2 dark:border-[#302c38] dark:border-b-0 border-b-0 bg-base-200 dark:bg-secondary-dark overflow-y-scroll scrollbar-hide">
                            {
                                users
                                ?
                                users.map((user, index) => (
                                    <div key={index} className={`flex justify-between w-full h-max dark:hover:bg-[#18161b] items-center shadow cursor-pointer ${selectedUser.userId === user.userInfo.uid ? "bg-base-200 dark:bg-[#18161b]" : "bg-base-100 dark:bg-base-100-dark"} ${index === 0 && "rounded-t-md"} ${index !== (users.length - 1) && "border-b-3 dark:border-b-2 dark:border-b-[#302c38]"}`} onClick={() => (selectedUser.userId !== user.userInfo.uid ? setSelectedUser({userId: user.userInfo.uid, userName: user.firstName + " " + user.lastName, userData: user}) : setSelectedUser({userId: null, userName: null, userData: null}))}>
                                        <div className="flex grow basis-[200px] py-[15px] 2xl:py-0 pl-[10px] min-h-[50px] items-center">
                                            {user.firstName}
                                        </div>
                                        <Divider orientation="vertical" flexItem className={currentTheme === "dark" ? classes.customDividerDark : classes.customDividerLight}/>
                                        <div className="flex basis-[200px] py-[15px] 2xl:py-0 pl-[10px] min-h-[50px] items-center ">
                                            {user.lastName}
                                        </div>
                                        <Divider orientation="vertical" flexItem className={currentTheme === "dark" ? classes.customDividerDark : classes.customDividerLight}/>
                                        <div className="flex basis-[200px] py-[15px] 2xl:py-0 pl-[10px] items-center min-h-[50px]">
                                            {user.sessionCode}
                                        </div>
                                        <Divider orientation="vertical" flexItem className={currentTheme === "dark" ? classes.customDividerDark : classes.customDividerLight}/>
                                        <div className={`flex basis-[200px] 2xl:grow pl-[10px] py-[15px] items-center`}>
                                            {
                                            user.hasPublished
                                            ?
                                            "True"
                                            :
                                            "False"
                                            }
                                        </div>
                                    </div>
                                ))
                                :
                                <>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-[25px] col-span-1 row-span-2 sm:rounded-md sm:border-3 dark:sm:border-2 dark:sm:border-[#302c38] w-full p-7 text-lg min-h-[600px] dark:bg-base-100-dark">
                <Header type="sm">
                    User Info.
                </Header>
                {
                    !selectedUser.userData
                    &&
                    "Oops! It looks like no user has been selected."

                }
                <div className="flex gap-[25px] w-full ">
                    {
                        selectedUser.userData
                        ?
                        <>
                            <div className="flex flex-col w-[50%] max-w-[50%]  h-full gap-[15px] overflow-hidden  text-wrap" onClick={(e) => (e.target === e.currentTarget && setInputId(null))}>
                                <div className="flex flex-col min-h-[54px]" onClick={(e) => (e.target === e.currentTarget && setInputId(null))}>
                                    <span className="text-lg underline decoration-dashed" onClick={(e) => (e.target === e.currentTarget && setInputId(null))}>
                                        First Name.
                                    </span>
                                    <div className={`text-lg mt-[15px] h-[30px] flex items-center  w-max p-2 dark:hover:bg-[#18161b] hover:bg-base-200 cursor-pointer rounded-md transition duration-150 ${inputId === "firstName" && "hidden"}`} onClick={() => (setInputId("firstName"), (document.getElementById("firstName").value = selectedUser.userData.firstName),  setTimeout(() => document.getElementById("firstName").focus(), 500))}>
                                        {selectedUser.userData.firstName}
                                    </div>
                                    <div className={`flex w-max  gap-[5px]  overflow-hidden ${inputId === "firstName" ? "opacity-1 h-[30px] mt-[15px]" : "opacity-0 h-0 mt-0"} transition-opacity duration-200`}>
                                        <input id="firstName" onChange={(e) => setChangeValue(e.target.value)}  className="w-[100px] dark:border-2 dark:border-[#302c38] dark:bg-[#18161b] h-full rounded-md bg-base-200 pl-2"/>
                                        <button className={`w-[30px] h-[30px] bg-base-200 rounded-md flex items-center justify-center transition-opacity duration-200 delay-200 dark:border-2 dark:border-[#302c38] dark:bg-[#18161b] ${inputId === "firstName" ? "opacity-1" : "opacity-0"}`} onClick={() => handleChangeUserAttribute("firstName", selectedUser.userData.userInfo.uid)}>
                                            <FaCheck />
                                        </button>
                                    </div>
                                </div>
                                <div className="flex flex-col min-h-[54px]" onClick={(e) => (e.target === e.currentTarget && setInputId(null))}>
                                    <Tooltip classes={{ tooltip: classes.customTooltip }} title="the user's last name">
                                        <span className="text-lg underline decoration-dashed" onClick={(e) => (e.target === e.currentTarget && setInputId(null))}>
                                            Last Name.
                                        </span>
                                    </Tooltip>
                                    <div className={`text-lg mt-[15px] h-[30px] flex items-center dark:hover:bg-[#18161b] w-max p-2 hover:bg-base-200 cursor-pointer rounded-md transition duration-150 ${inputId === "lastName" && "hidden"}`}  onClick={() => (setInputId("lastName"), (document.getElementById("lastName").value = selectedUser.userData.lastName), setTimeout(() => document.getElementById("lastName").focus(), 500))}>
                                        {selectedUser.userData.lastName}
                                    </div>
                                    <div className={`flex w-max  gap-[5px]  overflow-hidden ${inputId === "lastName" ? "opacity-1 h-[30px] mt-[15px]" : "opacity-0 h-0 mt-0"} transition-opacity duration-200`}>
                                        <input id="lastName" onChange={(e) => setChangeValue(e.target.value)} className="w-[100px] dark:border-2 dark:border-[#302c38] dark:bg-[#18161b] h-full rounded-md  bg-base-200 pl-2"/>
                                        <button className={`w-[30px] h-[30px] bg-base-200 rounded-md flex items-center justify-center transition-opacity duration-200 delay-200 dark:border-2 dark:border-[#302c38] dark:bg-[#18161b] ${inputId === "lastName" ? "opacity-1" : "opacity-0"}`} onClick={() => handleChangeUserAttribute("lastName", selectedUser.userData.userInfo.uid)}>
                                            <FaCheck />
                                        </button>
                                    </div>
                                </div>
                                <div className="flex flex-col min-h-[54px]" onClick={(e) => (e.target === e.currentTarget && setInputId(null))}>
                                    <Tooltip classes={{ tooltip: classes.customTooltip }} title="the user's display name they chose">
                                        <span className="text-lg underline decoration-dashed" onClick={(e) => (e.target === e.currentTarget && setInputId(null))}>
                                            Display Name.
                                        </span>
                                    </Tooltip>
                                    <div className={`text-lg mt-[15px] flex items-center h-[30px] w-max p-2 dark:hover:bg-[#18161b] hover:bg-base-200 cursor-pointer rounded-md transition duration-150 ${inputId === "userInfo.displayName" && "hidden"}`}  onClick={() => (setInputId("userInfo.displayName"), (document.getElementById("userInfo.displayName").value = selectedUser.userData.userInfo.displayName), setTimeout(() => document.getElementById("userInfo.displayName").focus(), 500))}>
                                        {selectedUser.userData.userInfo.displayName}
                                    </div>
                                    <div className={`flex w-max  gap-[5px]  overflow-hidden ${inputId === "userInfo.displayName" ? "opacity-1 h-[30px] mt-[15px]" : "opacity-0 h-0 mt-0"} transition-opacity duration-200`}>
                                        <input id="userInfo.displayName" onChange={(e) => setChangeValue(e.target.value)}  className="w-[100px] h-full dark:border-2 dark:border-[#302c38] dark:bg-[#18161b] rounded-md bg-base-200 pl-2"/>
                                        <button className={`w-[30px] h-[30px] bg-base-200 rounded-md flex items-center justify-center transition-opacity duration-200 dark:border-2 dark:border-[#302c38] dark:bg-[#18161b] delay-200 ${inputId === "userInfo.displayName" ? "opacity-1" : "opacity-0"}`} onClick={() => handleChangeUserAttribute("userInfo.displayName", selectedUser.userData.userInfo.uid)}>
                                            <FaCheck />
                                        </button>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-[15px] min-h-[54px]">
                                    <Tooltip classes={{ tooltip: classes.customTooltip }} title="the user's email they registered with">
                                        <span className="text-lg underline decoration-dashed">
                                            Email.
                                        </span>
                                    </Tooltip>
                                    <div className="text-lg overflow-none text-wrap w-full">
                                        {selectedUser.userData.userInfo.email}
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="flex flex-col w-[50%] h-full gap-[25px] ">
                                <div className="flex flex-col gap-[15px] min-h-[54px]">
                                    <Tooltip classes={{ tooltip: classes.customTooltip }} title="Whether the user is a student writer">
                                        <span className="text-lg underline decoration-dashed">
                                            Student Writer.
                                        </span>
                                    </Tooltip>
                                    <div className="text-lg" onClick={() => setInputId("studentWriter")}>
                                        {
                                        selectedUser.userData.studentWriter
                                        ?
                                        "true"
                                        :
                                        "false"
                                        }
                                    </div>
                                </div>
                                <div className="flex flex-col gap-[15px] min-h-[54px]">
                                    <Tooltip classes={{ tooltip: classes.customTooltip }} title="the user's session code that they registered with">
                                        <span className="text-lg underline decoration-dashed">
                                            Session Code.
                                        </span>
                                    </Tooltip>
                                    <div className="text-lg" onClick={() => setInputId("sessionCode")}>
                                        {selectedUser.userData.sessionCode}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-[15px] min-h-[54px]">
                                    <Tooltip classes={{ tooltip: classes.customTooltip }} title="whether the user has published an article or not">
                                        <span className="text-lg underline decoration-dashed">
                                            Has Published.
                                        </span>
                                    </Tooltip>
                                    <div className="text-lg" onClick={() => setInputId("hasPublished")}>
                                        {
                                        selectedUser.userData.hasPublished
                                        ?
                                        "true"
                                        :
                                        "false"
                                        }
                                    </div>
                                </div>
                                <div className="flex flex-col gap-[15px] min-h-[54px]">
                                    <Tooltip classes={{ tooltip: classes.customTooltip }} title="Whether this user is an admin account or not.">
                                        <span className="text-lg underline decoration-dashed">
                                            Is Admin
                                        </span>
                                    </Tooltip>
                                    <div className="text-lg" onClick={() => setInputId("isAdmin")}>
                                        {
                                        selectedUser.userData.adminPerm
                                        ?
                                        "true"
                                        :
                                        "false"
                                        }
                                    </div>
                                </div>
                                <div className="flex flex-col gap-[15px] min-h-[54px]">
                                    <Tooltip classes={{ tooltip: classes.customTooltip }} title="The user's unique id.">
                                        <span className="text-lg underline decoration-dashed">
                                            User ID
                                        </span>
                                    </Tooltip>
                                    <div className="flex text-lg h-max w-full">
                                        {selectedUser.userData.userInfo.uid}
                                    </div>
                                </div>
                            </div>
                        </>
                        :
                        <>
                        </>
                    }
                </div>


            </div>
        </div>
    )
}

export default UserPanel;