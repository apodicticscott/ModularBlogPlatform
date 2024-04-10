'use client'
import React, {useEffect, useState} from "react";
import { Divider } from "@material-ui/core";
import Header from "../TextComponents/Header1";
import { Tooltip } from "@material-ui/core";
import { FaCheck, FaLock  } from "react-icons/fa";
import useDocumentClassChange from "../../hooks/useDocumentClassChange";
import { updateUserAttribute } from "../../firebase/userUtils/userUtils";
import { FaLockOpen } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import Paragraph from "../TextComponents/Paragraph";
import NeoButton from "../TextComponents/NeoButton";
import { deleteUser } from "../../firebase/userUtils/userUtils"

const UserPanel = ({users, handleUpdateUsers, classes}) => {

    const [selectedUser, setSelectedUser] = useState({userId: null, userName: null, userData: null})
    const [inputId, setInputId] = useState(null)
    const [dropDownId, setDropDownId] = useState(null)
    const [changeValue, setChangeValue] = useState(null)
    const [dropDownValue, setDropDownValue] = useState(null)
    const [valueLoading, setValueLoading] = useState(false)
    const [isAccountDisabled, setIsAccountDisabled] = useState(null);
    const [lockCheckLoading, setLockCheckLoading] = useState(false)
    const [isDelete, setIsDelete] = useState(false);

    const currentTheme = useDocumentClassChange();


    const handleChangeUserAttribute = async (attribute, uid) => {
        setValueLoading(true)
        
        const response = await updateUserAttribute(uid, attribute, document.getElementById(attribute).value)

        if(response){
            setInputId(null)
            handleUpdateUsers();
            document.getElementById(attribute).value = ""
        }

        setValueLoading(false)
    }

    const handleChangeUserAttribute_DropDown = async (attribute, uid) => {
        setValueLoading(true)

        const response = await updateUserAttribute(uid, attribute, dropDownValue)

        if(response){
            setInputId(null)
            setDropDownId(null)
            setDropDownValue(null)
            handleUpdateUsers();
        }

        setValueLoading(false)
    }
    
    useEffect(() => {
        if(selectedUser.userId !== null){
            const user = users.filter(user => user.userInfo.uid === selectedUser.userId )
            console.log(user)
            setSelectedUser({userId: user[0].userInfo.uid, userName: user[0].firstName + " " + user[0].lastName, userData: user[0]}) 
        }
    }, [users])

    const handleDropDownClick = (id) => {
        if(dropDownId === id){
            setDropDownId(null)
        }else{
            setDropDownId(id)
        }
    }



    useEffect(() => {
        if(selectedUser){
            const fetchUserData = async () => {
                try {
                    // Update the URL to where your API is hosted, for example, 'https://yourdomain.com/api/checkIfDisabled'
                    const response = await fetch(`/api/checkIfDisabled?uid=${selectedUser.userId}`, {
                      method: 'GET', // Using the GET request
                      headers: {
                        'Content-Type': 'application/json',
                      },
                    });
                    console.log(response)
                    if (!response.ok) {
                      throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                
                    const {disabled, error} = await response.json();
                    if(!error){
                        setIsAccountDisabled(disabled)
                    }else{
                        console.log(error)
                    }
                  } catch (error) {
                    console.error('Failed to check if the account is disabled:', error.message);
                  }
            };

            fetchUserData();
        }else{
            setIsAccountDisabled(null)
        }
    }, [selectedUser])

    const handleAccountDisable = (id) => {
        if(selectedUser){
            const handleDisable = async () => {
                try {
                    // Update the URL to where your API is hosted, for example, 'https://yourdomain.com/api/checkIfDisabled'
                    const response = await fetch(`/api/disableUser?uid=${selectedUser.userId}`, {
                      method: 'GET', // Using the GET request
                      headers: {
                        'Content-Type': 'application/json',
                      },
                    });
                    if (!response.ok) {
                      throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                
                    const {succses, error} = await response.json();
                    if(error){
                        console.log(error)
                    }else{
                        console.log("here")
                        setSelectedUser(selectedUser)
                        setIsAccountDisabled(true)
                    }
                  } catch (error) {
                    console.error('Failed to check if the account is disabled:', error.message);
                  }
            };
            handleDisable();
        }else{
            setIsAccountDisabled(null)
        }
    }

    const handleAccountEnable = (id) => {
        if(selectedUser){
            const handleEnable = async () => {
                try {
                    // Update the URL to where your API is hosted, for example, 'https://yourdomain.com/api/checkIfDisabled'
                    const response = await fetch(`/api/enableUser?uid=${selectedUser.userId}`, {
                      method: 'GET', // Using the GET request
                      headers: {
                        'Content-Type': 'application/json',
                      },
                    });
                    if (!response.ok) {
                      throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                
                    const {succses, error} = await response.json();
                    if(error){
                        console.log(error)
                    }else{
                        console.log("here")
                        setSelectedUser(selectedUser)
                        setIsAccountDisabled(false)
                    }
                  } catch (error) {
                    console.error('Failed to check if the account is disabled:', error.message);
                  }
            };

            handleEnable();
        }else{
            setIsAccountDisabled(null)
        }
    }

    const handleDeleteUser = (id) => {
        if(selectedUser){
            const handleDelete = async () => {
                console.log(selectedUser.userId)
                try {
                    // Update the URL to where your API is hosted, for example, 'https://yourdomain.com/api/checkIfDisabled'
                    const response = await fetch(`/api/deleteUser?uid=${selectedUser.userId}`, {
                      method: 'GET', // Using the GET request
                      headers: {
                        'Content-Type': 'application/json',
                      },
                    });
                    if (!response.ok) {
                      throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                
                    const {succses, error} = await response.json();
                    if(error){
                        console.log(error)
                    }else{
                        

                    }
                  } catch (error) {
                    console.error('Failed to check if the account is disabled:', error.message);
                  }
            };

            setIsDelete(false)
            deleteUser(selectedUser.userId)
            handleDelete();
            setSelectedUser({userId: null, userName: null, userData: null})
            handleUpdateUsers();
        }else{
            setIsAccountDisabled(null)
        }
    }


    return(
        <div className="flex flex-col lg:grid md:grid-rows-2 grid-cols-2 h-full w-full justify-between sm:p-7 sm:gap-7  dark:font-extralight">
            {
                isDelete
                &&
                <div className="w-screen h-screen fixed top-0 left-0 z-30 flex items-center justify-center backdrop-blur-sm">
                    <div className="flex flex-col w-[300px] h-max rounded-md bg-base-100 border-3 shadow-lg dark:shadow-md-move-dark gap-[15px] dark:bg-base-100-dark dark:border-2 dark:border-[#302c38] p-3">
                        <Header type="sm">
                            Are you sure?
                        </Header>
                        <Paragraph type="md">
                            This action cannot be undone.
                            Are you sure you want to continue?
                        </Paragraph>
                        <div className="flex w-full h-max justify-between">
                            <NeoButton classes="bg-primary-dark dark:text-t-header-light dark:font-normal" onClick={() => handleDeleteUser(selectedUser.userId)}>
                                Im sure!
                            </NeoButton>
                            <NeoButton classes="bg-[#d32a00] dark:text-t-header-light dark:font-normal" onClick={() => setIsDelete(false)}>
                                NO! 
                            </NeoButton>
                        </div>

                    </div>
                </div>
            }
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
                <div className="h-full flex flex-col w-full  gap-[25px]">
                    <div className="w-full flex flex-col justify-between grow gap-[15px]">
                        <div className="w-full flex h-min">
                            <Tooltip classes={{ tooltip: classes.customTooltip }} title="the user's first name">
                                <div className="flex grow w-full md:basis-[200px] py-[15px] 2xl:py-0 pl-[10px] items-center underline decoration-dashed">
                                    First
                                    <span className="hidden sm:flex lg:hidden xl:flex">
                                    &nbsp;Name
                                    </span>
                                </div>
                            </Tooltip>
                            <Tooltip classes={{ tooltip: classes.customTooltip }} title="the user's last name">
                                <div className="flex h-max w-full md:basis-[200px] py-[15px] 2xl:py-0 pl-[10px] items-center underline decoration-dashed">
                                    Last
                                    <span className="hidden sm:flex lg:hidden xl:flex">
                                    &nbsp;Name
                                    </span>
                                </div>
                            </Tooltip>
                            <Tooltip classes={{ tooltip: classes.customTooltip }} title="The user's current session id for their log in">
                                <div className="flex h-max w-full md:basis-[200px] py-[15px] 2xl:py-0 pl-[10px] items-center underline decoration-dashed">
                                    Session
                                    <span className="hidden sm:flex lg:hidden xl:flex">
                                    &nbsp;ID
                                    </span>
                                </div>
                            </Tooltip>
                            <Tooltip classes={{ tooltip: classes.customTooltip }} title="Whether the user has published or not.">
                                <div className="flex h-max w-full md:basis-[200px] py-[15px] 2xl:py-0 pl-[10px] items-center underline decoration-dashed">
                                    <span className="hidden sm:flex lg:hidden xl:flex">
                                    ID&nbsp;
                                    </span> 
                                    Published
                                </div>
                            </Tooltip>
                        </div>
                        <div className="flex w-full h-full max-h-[450px] xl:min-h-0 sm:h-auto sm:grow flex flex-col text-lg  rounded-t-md  border-3 dark:border-2 dark:border-[#302c38] dark:border-b-0 border-b-0 bg-base-200 dark:bg-secondary-dark overflow-y-scroll scrollbar-hide">
                            {
                                users
                                ?
                                users.map((user, index) => (
                                    <div key={index} className={`flex justify-between w-full h-max max-h-[50px] dark:hover:bg-[#18161b] items-center shadow cursor-pointer ${index === (users.length - 1) && "border-b-3 dark:border-b-2 dark:border-b-[#302c38]"} ${selectedUser.userId === user.userInfo.uid ? "bg-base-200 dark:bg-[#18161b]" : "bg-base-100 dark:bg-base-100-dark"} ${index === 0 && "rounded-t-md"} ${index !== (users.length - 1) && "border-b-3 dark:border-b-2 dark:border-b-[#302c38]"}`} onClick={() => (selectedUser.userId !== user.userInfo.uid ? setSelectedUser({userId: user.userInfo.uid, userName: user.firstName + " " + user.lastName, userData: user}) : setSelectedUser({userId: null, userName: null, userData: null}))}>
                                        <div className="flex grow basis-[200px] py-[15px] 2xl:py-0 pl-[10px] min-h-[50px] items-center">
                                            {
                                                (inputId === "firstName" && valueLoading && selectedUser.userId === user.userInfo.uid)
                                                ?
                                                    <div id="spinner" className={`ml-[10px] ${valueLoading ? "opacity-1" : "opacity-0"} border-3 dark:border-t-[#504d57] dark:border-[#2f2d33]`}>
                                                    </div>
                                                :
                                                user.firstName
                                                ?
                                                user.firstName
                                                :
                                                "N/A"
                                            }
                                        </div>
                                        <Divider orientation="vertical" flexItem className={currentTheme === "dark" ? classes.customDividerDark : classes.customDividerLight}/>
                                        <div className="flex basis-[200px] py-[15px] 2xl:py-0 pl-[10px] min-h-[50px] items-center ">
                                            {
                                                (inputId === "lastName" && valueLoading && selectedUser.userId === user.userInfo.uid)
                                                ?
                                                    <div id="spinner" className={`ml-[10px] ${valueLoading ? "opacity-1" : "opacity-0"} border-3 dark:border-t-[#504d57] dark:border-[#2f2d33]`}>
                                                    </div>
                                                :
                                                user.lastName
                                                ?
                                                user.lastName
                                                :
                                                "N/A"
                                            }
                                        </div>
                                        <Divider orientation="vertical" flexItem className={currentTheme === "dark" ? classes.customDividerDark : classes.customDividerLight}/>
                                        <div className="flex basis-[200px] py-[15px] 2xl:py-0 pl-[10px] items-center min-h-[50px]">
                                            {
                                                (inputId === "sessionCode" && valueLoading && selectedUser.userId === user.userInfo.uid)
                                                ?
                                                    <div id="spinner" className={`ml-[10px] ${valueLoading ? "opacity-1" : "opacity-0"} border-3 dark:border-t-[#504d57] dark:border-[#2f2d33]`}>
                                                    </div>
                                                :
                                                user.sessionCode
                                                ?
                                                user.sessionCode
                                                :
                                                "N/A"
                                            }
                                        </div>
                                        <Divider orientation="vertical" flexItem className={currentTheme === "dark" ? classes.customDividerDark : classes.customDividerLight}/>
                                        <div className={`flex basis-[200px] 2xl:grow pl-[10px] py-[15px] items-center`}>
                                            {
                                            (dropDownId === "hasPublished" && valueLoading && selectedUser.userId === user.userInfo.uid)
                                            ?
                                                <div id="spinner" className={`ml-[10px] ${valueLoading ? "opacity-1" : "opacity-0"} border-3 dark:border-t-[#504d57] dark:border-[#2f2d33]`}>
                                                </div>
                                            :
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
            <div className="flex flex-col justify-between col-span-1 row-span-2 sm:rounded-md sm:border-3 dark:sm:border-2 dark:sm:border-[#302c38] w-full p-3 text-lg min-h-[600px] dark:bg-base-100-dark">
                <div className="flex flex-col gap-[25px]  rounded-md bg-base-200 p-[20px] dark:bg-[#18161b]">
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
                                        <div className={`text-lg mt-[15px] h-[30px] flex items-center  w-max p-2 dark:hover:bg-[#18161b] hover:bg-base-100 cursor-pointer rounded-md transition duration-150 ${inputId === "firstName" && "hidden"}`} onClick={() => (setInputId("firstName"), (document.getElementById("firstName").value = selectedUser.userData.firstName),  setTimeout(() => document.getElementById("firstName").focus(), 500))}>
                                            {
                                                selectedUser.userData.firstName
                                                ?
                                                <>{selectedUser.userData.firstName}</>
                                                :
                                                <>Click To Add</>
                                            }
                                        </div>
                                        <div className={`flex w-max  gap-[5px]  overflow-hidden ${inputId === "firstName" ? "opacity-1 h-[30px] mt-[15px]" : "opacity-0 h-0 mt-0"} transition-opacity duration-200`}>
                                            <input id="firstName" onChange={(e) => setChangeValue(e.target.value)}  className="w-[100px] dark:border-2 dark:border-[#302c38] dark:bg-[#18161b] h-full rounded-md bg-base-100 pl-2"/>
                                            <button className={`w-[30px] h-[30px] bg-base-100 rounded-md flex items-center justify-center transition-opacity duration-200 delay-200 dark:border-2 dark:border-[#302c38] dark:bg-[#18161b] ${inputId === "firstName" ? "opacity-1" : "opacity-0"}`} onClick={() => handleChangeUserAttribute("firstName", selectedUser.userData.userInfo.uid)}>
                                                <FaCheck />
                                            </button>
                                            <div id="spinner" className={`ml-[10px] ${valueLoading ? "opacity-1" : "opacity-0"} border-3 dark:border-t-[#504d57] dark:border-[#2f2d33]`}>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col min-h-[54px]" onClick={(e) => (e.target === e.currentTarget && setInputId(null))}>
                                        <Tooltip classes={{ tooltip: classes.customTooltip }} title="the user's last name">
                                            <span className="text-lg underline decoration-dashed" onClick={(e) => (e.target === e.currentTarget && setInputId(null))}>
                                                Last Name.
                                            </span>
                                        </Tooltip>
                                        <div className={`text-lg mt-[15px] h-[30px] flex items-center dark:hover:bg-[#18161b] w-max p-2 hover:bg-base-100 cursor-pointer rounded-md transition duration-150 ${inputId === "lastName" && "hidden"}`}  onClick={() => (setInputId("lastName"), (document.getElementById("lastName").value = selectedUser.userData.lastName), setTimeout(() => document.getElementById("lastName").focus(), 500))}>
                                            {
                                                selectedUser.userData.lastName
                                                ?
                                                <>{selectedUser.userData.lastName}</>
                                                :
                                                <>Click To Add</>
                                            }
                                        </div>
                                        <div className={`flex w-max  gap-[5px]  overflow-hidden ${inputId === "lastName" ? "opacity-1 h-[30px] mt-[15px]" : "opacity-0 h-0 mt-0"} transition-opacity duration-200`}>
                                            <input id="lastName" onChange={(e) => setChangeValue(e.target.value)} className="w-[100px] dark:border-2 dark:border-[#302c38] dark:bg-[#18161b] h-full rounded-md  bg-base-100 pl-2"/>
                                            <button className={`w-[30px] h-[30px] bg-base-100 rounded-md flex items-center justify-center transition-opacity duration-200 delay-200 dark:border-2 dark:border-[#302c38] dark:bg-[#18161b] ${inputId === "lastName" ? "opacity-1" : "opacity-0"}`} onClick={() => handleChangeUserAttribute("lastName", selectedUser.userData.userInfo.uid)}>
                                                <FaCheck />
                                            </button>
                                            <div id="spinner" className={`ml-[10px] ${valueLoading ? "opacity-1" : "opacity-0"} border-3 dark:border-t-[#504d57] dark:border-[#2f2d33]`}>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col min-h-[54px]" onClick={(e) => (e.target === e.currentTarget && setInputId(null))}>
                                        <Tooltip classes={{ tooltip: classes.customTooltip }} title="the user's display name they chose">
                                            <span className="text-lg underline decoration-dashed" onClick={(e) => (e.target === e.currentTarget && setInputId(null))}>
                                                Display Name.
                                            </span>
                                        </Tooltip>
                                        <div className={`text-lg mt-[15px] flex items-center h-[30px] w-max p-2 dark:hover:bg-[#18161b] hover:bg-base-100 cursor-pointer rounded-md transition duration-150 ${inputId === "userInfo.displayName" && "hidden"}`}  onClick={() => (setInputId("userInfo.displayName"), (document.getElementById("userInfo.displayName").value = selectedUser.userData.userInfo.displayName), setTimeout(() => document.getElementById("userInfo.displayName").focus(), 500))}>
                                            {
                                                selectedUser.userData.userInfo.displayName
                                                ?
                                                <>{selectedUser.userData.userInfo.displayName}</>
                                                :
                                                <>Click To Add</>
                                            }
                                        </div>
                                        <div className={`flex w-max  gap-[5px]  overflow-hidden ${inputId === "userInfo.displayName" ? "opacity-1 h-[30px] mt-[15px]" : "opacity-0 h-0 mt-0"} transition-opacity duration-200`}>
                                            <input id="userInfo.displayName" onChange={(e) => setChangeValue(e.target.value)}  className="w-[100px] h-full dark:border-2 dark:border-[#302c38] dark:bg-[#18161b] rounded-md bg-base-100 pl-2"/>
                                            <button className={`w-[30px] h-[30px] bg-base-100 rounded-md flex items-center justify-center transition-opacity duration-200 dark:border-2 dark:border-[#302c38] dark:bg-[#18161b] delay-200 ${inputId === "userInfo.displayName" ? "opacity-1" : "opacity-0"}`} onClick={() => handleChangeUserAttribute("userInfo.displayName", selectedUser.userData.userInfo.uid)}>
                                                <FaCheck />
                                            </button>
                                            <div id="spinner" className={`ml-[10px] ${valueLoading ? "opacity-1" : "opacity-0"} border-3 dark:border-t-[#504d57] dark:border-[#2f2d33]`}>
                                            </div>
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
                                <div className="flex flex-col w-[50%] h-full gap-[15px]">
                                    <div className="flex flex-col min-h-[54px]" onClick={(e) => (e.target === e.currentTarget && setInputId(null))}>
                                        <Tooltip classes={{ tooltip: classes.customTooltip }} title="the user's display name they chose">
                                            <span className="text-lg underline decoration-dashed" onClick={(e) => (e.target === e.currentTarget && setInputId(null))}>
                                                Student Writer.
                                            </span>
                                        </Tooltip>
                                        <div className={`text-lg mt-[15px] flex items-center h-[30px] w-max p-2 dark:hover:bg-[#18161b] hover:bg-base-100 cursor-pointer rounded-md transition duration-150 ${inputId === "studentWriter" && "hidden"}`}  onClick={() => (setInputId("studentWriter"), setDropDownValue(selectedUser.userData.studentWriter))}>
                                            {
                                                selectedUser.userData.studentWriter
                                                ?
                                                "true"
                                                :
                                                "false"
                                            }
                                        </div>
                                        <div className={` w-max gap-[5px] ${!(dropDownId === "studentWriter") && "items-center"} ${inputId === "studentWriter" ? `opacity-1 h-max mt-[15px] flex ` : "opacity-0 h-0 mt-0 hidden"} transition-opacity duration-200`}>
                                            <div className={`flex flex-col ${dropDownId === "studentWriter" && "gap-[5px]"} `}>
                                                <div className="min-h-[30px] pl-2 w-[100px] flex items-center cursor-pointer w-[100px] h-max dark:border-2 dark:border-[#302c38] dark:bg-[#18161b] rounded-md bg-base-100" onClick={() => handleDropDownClick("studentWriter")}>
                                                    {
                                                        dropDownValue
                                                        ?
                                                        "true"
                                                        :
                                                        "false"
                                                    }
                                                </div>
                                                <div className={`transition duration-100 bg-base-100 overflow-hidden ${dropDownId === "studentWriter" ? "w-[100px] h-max dark:bg-[#18161b] dark:border-2 dark:border-[#302c38] rounded-md" : "w-0 h-0 overflow-hidden"}`}>
                                                    <button className="w-full h-max p-2 text-left bg-base-100  dark:hover:bg-[#302c38]" onClick={() => setDropDownValue(true)}>
                                                        true
                                                    </button >
                                                    <Divider className={currentTheme === "dark" ? classes.customDividerDark : classes.customDividerLight} />
                                                    <button  className="w-full h-max p-2 text-left bg-base-100 dark:hover:bg-[#302c38]" onClick={() => setDropDownValue(false)}>
                                                        false
                                                    </button >
                                                </div>
                                            </div>
                                            <button className={`w-[30px] h-[30px] bg-base-100 rounded-md flex items-center justify-center transition-opacity duration-200 dark:border-2 dark:border-[#302c38] dark:bg-[#18161b] delay-200 dark:hover:bg-[#302c38] ${inputId === "studentWriter" ? "opacity-1" : "opacity-0"}`} onClick={() => handleChangeUserAttribute_DropDown("studentWriter", selectedUser.userData.userInfo.uid)}>
                                                <FaCheck />
                                            </button>
                                            <div id="spinner" className={`ml-[10px] ${valueLoading ? "opacity-1" : "opacity-0"} border-3 dark:border-t-[#504d57] dark:border-[#2f2d33]`}>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col min-h-[54px]" onClick={(e) => (e.target === e.currentTarget && setInputId(null))}>
                                        <Tooltip classes={{ tooltip: classes.customTooltip }} title="the user's display name they chose">
                                            <span className="text-lg underline decoration-dashed" onClick={(e) => (e.target === e.currentTarget && setInputId(null))}>
                                                Is Admin.
                                            </span>
                                        </Tooltip>
                                        <div className={`text-lg mt-[15px] flex items-center h-[30px] w-max p-2 dark:hover:bg-[#18161b] hover:bg-base-100 cursor-pointer rounded-md transition duration-150 ${inputId === "adminPerm" && "hidden"}`}  onClick={() => (setInputId("adminPerm"), setDropDownValue(selectedUser.userData.adminPerm))}>
                                            {
                                                selectedUser.userData.adminPerm
                                                ?
                                                "true"
                                                :
                                                "false"
                                            }
                                        </div>
                                        <div className={` w-max gap-[5px] ${!(dropDownId === "adminPerm") && "items-center"}  ${inputId === "adminPerm" ? `opacity-1 h-max mt-[15px] flex ` : "opacity-0 h-0 mt-0 hidden"} transition-opacity duration-200`}>
                                            <div className={`flex flex-col ${dropDownId === "adminPerm" && "gap-[5px]"} `}>
                                                <div className="min-h-[30px] pl-2 w-[100px] flex items-center cursor-pointer w-[100px] h-max dark:border-2 dark:border-[#302c38] dark:bg-[#18161b] rounded-md bg-base-100" onClick={() => handleDropDownClick("adminPerm")}>
                                                    {
                                                        dropDownValue
                                                        ?
                                                        "true"
                                                        :
                                                        "false"
                                                    }
                                                </div>
                                                <div className={`transition duration-100 bg-base-100 overflow-hidden ${dropDownId === "adminPerm" ? "w-[100px] h-max dark:bg-[#18161b] dark:border-2 dark:border-[#302c38] rounded-md" : "w-0 h-0 overflow-hidden"}`}>
                                                    <button className="w-full h-max p-2 text-left bg-base-100 dark:hover:bg-[#302c38]" onClick={() => setDropDownValue(true)}>
                                                        true
                                                    </button >
                                                    <Divider className={currentTheme === "dark" ? classes.customDividerDark : classes.customDividerLight} />
                                                    <button  className="w-full h-max p-2 text-left bg-base-100 dark:hover:bg-[#302c38]" onClick={() => setDropDownValue(false)}>
                                                        false
                                                    </button >
                                                </div>
                                            </div>
                                            <button className={`w-[30px] h-[30px] bg-base-100 rounded-md flex items-center justify-center transition-opacity duration-200 dark:border-2 dark:border-[#302c38] dark:bg-[#18161b] delay-200 dark:hover:bg-[#302c38] ${inputId === "adminPerm" ? "opacity-1" : "opacity-0"}`} onClick={() => handleChangeUserAttribute_DropDown("adminPerm", selectedUser.userData.userInfo.uid)}>
                                                <FaCheck />
                                            </button>
                                            <div id="spinner" className={`ml-[10px] ${valueLoading ? "opacity-1" : "opacity-0"} border-3 dark:border-t-[#504d57] dark:border-[#2f2d33]`}>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col min-h-[54px]" onClick={(e) => (e.target === e.currentTarget && setInputId(null))}>
                                        <Tooltip classes={{ tooltip: classes.customTooltip }} title="the user's display name they chose">
                                            <span className="text-lg underline decoration-dashed" onClick={(e) => (e.target === e.currentTarget && setInputId(null))}>
                                                Has Published.
                                            </span>
                                        </Tooltip>
                                        <div className={`text-lg mt-[15px] flex items-center h-[30px] w-max p-2 dark:hover:bg-[#18161b] hover:bg-base-100 cursor-pointer rounded-md transition duration-150 ${inputId === "hasPublished" && "hidden"}`}  onClick={() => (setInputId("hasPublished"), setDropDownValue(selectedUser.userData.hasPublished))}>
                                            {
                                                selectedUser.userData.hasPublished
                                                ?
                                                "true"
                                                :
                                                "false"
                                            }
                                        </div>
                                        <div className={` w-max gap-[5px] ${!(dropDownId === "hasPublished") && "items-center"} ${inputId === "hasPublished" ? `opacity-1 h-max mt-[15px] flex ` : "opacity-0 h-0 mt-0 hidden"} transition-opacity duration-200`}>
                                            <div className={`flex flex-col ${dropDownId === "hasPublished" && "gap-[5px]"} `}>
                                                <div className="min-h-[30px] pl-2 w-[100px] flex items-center bg-base-100 cursor-pointer w-[100px] h-max dark:border-2 dark:border-[#302c38] dark:bg-[#18161b] rounded-md" onClick={() => handleDropDownClick("hasPublished")}>
                                                    {
                                                        dropDownValue
                                                        ?
                                                        "true"
                                                        :
                                                        "false"
                                                    }
                                                </div>
                                                <div className={`transition duration-100 bg-base-100 overflow-hidden ${dropDownId === "hasPublished" ? "w-[100px] h-max dark:bg-[#18161b] dark:border-2 dark:border-[#302c38] rounded-md" : "w-0 h-0 overflow-hidden"}`}>
                                                    <button className="w-full h-max p-2 text-left bg-base-100 dark:hover:bg-[#302c38]" onClick={() => setDropDownValue(true)}>
                                                        true
                                                    </button >
                                                    <Divider className={currentTheme === "dark" ? classes.customDividerDark : classes.customDividerLight} />
                                                    <button  className="w-full h-max p-2 text-left bg-base-100 dark:hover:bg-[#302c38]" onClick={() => setDropDownValue(false)}>
                                                        false
                                                    </button >
                                                </div>
                                            </div>
                                            <button className={`w-[30px] h-[30px] bg-base-100 rounded-md flex items-center justify-center transition-opacity  duration-200 dark:border-2 dark:border-[#302c38] dark:bg-[#18161b] delay-200 dark:hover:bg-[#302c38] ${inputId === "hasPublished" ? "opacity-1" : "opacity-0"}`} onClick={() => handleChangeUserAttribute_DropDown("hasPublished", selectedUser.userData.userInfo.uid)}>
                                                <FaCheck />
                                            </button>
                                            <div id="spinner" className={`ml-[10px] ${valueLoading ? "opacity-1" : "opacity-0"} border-3 dark:border-t-[#504d57] dark:border-[#2f2d33]`}>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col min-h-[54px]" onClick={(e) => (e.target === e.currentTarget && setInputId(null))}>
                                        <Tooltip classes={{ tooltip: classes.customTooltip }} title="the user's display name they chose">
                                            <span className="text-lg underline decoration-dashed" onClick={(e) => (e.target === e.currentTarget && setInputId(null))}>
                                                Session Code.
                                            </span>
                                        </Tooltip>
                                        <div className={`text-lg mt-[15px] flex items-center h-[30px] w-max p-2 dark:hover:bg-[#18161b] hover:bg-base-100 cursor-pointer rounded-md transition duration-150 ${inputId === "sessionCode" && "hidden"}`}  onClick={() => (setInputId("sessionCode"), (document.getElementById("sessionCode").value = selectedUser.userData.sessionCode), setTimeout(() => document.getElementById("sessionCode").focus(), 500))}>
                                            {
                                                selectedUser.userData.sessionCode
                                                ?
                                                <>{selectedUser.userData.sessionCode}</>
                                                :
                                                <>Click To Add</>
                                            }
                                        </div>
                                        <div className={`flex w-max  gap-[5px]  overflow-hidden ${inputId === "sessionCode" ? "opacity-1 h-[30px] mt-[15px]" : "opacity-0 h-0 mt-0"} transition-opacity duration-200`}>
                                            <input id="sessionCode" onChange={(e) => setChangeValue(e.target.value)}  className="w-[100px] h-full dark:border-2 dark:border-[#302c38] dark:bg-[#18161b] rounded-md bg-base-100 pl-2"/>
                                            <button className={`w-[30px] h-[30px] bg-base-100 rounded-md flex items-center justify-center transition-opacity duration-200 dark:border-2 dark:border-[#302c38] dark:bg-[#18161b] delay-200 ${inputId === "sessionCode" ? "opacity-1" : "opacity-0"}`} onClick={() => handleChangeUserAttribute("sessionCode", selectedUser.userData.userInfo.uid)}>
                                                <FaCheck />
                                            </button>
                                            <div id="spinner" className={`ml-[10px] ${valueLoading ? "opacity-1" : "opacity-0"} border-3 dark:border-t-[#504d57] dark:border-[#2f2d33]`}>
                                            </div>
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
                {
                    selectedUser.userData
                    &&
                    <div className="w-full max-h-[55px] bg-base-200 dark:bg-[#18161b] rounded-md p-2 flex justify-between items-center">
                        <button className="p-2 rounded hover:bg-base-100-dark w-max rounded-md transition duration-100 hover:text-t-header-dark" onClick={() => setIsDelete(true)}>
                            <FaTrash  className="text-2.5xl text-inherit"/>
                        </button>
                        {
                            isAccountDisabled
                            ?
                            <button className="p-2 rounded hover:bg-base-100-dark w-max rounded-md transition duration-100 hover:text-t-header-dark" onClick={() => handleAccountEnable(selectedUser.userId)}>
                                <FaLock className="text-2.5xl text-inherit"/>
                            </button>
                                
                            :
                            <button className="p-3 rounded hover:bg-base-100-dark w-max rounded-md transition duration-100 hover:text-t-header-dark" onClick={() => handleAccountDisable(selectedUser.userId)}>
                                <FaLockOpen className="text-2.5xl text-inherit"/>
                            </button>
                        }
                    </div>
                }


            </div>
        </div>
    )
}

export default UserPanel;