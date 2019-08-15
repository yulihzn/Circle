import { EventConstant } from "./EventConstant";
import GameUIStart from "./ui/GameUIStart";

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
export default class Circle extends cc.Component {
    anim:cc.Animation;
    isMoving = false;//是否移动中
    sprite: cc.Sprite;
    star:cc.Sprite;
    isDied = false;//是否死亡
    rigidbody: cc.RigidBody;
    speed:number = 100;
    protectingTime = 1;
    level = 0;
    rim:cc.Node;
    static readonly MAX_LEVEL = 31;
    @property(cc.SpriteFrame)
    circle000:cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    circle001:cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    circle002:cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    circle003:cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    circle004:cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    circle005:cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    circle006:cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    circle007:cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    star1:cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    star2:cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    star3:cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    star4:cc.SpriteFrame = null;
    // LIFE-CYCLE CALLBACKS:

    init(level:number){
        this.upgrade(level);
    }
    move(pos: cc.Vec2) {
        if (GameUIStart.isPaused) {
            if(this.rigidbody){
                this.rigidbody.linearVelocity = cc.Vec2.ZERO;
            }
            return;
        }
        let h = pos.x;
        let v = pos.y;
        let absh = Math.abs(h);
        let absv = Math.abs(v);
        this.isMoving = h != 0 || v != 0;
        let mul = absh > absv ? absh : absv;
        mul = mul == 0 ? 1 : mul;
        let movement = cc.v2(h, v);
        let sp = this.speed;
        if (sp < 0) {
            sp = 0;
        }
        movement = movement.mul(sp);
        if(this.rigidbody){
            this.rigidbody.linearVelocity = movement;
        }
    }
    start () {

    }
    upgrade(level:number){
        this.level = level;
        this.node.scale = 1+level/10;
        this.speed = (Circle.MAX_LEVEL-level)*8+200-(Circle.MAX_LEVEL-level)*3;
        this.changeRes(level);
    }
    changeRes(level:number){
        let ss = this.getLevelSpriteframe(this.level);
        this.sprite.spriteFrame = ss[0];
        this.star.spriteFrame = ss[1];
    }
    getLevelSpriteframe(level:number):cc.SpriteFrame[]{
        let arr = [null,this.star1,this.star2,this.star3,this.star4];
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
            spriteframe2 = arr[level-6];
        }else if(level > 10 && level <= 15){
            spriteframe1 = this.circle003;
            spriteframe2 = arr[level-11];
        }else if(level > 15 && level <= 20){
            spriteframe1 = this.circle004;
            spriteframe2 = arr[level-16];
        }else if(level > 20 && level <= 25){
            spriteframe1 = this.circle005;
            spriteframe2 = arr[level-21];
        }else if(level > 25 && level <= 30){
            spriteframe1 = this.circle006;
            spriteframe2 = arr[level-26];
        }else if(level > 30){
            spriteframe1 = this.circle007;
            spriteframe2 = null;
        }
        return [spriteframe1,spriteframe2];
    }
    getCirleRank(level:number){
        if(level<1){
            return 0;
        }else if(level > 0 && level <= 5){
            return 1;
        }else if(level > 5 && level <= 10){
            return 2;
        }else if(level > 10 && level <= 15){
            return 3;
        }else if(level > 15 && level <= 20){
            return 4;
        }else if(level > 20 && level <= 25){
            return 5;
        }else if(level > 25 && level <= 30){
            return 6;
        }else if(level > 30){
            return 7;
        }
    }
    
}
