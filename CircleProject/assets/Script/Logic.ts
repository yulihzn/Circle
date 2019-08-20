// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class Logic extends cc.Component {

    //图片资源
    static spriteFrames: { [key: string]: cc.SpriteFrame } = null;
    static gameLevel = 0;
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        cc.game.setFrameRate(60);
        cc.game.addPersistRootNode(this.node);
        cc.view.enableAntiAlias(false);
    }

    start() {

    }

    // update (dt) {}
}
