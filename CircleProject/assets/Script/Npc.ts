import Random from "./utils/Random";

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
export default class Npc extends cc.Component {

    isMoving = false;//是否移动中
    private sprite: cc.Node;
    isDied = false;//是否死亡
    rigidbody: cc.RigidBody;
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.isDied = false;
        this.rigidbody = this.getComponent(cc.RigidBody);
        this.sprite = this.node.getChildByName('sprite');
        this.move(cc.v2(Random.getHalfChance()?Random.rand():-Random.rand(),Random.getHalfChance()?Random.rand():-Random.rand()));
    }

    move(pos: cc.Vec2) {
        if (this.isDied) {
            return;
        }
        let h = pos.x;
        let v = pos.y;
        let absh = Math.abs(h);
        let absv = Math.abs(v);

        let mul = absh > absv ? absh : absv;
        mul = mul == 0 ? 1 : mul;
        let movement = cc.v2(h, v);
        let speed = 100;
        if (speed < 0) {
            speed = 0;
        }
        movement = movement.mul(speed);
        this.rigidbody.linearVelocity = movement;
        this.isMoving = h != 0 || v != 0;
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
    update(dt) {
        if(this.isTimeDelay(dt)){
            this.move(cc.v2(Random.getHalfChance()?Random.rand():-Random.rand(),Random.getHalfChance()?Random.rand():-Random.rand()));
        }
    }
}
