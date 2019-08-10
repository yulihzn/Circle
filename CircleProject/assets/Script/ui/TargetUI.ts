import GameWorld from "../GameWorld";
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

const {ccclass, property} = cc._decorator;

@ccclass
export default class TargetUI extends cc.Component {

    @property(GameWorld)
    world: GameWorld = null;
    sprite: cc.Sprite;
    star:cc.Sprite;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.sprite = this.node.getChildByName('next').getChildByName('sprite').getComponent(cc.Sprite);
        this.star = this.node.getChildByName('next').getChildByName('sprite').getChildByName('star').getComponent(cc.Sprite);
        cc.director.on(EventConstant.PLAYER_LEVEL_UPDATE, (event) => { this.changeRes();});
    }

    changeRes(){
        if(this.world&&this.world.player){
            let spriteframes:cc.SpriteFrame[] = this.world.player.getNextTargetSpriteframe();
            this.sprite.spriteFrame = spriteframes[0];
            this.star.spriteFrame = spriteframes[1];
        }
    }
    start () {

    }

    // update (dt) {}
}
