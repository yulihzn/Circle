import Circle from "../Circle";
import Random from "../utils/Random";
import GameUIStart from "../ui/GameUIStart";
import GameWorld from "../GameWorld";

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
export default class Ghost extends cc.Component{

    anim:cc.Animation;
    isMoving = false;//是否移动中
    sprite: cc.Sprite;
    rigidbody: cc.RigidBody;
    readonly DEFAULT_SPEED = 500;
    speed:number = 500;
    gameWorld:GameWorld;

    onLoad() {
        this.rigidbody = this.getComponent(cc.RigidBody);
        this.sprite = this.node.getChildByName('sprite').getComponent(cc.Sprite);
        this.move(cc.v3(Random.getHalfChance()?Random.rand():-Random.rand(),Random.getHalfChance()?Random.rand():-Random.rand()));
    }
    move(pos: cc.Vec3) {
        if (GameUIStart.isPaused) {
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
    timeDelay = 0;
    isTimeDelay(dt: number): boolean {
        this.timeDelay += dt;
        if (this.timeDelay > 3) {
            this.timeDelay = 0;
            return true;
        }
        return false;
    }
    
    update(dt:number) {
        if(this.isTimeDelay(dt)&&this.gameWorld&&this.gameWorld.player){
            this.speed = this.gameWorld.player.level*10 + this.DEFAULT_SPEED;
            let pos = this.gameWorld.player.node.position.subSelf(this.node.position);
            this.move(pos.normalizeSelf());
        }
    }
}
