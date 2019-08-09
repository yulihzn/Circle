import Player from "./Player";
import { EventConstant } from "./EventConstant";
import Npc from "./Npc";
import Random from "./utils/Random";
import Building from "./building/Building";

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
@ccclass
export default class GameWorld extends cc.Component {

    @property(cc.Prefab)
    playerPrefab: cc.Prefab = null;
    @property(cc.Prefab)
    npcPrefab: cc.Prefab = null;
    @property(cc.Prefab)
    buildingPrefab: cc.Prefab = null;
    private timeDelay = 0;
    private checkTimeDelay = 0;

    player: Player = null;
    npcList:Npc[] = [];
    shadow: cc.Node;
    shadowarr:number[] = [110,100,90,80,70,60,50,40,30,20,10,0,10,20,30,40,50,60,70,80,90,100,110,120];
    onLoad() {
        //关闭调试
        // cc.director.setDisplayStats(false);
        // cc.game.setFrameRate(60);
        // cc.game.addPersistRootNode(this.node);
        // cc.view.enableAntiAlias(false);
        // cc.macro.DOWNLOAD_MAX_CONCURRENT = 10;
        // let manager = cc.director.getCollisionManager();
        // manager.enabled = true;
        cc.director.getPhysicsManager().enabled = true;
        // manager.enabledDebugDraw = true;
        //     cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
        // cc.PhysicsManager.DrawBits.e_pairBit |
        // cc.PhysicsManager.DrawBits.e_centerOfMassBit |
        // cc.PhysicsManager.DrawBits.e_jointBit |
        // cc.PhysicsManager.DrawBits.e_shapeBit
        ;
        cc.director.on(EventConstant.TIME_CHANGE, (event) => { this.changeShadow(event.detail.time) });
        this.shadow = this.node.getChildByName('shadow');
        this.shadow.zIndex = 8000;
        this.player = cc.instantiate(this.playerPrefab).getComponent(Player);
        this.player.node.parent = this.node;
        this.player.node.position = cc.v2(0,0);
        this.player.node.zIndex = 2000;
        let width = 1600;
        for(let i = 0;i < 100;i++){
            this.addNpc(cc.v2(Random.getRandomNum(-width+100,width-100),Random.getRandomNum(-width+100,width-100)));
        }
        for(let i = 0;i < 100;i++){
            this.addBuilding(cc.v2(Random.getRandomNum(-width,width),Random.getRandomNum(-width,width)),Random.getRandomNum(1,3)+Random.rand());
        }
    }
    
    changeShadow(time: number) {
        this.shadow.opacity = this.shadowarr[time];
    }
    
    addNpc(pos:cc.Vec2){
        let npc = cc.instantiate(this.npcPrefab).getComponent(Npc);
        npc.node.parent = this.node;
        npc.node.position = pos;
        npc.node.zIndex = 1000;
        this.npcList.push(npc);
    }
    addBuilding(pos:cc.Vec2,scale:number){
        let building = cc.instantiate(this.buildingPrefab).getComponent(Building);
        building.node.parent = this.node;
        building.node.position = pos;
        building.node.zIndex = 3000;
        building.node.scale = scale;
    }
    
    start() {
    }
  
    lerp(self: cc.Vec2, to: cc.Vec2, ratio: number): cc.Vec2 {
        let out = cc.v2(0, 0);
        let x = self.x;
        let y = self.y;
        out.x = x + (to.x - x) * ratio;
        out.y = y + (to.y - y) * ratio;
        return out;
    }
    
    isTimeDelay(dt: number): boolean {
        this.timeDelay += dt;
        if (this.timeDelay > 0.016) {
            this.timeDelay = 0;
            return true;
        }
        return false;
    }
    isCheckTimeDelay(dt: number): boolean {
        this.checkTimeDelay += dt;
        if (this.checkTimeDelay > 1) {
            this.checkTimeDelay = 0;
            return true;
        }
        return false;
    }

    update(dt) {

    }
}
