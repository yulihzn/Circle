import Player from "../Player";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Item extends cc.Component {

    @property
    itemType:number = 0;
    static readonly TYPE_SHIELD = 0;
    isTaken = false;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }
    taken(player:Player){
        if(this.isTaken){
            return;
        }
        this.isTaken = true;
        this.node.opacity = 0;
        switch(this.itemType){
            case Item.TYPE_SHIELD:
            player.isProtecting = true;
            player.scheduleOnce(()=>{
                if(player){player.isProtecting = false;}
            },5);
            break;
        }
        this.scheduleOnce(()=>{this.destroy()},1);
    }

    // update (dt) {}
}
