import { EventConstant } from "./EventConstant";

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
export default class GameTimer extends cc.Component {

    seconds = 0;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }
    timeDelay = 0;
    isTimeDelay(dt: number): boolean {
        this.timeDelay += dt;
        if (this.timeDelay > 1) {
            this.timeDelay = 0;
            return true;
        }
        return false;
    }
    update (dt) {
        if(this.isTimeDelay(dt)){
            this.seconds++;
            if(this.seconds > 23){
                this.seconds = 0;
            }
            cc.director.emit(EventConstant.TIME_CHANGE,{detail:{time:this.seconds}})
        }
    }
}
