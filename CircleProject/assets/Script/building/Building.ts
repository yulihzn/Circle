import Random from "../utils/Random";
import { EventConstant } from "../EventConstant";

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
export default class Building extends cc.Component {
    isBlock = false;
    sprite: cc.Node;
    shadow: cc.Node;
    collider: cc.PhysicsCircleCollider;
    // LIFE-CYCLE CALLBACKS:
    shadowarr:number[] = [-1.1,-1,-0.9,-0.8,-0.7,-0.6,-0.5,-0.4,-0.3,-0.2,-0.1,0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,1.1,1.2];
    shadowopacityarr:number[] = [20,40,60,80,100,120,140,160,180,200,220,240,220,200,180,160,140,120,100,80,60,40,20,0];
    onLoad() {
        cc.director.on(EventConstant.TIME_CHANGE, (event) => { this.changeShadow(event.detail.time) });
        this.sprite = this.node.getChildByName('sprite');
        this.shadow = this.node.getChildByName('shadow');
        this.collider = this.getComponent(cc.PhysicsCircleCollider);
        let colorStr = '#333333'//灰色
        this.isBlock = true;
        this.node.opacity = 255;
        if (Random.getRandomNum(0,100)>80) {
            colorStr = '#C71585'//紫色
            this.node.opacity = 128;
            this.isBlock = false;
        }
        if (Random.getRandomNum(0,100)>80) {
            colorStr = '#579725';//绿色
            this.node.opacity = 128;
            this.isBlock = false;
        }
        this.collider.apply();
        this.sprite.color = cc.color(255, 255, 255).fromHEX(colorStr);
        this.changeShadow(0);
    }
    changeShadow(time: number) {
        this.shadow.scaleX = this.shadowarr[time];
        this.shadow.scaleX +=time<=12?-0.5:0.5;
        this.shadow.opacity = this.shadowopacityarr[time];
    }
    start() {

    }

    // update (dt) {

    // }
}
