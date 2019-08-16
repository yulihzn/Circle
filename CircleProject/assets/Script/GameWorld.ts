import Player from "./Player";
import { EventConstant } from "./EventConstant";
import Random from "./utils/Random";
import Building from "./building/Building";
import Circle from "./Circle";
import Item from "./item/Item";
import Npc from "./npc/Npc";
import FlyThief from "./npc/FlyThief";
import Logic from "./Logic";
import Ghost from "./npc/Ghost";

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
    @property(cc.Prefab)
    shieldPrefab:cc.Prefab = null;
    @property(cc.Prefab)
    flythiefPrefab: cc.Prefab = null;
    @property(cc.Prefab)
    ghostPrefab: cc.Prefab = null;
    private timeDelay = 0;
    private checkTimeDelay = 0;
    actorLayer:cc.Node;

    player: Player = null;
    npcList:Npc[] = [];
    shadow: cc.Node;
    shadowarr:number[] = [110,100,90,80,70,60,50,40,30,20,10,0,10,20,30,40,50,60,70,80,90,100,110,120];
    colorarr:number[] = [233,235,237,239,241,243,245,247,249,251,253,255,253,251,249,247,245,243,241,239,237,235,233,231];
    spritebasebg:cc.Node;
    spritebg:cc.Node;
    spritewalltop:cc.Node;
    spritewallbottom:cc.Node;
    spritewallleft:cc.Node;
    spritewallright:cc.Node;
    
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
        this.spritebasebg = this.node.getChildByName('basebg');
        this.spritebg = this.node.getChildByName('background');
        this.spritewalltop = this.node.getChildByName('background').getChildByName('airwalltop').getChildByName('sprite');
        this.spritewallbottom = this.node.getChildByName('background').getChildByName('airwallbottom').getChildByName('sprite');
        this.spritewallleft = this.node.getChildByName('background').getChildByName('airwallleft').getChildByName('sprite');
        this.spritewallright = this.node.getChildByName('background').getChildByName('airwallright').getChildByName('sprite');
        this.shadow = this.node.getChildByName('shadow');
        this.actorLayer = this.node.getChildByName('actorlayer');
        this.actorLayer.zIndex = 2000;
        this.shadow.zIndex = 8000;
        this.player = cc.instantiate(this.playerPrefab).getComponent(Player);
        this.player.node.parent = this.node;
        this.player.node.zIndex = 3000;
        this.init();
    }
    init(){
        this.actorLayer.removeAllChildren();
        this.scheduleOnce(()=>{this.player.node.setPosition(cc.v2(0,0));},0.1);
        this.player.init(0);
        this.scheduleOnce(()=>{
            cc.director.emit(EventConstant.PLAYER_LEVEL_UPDATE,{detail:{level:this.player.level}});
        },0.1);
        
        let width = 1600;
        for(let i = 0;i < 100;i++){
            this.addBuilding(cc.v2(Random.getRandomNum(-width,width),Random.getRandomNum(-width,width)),Random.getRandomNum(1,6)+Random.rand());
        }
        this.scheduleOnce(()=>{this.delayAddNpcs();},0.2);
        for(let i = 0;i < 20;i++){
            this.addItem(cc.v2(Random.getRandomNum(-width,width),Random.getRandomNum(-width,width)),Item.TYPE_SHIELD);
        }
        if(Logic.gameLevel == 1){
            this.addFlyThief(cc.v2(Random.getRandomNum(-width,width),Random.getRandomNum(-width,width)));
            this.addGhost(cc.v2(Random.getRandomNum(-width,width),Random.getRandomNum(-width,width)));
            this.addGhost(cc.v2(Random.getRandomNum(-width,width),Random.getRandomNum(-width,width)));
        }
    }
    delayAddNpcs(){
        let width = 1600;
        let range = cc.v2(0,Circle.MAX_LEVEL);
        for(let i = 0;i < 300;i++){
            this.addNpc(cc.v2(Random.getRandomNum(-width+100,width-100),Random.getRandomNum(-width+100,width-100)),Random.getRandomNum(range.x,range.y));
        }
        for(let i = 0;i < Circle.MAX_LEVEL+1;i++){
            this.addNpc(cc.v2(Random.getRandomNum(-width+100,width-100),Random.getRandomNum(-width+100,width-100)),i);
        }
        
    }
    
    changeShadow(time: number) {
        // this.shadow.opacity = this.shadowarr[time];
        this.shadow.opacity = 0;
        this.spritebasebg.color=cc.color(this.colorarr[time],this.colorarr[time],this.colorarr[time]);
        this.spritebg.color=cc.color(this.colorarr[time],this.colorarr[time],this.colorarr[time]);
        this.spritewalltop.color=cc.color(this.colorarr[time],this.colorarr[time],this.colorarr[time]);
        this.spritewallbottom.color=cc.color(this.colorarr[time],this.colorarr[time],this.colorarr[time]);
        this.spritewallleft.color=cc.color(this.colorarr[time],this.colorarr[time],this.colorarr[time]);
        this.spritewallright.color=cc.color(this.colorarr[time],this.colorarr[time],this.colorarr[time]);
    }
    addItem(pos:cc.Vec2,itemType:number){
        let prefab = null;
        switch(itemType){
            case Item.TYPE_SHIELD:
            prefab = this.shieldPrefab;
            break;
        }
        let item = cc.instantiate(prefab).getComponent(Item);
        item.itemType = itemType;
        item.node.parent = this.actorLayer;
        item.node.position = pos;
        item.node.zIndex = 1000;
    }
    addNpc(pos:cc.Vec2,level:number){
        let npc = cc.instantiate(this.npcPrefab).getComponent(Npc);
        npc.node.parent = this.actorLayer;
        npc.node.position = pos;
        npc.node.zIndex = 1000;
        npc.init(level);
        npc.changeColor(this.player.level);
        this.npcList.push(npc);
    }
    addBuilding(pos:cc.Vec2,scale:number){
        let building = cc.instantiate(this.buildingPrefab).getComponent(Building);
        building.node.parent = this.actorLayer;
        building.node.position = pos;
        building.node.zIndex = 3000;
        building.node.scale = scale;
    }
    addFlyThief(pos:cc.Vec2){
        let fly = cc.instantiate(this.flythiefPrefab).getComponent(FlyThief);
        fly.node.parent = this.actorLayer;
        fly.node.position = pos;
        fly.node.zIndex = 4000;
        fly.gameWorld = this;
    }
    addGhost(pos:cc.Vec2){
        let ghost = cc.instantiate(this.ghostPrefab).getComponent(Ghost);
        ghost.node.parent = this.actorLayer;
        ghost.node.position = pos;
        ghost.node.zIndex = 4000;
        ghost.gameWorld = this;
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
