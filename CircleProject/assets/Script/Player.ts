// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;
import { EventConstant } from './EventConstant';
import Npc from './Npc';
import Circle from './Circle';
import GameStart from './ui/GameStart';

@ccclass
export default class Player extends Circle {
    isUpgraded = false;
    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        this.isDied = false;
        this.rigidbody = this.getComponent(cc.RigidBody);
        this.sprite = this.node.getChildByName('sprite').getComponent(cc.Sprite);
        this.star = this.node.getChildByName('sprite').getChildByName('star').getComponent(cc.Sprite);
        cc.director.on(EventConstant.PLAYER_MOVE
            , (event) => { this.move(event.detail.pos) });
    }

    update(dt) {
        
    }
    getNextTargetSpriteframe():cc.SpriteFrame[]{
        let arr = [null,this.star1,this.star2,this.star3,this.star4];
        let level = this.level+1;
       
        let spriteframe1 = null;
        let spriteframe2 = null;
        if(level<1){
            spriteframe1 = this.circle000;
            spriteframe2 = null;
        }else if(level > 0 && level <= 5){
            spriteframe1 = this.circle001;
            spriteframe2 = arr[level-1];
        }else if(level > 5 && level <= 10){
            spriteframe1 = this.circle002;
            spriteframe2 = arr[level-5];
        }else if(level > 10 && level <= 15){
            spriteframe1 = this.circle003;
            spriteframe2 = arr[level-10];
        }else if(level > 15 && level <= 20){
            spriteframe1 = this.circle004;
            spriteframe2 = arr[level-15];
        }else if(level > 20 && level <= 25){
            spriteframe1 = this.circle005;
            spriteframe2 = arr[level-20];
        }else if(level > 25 && level <= 30){
            spriteframe1 = this.circle006;
            spriteframe2 = arr[level-25];
        }else if(level > 30){
            spriteframe1 = this.circle007;
            spriteframe2 = null;
        }
        return [spriteframe1,spriteframe2];
    }
    /** 比现在高二级以上 且在2个范围以上 比现在低  */
    checkBadLevelValid(npclevel){
        let offset = npclevel-this.level;
        let rank = this.getCirleRank(this.level);
        let npcrank = this.getCirleRank(npclevel);
        if(Math.abs(npcrank-rank)>3){
            return false;
        }
        if(offset>1||offset<0){
            return true;
        }
        return false;
    }
    
    /** 比现在高一级 */
    checkGoodLevelValid(level){
        return level-this.level==1;
    }
    onBeginContact(contact, selfCollider: cc.PhysicsCollider, otherCollider: cc.PhysicsCollider) {
        if(GameStart.isPaused||this.level == Circle.MAX_LEVEL){
            return;
        }
        let npc = otherCollider.node.getComponent(Npc);
        if(npc&&!this.isProtecting&&!npc.isProtecting){
            if(this.checkGoodLevelValid(npc.level)){
                this.transfromScale(npc.level,true);
                if(npc.level==1){
                    this.isUpgraded = true;
                }
                if(npc.level==Circle.MAX_LEVEL){
                    cc.director.emit(EventConstant.GAME_FINISHED);
                }
            }else if(this.checkBadLevelValid(npc.level)){
                //比现在大
                if(this.level>0){
                    this.transfromScale(this.level-1,true);
                    if(this.isUpgraded&&this.level-1==0){
                        cc.director.emit(EventConstant.GAME_OVER);
                    }
                    
                }
            }
        }
    }


}