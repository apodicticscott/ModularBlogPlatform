import React from "react";
import Header from "../../components/TextComponents/Header1"
import TextEditor from "../../components/textEditor/TextEditor";


const Testing = () => {

    return(
        <>
            <div className="w-full h-[1500px] dark:bg-base-100-dark pt-[100px]">

                <Header type="xl">
                    Text Components
                </Header>
                <div className="p-[20px]">
                    <Header type="sm">
                        Small Header
                    </Header>
                    <Header type="md">
                        Medium Header
                    </Header>
                    <Header type="lg">
                        Large Header
                    </Header>
                    <Header  editable={true} type="xl">
                        Extra Large Header
                    </Header>
                </div>

                <Header type="xl">
                    Text Editor
                </Header>
                <TextEditor />
            </div>
        </>
    )

}

export default Testing;