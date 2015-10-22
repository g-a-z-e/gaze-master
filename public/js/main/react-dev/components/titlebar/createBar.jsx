/**
 * @module
 * @author Rube
 * @date 15/10/26
 * @desc
 */
import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {TIMEOUT} from '../../constants/index'
import * as
language
from
'../../constants/language'
import * as
actions
from
'../../actions/group'

class CreateBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            zoneDisplay: false,
            btnWord: 0,
            selectItem: null,
            groupName: '',
            createBtnInfo: language.G_CREATE
        };
        this.showWindow = this.showWindow.bind(this);
        this.createGroup = this.createGroup.bind(this);
        this.inputGroupName = this.inputGroupName.bind(this);
        this.selectType = this.selectType.bind(this);
    }

    render() {
        let btnWordIndex = this.state.btnWord;
        let items = this.props.selectItem.map((item, index)=> {
                if (this.state.selectItem == item) {
                    return (
                        <span key={index} className="active">{item}</span>
                    )
                } else {
                    return (
                        <span key={index}>{item}</span>
                    )
                }
            }
        );
        return (
            <div className='createbar'>
                <button className='create-btn' onClick={this.showWindow}>{this.props.btnWord[btnWordIndex]}</button>
            {()=> {
                if (this.state.zoneDisplay) {
                    return (
                        <div className='create-zone'>
                            <input className='name-block' placeholder="group name" value={this.state.groupName} onChange={this.inputGroupName}/>
                            <h4>group type</h4>
                            <p className='line'></p>
                            <div className='triangle'></div>
                            <div className='select-block' onClick={this.selectType}>
                             {items}
                            </div>
                            <button className='select-btn' onClick={this.createGroup}>{this.state.createBtnInfo}</button>
                        </div>
                    );
                }
            }()
                }
            </div>
        );
    }

    showWindow() {
        this.setState({
            zoneDisplay: !this.state.zoneDisplay,
            btnWord: Math.abs(this.state.btnWord - 1)
        })
    }

    selectType(e) {
        const type = e.target.innerText;
        (this.props.selectItem.indexOf(type) != -1) && this.setState({selectItem: type});
    }

    inputGroupName(e) {
        const groupName = e.target.value;
        this.setState({groupName});
    }

    createGroup() {
        let {addGroup} = this.props;
        let groupName = this.state.groupName.trim();
        let {selectItem, createBtnInfo} = this.state;

        const SUCCESS_STATE = {
            createBtnInfo: language.G_CREATE_SUCCESS,
            selectItem: null,
            groupName: ''
        };
        const LOADING_STATE = {createBtnInfo: '...'};
        const ERROR_STATE = {createBtnInfo: language.G_CREATE_ERROR};
        const CREATE_STATE = {createBtnInfo: language.G_CREATE};

        if (groupName && selectItem && createBtnInfo == language.G_CREATE) {
            this.setState(LOADING_STATE);
            addGroup(groupName, selectItem, ()=> {
                this.setState(SUCCESS_STATE);
                setTimeout(()=> {
                    this.setState(CREATE_STATE);
                }, TIMEOUT);
            }, ()=> {
                this.setState(ERROR_STATE);
                setTimeout(()=> {
                    this.setState(CREATE_STATE);
                }, TIMEOUT);
            });
        } else {
            //TODO:view warning
        }
    }
}

CreateBar.defaultProps = {
    btnWord: ['New Group', 'Close Window'],
    selectItem: ['Web', 'Server', 'Android', 'IOS', 'Node', 'Linux', 'Wap']
};

let dispatchToProps = dispatch => bindActionCreators(actions, dispatch);
let stateToProps = state => {
    return {}
};

export default connect(stateToProps, dispatchToProps)(CreateBar);