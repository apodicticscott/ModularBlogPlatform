'use client'
import React, {useState} from "react";
import { Divider } from "@material-ui/core";
import Header from "../TextComponents/Header1";
import { Tooltip } from "@material-ui/core";

const UserPanel = ({users, classes}) => {

    const [selectedUser, setSelectedUser] = useState({userId: null, userName: null, userData: null})

    return(
        <div className="grid grid-rows-2 grid-cols-2 h-full w-full justify-between p-7 gap-7 dark:font-extralight">
            <div className="flex flex-col justify-between gap-[25px] col-span-1 row-span-2 rounded-md border-3 p-7 pb-0 text-lg w-full dark:bg-base-100-dark">
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
                        <div className="flex w-full h-full max-h-[450px] xl:min-h-0 sm:h-auto sm:grow flex flex-col text-lg  rounded-t-md  border-3 border-b-0 bg-base-200 dark:bg-secondary-dark overflow-y-scroll scrollbar-hide">
                            {
                                users
                                ?
                                users.map((user, index) => (
                                    <div key={index} className={`flex justify-between w-full h-max bg-base-100 dark:bg-[#353335] items-center shadow ${selectedUser.userId === user.userInfo.uid && "bg-base-200 dark:bg-secondary-dark"} ${index === 0 && "rounded-t-md"} ${index !== (users.length - 1) && "border-b-3"}`} onClick={() => setSelectedUser({userId: user.userInfo.uid, userName: user.firstName + " " + user.lastName, userData: user})}>
                                        <div className="flex grow md:basis-[200px] py-[15px] 2xl:py-0 pl-[10px] min-h-[50px] items-center">
                                            {user.firstName}
                                        </div>
                                        <Divider orientation="vertical"/>
                                        <div className="hidden md:flex basis-[200px] py-[15px] 2xl:py-0 pl-[10px] min-h-[50px] items-center">
                                            {user.lastName}
                                        </div>
                                        <Divider orientation="vertical"/>
                                        <div className="hidden md:flex basis-[200px] py-[15px] 2xl:py-0 pl-[10px] items-center min-h-[50px]">
                                            {user.sessionCode}
                                        </div>
                                        <Divider orientation="vertical"/>
                                        <div className={`hidden md:flex basis-[200px] 2xl:grow pl-[10px] py-[15px] items-center`}>
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
            <div className="flex flex-col gap-[25px] col-span-1 row-span-2 rounded-md border-3 w-full p-7 text-lg dark:bg-base-100-dark">
                <Header type="sm">
                    User Info.
                </Header>
                {
                    !selectedUser.userData
                    &&
                    "Oops! It looks like no user has been selected."

                }
                <div className="flex gap-[25px] w-full">
                    {
                        selectedUser.userData
                        ?
                        <>
                            <div className="flex flex-col w-[50%]  h-full gap-[25px]">
                                <div className="flex flex-col gap-[15px]">
                                        <span className="text-lg underline decoration-dashed">
                                            First Name.
                                        </span>
                                        <span className="text-lg">
                                            {selectedUser.userData.firstName}
                                        </span>
                                </div>
                                <div className="flex flex-col gap-[15px]">
                                    <Tooltip classes={{ tooltip: classes.customTooltip }} title="the user's last name">
                                        <span className="text-lg underline decoration-dashed">
                                            Last Name.
                                        </span>
                                    </Tooltip>
                                    <span className="text-lg">
                                        {selectedUser.userData.lastName}
                                    </span>
                                    
                                </div>
                                <div className="flex flex-col gap-[15px]">
                                    <Tooltip classes={{ tooltip: classes.customTooltip }} title="the user's display name they chose">
                                        <span className="text-lg underline decoration-dashed">
                                            Display Name.
                                        </span>
                                    </Tooltip>
                                    <span className="text-lg">
                                        {selectedUser.userData.userInfo.displayName}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-[15px]">
                                    <Tooltip classes={{ tooltip: classes.customTooltip }} title="the user's email they registered with">
                                        <span className="text-lg underline decoration-dashed">
                                            Email.
                                        </span>
                                    </Tooltip>
                                    <span className="text-lg">
                                        {selectedUser.userData.userInfo.email}
                                    </span>
                                    
                                </div>
                            </div>
                            <div className="flex flex-col w-[50%] h-full gap-[25px]">
                                <div className="flex flex-col gap-[15px]">
                                    <Tooltip classes={{ tooltip: classes.customTooltip }} title="Whether the user is a student writer">
                                        <span className="text-lg underline decoration-dashed">
                                            Student Writer.
                                        </span>
                                    </Tooltip>
                                    <span className="text-lg">
                                        {
                                        selectedUser.userData.studentWriter
                                        ?
                                        "true"
                                        :
                                        "false"
                                        }
                                    </span>
                                </div>
                                <div className="flex flex-col gap-[15px]">
                                    <Tooltip classes={{ tooltip: classes.customTooltip }} title="the user's session code that they registered with">
                                        <span className="text-lg underline decoration-dashed">
                                            Session Code.
                                        </span>
                                    </Tooltip>
                                    <span className="text-lg">
                                        {selectedUser.userData.sessionCode}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-[15px]">
                                    <Tooltip classes={{ tooltip: classes.customTooltip }} title="whether the user has published an article or not">
                                        <span className="text-lg underline decoration-dashed">
                                            Has Published.
                                        </span>
                                    </Tooltip>
                                    <span className="text-lg">
                                        {
                                        selectedUser.userData.hasPublished
                                        ?
                                        "true"
                                        :
                                        "false"
                                        }
                                    </span>
                                </div>
                                <div className="flex flex-col gap-[15px]">
                                    <Tooltip classes={{ tooltip: classes.customTooltip }} title="Whether this user is an admin account or not.">
                                        <span className="text-lg underline decoration-dashed">
                                            Is Admin
                                        </span>
                                    </Tooltip>
                                    <span className="text-lg">
                                        {
                                        selectedUser.userData.adminPerm
                                        ?
                                        "true"
                                        :
                                        "false"
                                        }
                                    </span>
                                </div>
                                <div className="flex flex-col gap-[15px]">
                                    <Tooltip classes={{ tooltip: classes.customTooltip }} title="The user's unique id.">
                                        <span className="text-lg underline decoration-dashed">
                                            User ID
                                        </span>
                                    </Tooltip>
                                        <span className="text-lg">
                                            {selectedUser.userData.userInfo.uid}
                                        </span>
                                   
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