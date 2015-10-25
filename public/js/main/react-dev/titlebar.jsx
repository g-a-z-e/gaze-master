/**
 * @module titleBar
 * @author Rube
 * @date 15/9/21
 * @desc title component include logo,search,group choose-btn,group create-btn
 */

import React from 'react';
import CreateBar from './components/titlebar/createBar';
import SelectBar from './components/titlebar/selectBar';

class SearchBar extends React.Component {
    render() {
        return (
            <div className='searchbar'>
                <div className='search-zone'>
                    <input placeholder="search" className='search-block'/>
                    <span className='search-icon fonticon'></span>
                </div>
            </div>
        );
    }
}

class InfoBar extends React.Component {
    render() {
        return (
            <div className='infobar'>
                <span className='setting-icon fonticon'></span>
                <span className='profile-icon fonticon'></span>
            </div>
        );
    }
}

class TitleBar extends React.Component {
    render() {
        return (
            <div className='titlebar'>
                <div className='logobar'>
                    <img src='images/gaze-logo.png'/>
                </div>
                <SearchBar/>
                <CreateBar/>
                <InfoBar/>
                <SelectBar/>
            </div>
        );
    }
}

export default TitleBar;