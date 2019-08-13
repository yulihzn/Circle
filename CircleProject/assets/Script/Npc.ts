import Random from "./utils/Random";
import Circle from "./Circle";
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
export default class Npc extends Circle {

    // LIFE-CYCLE CALLBACKS:


    onLoad() {
        this.isDied = false;
        this.rigidbody = this.getComponent(cc.RigidBody);
        this.sprite = this.node.getChildByName('sprite').getComponent(cc.Sprite);
        this.star = this.node.getChildByName('sprite').getChildByName('star').getComponent(cc.Sprite);
        this.move(cc.v2(Random.getHalfChance()?Random.rand():-Random.rand(),Random.getHalfChance()?Random.rand():-Random.rand()));
        cc.director.on(EventConstant.PLAYER_LEVEL_UPDATE, (event) => { this.changeColor(event.detail.level);});
    }

    timeDelay = 0;
    rate = 3;
    isTimeDelay(dt: number): boolean {
        this.timeDelay += dt;
        if (this.timeDelay > this.rate) {
            this.rate = Random.getRandomNum(1,6);
            this.timeDelay = 0;
            return true;
        }
        return false;
    }
    changeColor(level:number){
        let rank = this.getCirleRank(this.level);
        let playerrank = this.getCirleRank(level);
        if(Math.abs(playerrank-rank)>=3){
            this.sprite.node.color = cc.color(40,40,40);
        }else{
            this.sprite.node.color = cc.color(255,255,255);
        }
    }
    
    update(dt:number) {
        if(this.isTimeDelay(dt)){
            this.move(cc.v2(Random.getHalfChance()?Random.rand():-Random.rand(),Random.getHalfChance()?Random.rand():-Random.rand()));
        }
    }
}
