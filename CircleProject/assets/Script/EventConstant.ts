
const {ccclass, property} = cc._decorator;
@ccclass
export class EventConstant extends cc.Component{
    public static readonly PLAYER_MOVE = 'PLAYER_MOVE';
    public static readonly TIME_CHANGE = 'TIME_CHANGE';
    public static eventHandler:cc.Node = new cc.Node();
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    // start () {

    // }

    // update (dt) {}
}
