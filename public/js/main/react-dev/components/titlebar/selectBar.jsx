/**
 * @module
 * @author Rube
 * @date 15/10/26
 * @desc
 */
import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as
language
from
'../../constants/language'
import * as
actions
from
'../../actions/group'

class SelectBarList extends React.Component {
    render() {
        let {groups, chooseGroup} = this.props;
        return (
            <ul className="grouplist">
            {
                groups.map((group, index)=> {
                    return (
                        <li key={index} onClick={chooseGroup}>{group.groupName}</li>
                    );
                })
                }
            </ul>
        );
    }
}

class SelectBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            zoneDisplay: false
        };
        this.showSelectList = this.showSelectList.bind(this);
        this.chooseGroup = this.chooseGroup.bind(this);
    }

    render() {
        let {groups} = this.props;
        let {groupSelected} = this.props;
        return (
            <div className='selectbar'>
                <span className='selectedname'>{groupSelected ? groupSelected : language.G_NO_SELECTED}</span>
            {()=> {
                if (this.state.zoneDisplay && groups.length != 0) {
                    return (
                        <div>
                            <div className="triangle triangleup" onClick={this.showSelectList}></div>
                            <SelectBarList chooseGroup = {this.chooseGroup} groups={groups}/>
                        </div>
                    );
                } else {
                    return (
                        <div className="triangle triangledown" onClick={this.showSelectList}></div>
                    );
                }
            }()}
            </div>
        );
    }

    componentDidMount() {
        let {findAllGroup} = this.props;
        findAllGroup('ALL');
    }

    showSelectList() {
        this.setState({zoneDisplay: !this.state.zoneDisplay});
    }

    chooseGroup(e) {
        let groupName = e.target.innerText;
        let {selectGroup, groups} = this.props;
        for (let i = 0; i < groups.length; i++) {
            if (groups[i].groupName == groupName) {
                selectGroup(groups[i].groupKey);
                break;
            }
        }
    }
}

let stateToProps = state => {
    let groupSelected = state.groups.filter(group=> {
        if (group.groupKey == state.choose.groupSelected) {
            return true;
        }
    });

    groupSelected = groupSelected.length === 0 ? null : groupSelected[0].groupName
    return {
        groups: state.groups,
        groupSelected
    };
};

let dispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(stateToProps, dispatchToProps)(SelectBar);
