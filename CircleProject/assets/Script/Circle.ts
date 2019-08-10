import { EventConstant } from "./EventConstant";
import GameStart from "./ui/GameStart";

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
    isMoving = false;//是否移动中
    sprite: cc.Sprite;
    star:cc.Sprite;
    isDied = false;//是否死亡
    rigidbody: cc.RigidBody;
    speed:number = 100;
    protectingTime = 1;
    isProtecting = false;
    level = 0;
    static readonly MAX_LEVEL = 30;
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
        if (GameStart.isPaused) {
            this.rigidbody.linearVelocity = cc.Vec2.ZERO;
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
        this.rigidbody.linearVelocity = movement;
    }
    start () {

    }
    upgrade(level:number){
        this.level = level;
        this.node.scale = 1+level/10;
        this.speed = Circle.MAX_LEVEL*9-9*level+50;
        this.changeRes(level);
    }
    changeRes(level:number){
        let arr = [null,this.star1,this.star2,this.star3,this.star4];
        if(level<1){
            this.sprite.spriteFrame = this.circle000;
            this.star.spriteFrame = null;
        }else if(level > 0 && level <= 5){
            this.sprite.spriteFrame = this.circle001;
            this.star.spriteFrame = arr[level-1];
        }else if(level > 5 && level <= 10){
            this.sprite.spriteFrame = this.circle002;
            this.star.spriteFrame = arr[level-5];
        }else if(level > 10 && level <= 15){
            this.sprite.spriteFrame = this.circle003;
            this.star.spriteFrame = arr[level-10];
        }else if(level > 15 && level <= 20){
            this.sprite.spriteFrame = this.circle004;
            this.star.spriteFrame = arr[level-15];
        }else if(level > 20 && level <= 25){
            this.sprite.spriteFrame = this.circle005;
            this.star.spriteFrame = arr[level-20];
        }else if(level > 25 && level <= 30){
            this.sprite.spriteFrame = this.circle006;
            this.star.spriteFrame = arr[level-25];
        }else if(level > 30){
            this.sprite.spriteFrame = this.circle007;
            this.star.spriteFrame = null;
        }

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
    transfromScale(level:number,isPlayer?:boolean){
        if(this.isProtecting){
            return;
        }
        this.changeRes(level);
        this.node.runAction(cc.scaleTo(0.2,1+level/10));
        this.isProtecting = true;
        this.scheduleOnce(()=>{
            this.isProtecting = false;
            this.upgrade(level);
            if(isPlayer){
                cc.director.emit(EventConstant.PLAYER_LEVEL_UPDATE,{detail:{level:this.level}});
            }
        },this.protectingTime)
        this.rigidbody.linearVelocity = cc.Vec2.ZERO;
    }
    // update (dt) {}
}
