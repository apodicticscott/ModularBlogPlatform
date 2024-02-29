import React from 'react'
import  {Link, SubHeader, Header, LargeHeader, XLHeader, NeoButton, NeoInput, LargeParagraph} from "../TextComponents"

const DisplayTextComp = () => {

    return(
        <div className='flex flex-col'>
            <div className='flex flex-col'>
                <span>
                    Sub Header
                </span>
                <div className='w-max p-5'>
                    <SubHeader>
                        The Quick Brown Fox
                    </SubHeader>                
                </div>
            </div>
            <div className='flex flex-col'>
                <span>
                    Link
                </span>
                <div className='w-max p-5'>
                    <Link>
                        The Quick Brown Fox
                    </Link>
                </div>
            </div>
            <div className='flex flex-col'>
                <span>
                    Header
                </span>
                <div className='w-max p-5'>
                    <Header>
                        The Quick Brown Fox
                    </Header>
                </div>
            </div>
            <div className='flex flex-col'>
                <span>
                    Large Header 
                </span>
                <div className='w-max p-5'>
                    <LargeHeader>
                        The Quick Brown Fox
                    </LargeHeader>
                </div>
            </div>
            <div className='flex flex-col'>
                <span>
                    XL Header
                </span>
                <div className='w-max p-5'>
                    <XLHeader>
                        The Quick Brown Fox
                    </XLHeader>
                </div>
            </div>
            <div className='flex flex-col'>
                <span>
                    Neo Button
                </span>
                <div className='w-max p-5'>
                    <NeoButton>
                        The Quick Brown Fox
                    </NeoButton>
                </div>
            </div>
            <div className='flex flex-col'>
                <span>
                    Neo Input
                </span>
                <div className='w-max p-5'>
                    <NeoInput>
                        The Quick Brown Fox
                    </NeoInput>
                </div>
            </div>
            <div className='flex flex-col'>
                <span>
                    Large Paragraph
                </span>
                <div className='w-max p-5'>
                    <LargeParagraph>
                        The Quick Brown Fox
                    </LargeParagraph>
                </div>
            </div>
 
        </div>
    )
}

export default DisplayTextComp;