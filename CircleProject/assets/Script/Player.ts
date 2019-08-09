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

@ccclass
export default class Player extends cc.Component {
    static readonly STATE_IDLE = 0;
    static readonly STATE_WALK = 1;
    static readonly STATE_ATTACK = 3;
    static readonly STATE_DIE = 4;
    isMoving = false;//是否移动中
    private sprite: cc.Node;
    isDied = false;//是否死亡
    rigidbody: cc.RigidBody;
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        cc.director.on(EventConstant.PLAYER_MOVE
            , (event) => { this.move(event.detail.pos) });
        this.isDied = false;
        this.rigidbody = this.getComponent(cc.RigidBody);
        this.sprite = this.node.getChildByName('sprite');
    }

    move(pos: cc.Vec2) {
        if (this.isDied) {
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
        let speed = 200;
        if (speed < 0) {
            speed = 0;
        }
        movement = movement.mul(speed);
        this.rigidbody.linearVelocity = movement;
    }

    start() {
        if (!this.node) {
            return;
        }
    }

    takeDamage(damage: number): boolean {
        return true;
    }

    killed() {
        if (this.isDied) {
            return;
        }
        this.isDied = true;
    }

    update(dt) {
        
    }



}