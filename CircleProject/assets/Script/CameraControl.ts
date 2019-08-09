import GameWorld from "./GameWorld";

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class CameraControl extends cc.Component {

    @property(GameWorld)
    world: GameWorld = null;

    camera:cc.Camera;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.camera = this.getComponent(cc.Camera);
    }
    onEnable(){
    }
    onDisable(){
    }

    start () {

    }
    lateUpdate(){
        if(this.world&&this.world.player){
            let targetPos = this.world.player.node.convertToWorldSpaceAR(cc.Vec2.ZERO);
            this.node.position = this.lerp(this.node.position,this.node.parent.convertToNodeSpaceAR(targetPos),0.1)
        }
    }
    lerp(self:cc.Vec2,to:cc.Vec2, ratio:number):cc.Vec2 {
        let out = cc.v2(0,0);
        let x = self.x;
        let y = self.y;
        out.x = x + (to.x - x) * ratio;
        out.y = y + (to.y - y) * ratio;
        return out;
    }
    // update (dt) {}
}
