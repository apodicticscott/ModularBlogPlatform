import React from 'react'
import  {Link, SubHeader, Header, LargeHeader, XLHeader, NeoButton, NeoInput, LargeParagraph} from "../TextComponents"

const DisplayTextComp = () => {

    const colorMap = [
        { key: 'primary', value: '#fcc800' },
        { key: 'primary-focus', value: '#fad02d' },
        { key: 'primary-content', value: '#000000' },
        { key: 'secondary', value: '#29ff80' },
        { key: 'secondary-focus', value: '#61fa9f' },
        { key: 'secondary-content', value: '#ffffff' },
        { key: 'primary-dark', value: '#29ff80' },
        { key: 'secondary-dark', value: '#5c578d' },
        { key: 'base-100-dark', value: '#1c1a1a' },
        { key: 'accent', value: '#a8c6fe' },
        { key: 'accent-focus', value: '#b18cfe' },
        { key: 'accent-content', value: '#ffffff' },
        { key: 'neutral', value: '#3b424e' },
        { key: 'neutral-focus', value: '#2a2e37' },
        { key: 'neutral-content', value: '#ffffff' },
        { key: 'base-100', value: '#ebebeb' },
        { key: 'base-200', value: '#c0c0c0' },
        { key: 'base-300', value: '#000000' },
        { key: 'base-content', value: '#1e2734' },
        { key: 'info', value: '#1c92f2' },
        { key: 'success', value: '#009485' },
        { key: 'warning', value: '#ff9900' },
        { key: 'error', value: '#ff5724' },
        { key: 'bright-orenge', value: '#fcc800' },
        { key: 'sunset', value: '#f9af7d' },
        { key: 'pale-green', value: '#74be81' },
        { key: 'dark-purple', value: '#836589' },
        { key: 'primary-dark', value: '#29ff80' },
        { key: 'secondary-dark', value: '#5c578d' },
        { key: 'base-100-dark', value: '#1c1a1a' },
        { key: 't-header-light', value: '#1c1b1c' },
        { key: 't-header-dark', value: '#ebebeb' },
        { key: 't-dark', value: '#ebebeb' },
        { key: 't-light', value: '#59595a' }
      ];

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