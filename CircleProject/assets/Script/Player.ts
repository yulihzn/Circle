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
import AudioPlayer from './utils/AudioPlayer';
import Building from './building/Building';
import Item from './item/Item';

@ccclass
export default class Player extends Circle {
    isUpgraded = false;
    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        this.isDied = false;
        this.rigidbody = this.getComponent(cc.RigidBody);
        this.anim = this.getComponent(cc.Animation);
        this.sprite = this.node.getChildByName('sprite').getComponent(cc.Sprite);
        this.rim = this.node.getChildByName('sprite').getChildByName('rim');
        this.star = this.node.getChildByName('sprite').getChildByName('star').getComponent(cc.Sprite);
        cc.director.on(EventConstant.PLAYER_MOVE
            , (event) => { this.move(event.detail.pos) });
    }

    update(dt) {
        if(this.rim){
            this.rim.opacity = this.isProtecting?200:0;
        }
    }
   
    /** 比现在高3级以上 且在3个范围以上 比现在低  */
    checkBadLevelValid(npclevel){
        let offset = npclevel-this.level;
        let rank = this.getCirleRank(this.level);
        let npcrank = this.getCirleRank(npclevel);
        if(Math.abs(npcrank-rank)>=3){
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

    onBeginContact(contact:cc.PhysicsContact, selfCollider: cc.PhysicsCollider, otherCollider: cc.PhysicsCollider) {
        if(GameStart.isPaused){
            return;
        }
        if(this.level == Circle.MAX_LEVEL){
            cc.director.emit(EventConstant.GAME_FINISHED);
            return;
        }
        let building = otherCollider.getComponent(Building);
        if(building&&!building.isBlock){
            contact.disabled = true;
        }

        let item = otherCollider.getComponent(Item);
        if(item){
            item.taken(this);
        }

        let npc = otherCollider.node.getComponent(Npc);
        if(npc&&!this.isProtecting&&!npc.isProtecting){
            if(this.checkGoodLevelValid(npc.level)){
                this.transfromScale(npc.level,true);
                cc.director.emit(EventConstant.PLAY_AUDIO,{detail:{name:AudioPlayer.PLAYER_UPGRADE}});
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
                    cc.director.emit(EventConstant.PLAY_AUDIO,{detail:{name:AudioPlayer.PLAYER_HIT}});
                    if(this.isUpgraded&&this.level-1==0){
                        this.isUpgraded = false;
                        this.init(0);
                        cc.director.emit(EventConstant.GAME_OVER);
                        cc.director.emit(EventConstant.PLAY_AUDIO,{detail:{name:AudioPlayer.GAME_OVER}});
                    }
                    
                }
            }
        }
    }
    


}