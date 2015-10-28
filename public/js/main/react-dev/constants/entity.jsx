/**
 * @module Entity
 * @author Rube
 * @date 15/10/25
 * @desc  web data's Entity
 */

export class Group {

    constructor(groupName, groupType, groupKey, groupServerAddress) {
        this.groupName = groupName;
        this.groupType = groupType;
        this.groupKey = groupKey;
        this.groupServerAddress = groupServerAddress;
    }
}

export class Item {

    constructor(itemName, itemType){
        this.itemName = itemName;
        this.itemType = itemType;
    }
}
