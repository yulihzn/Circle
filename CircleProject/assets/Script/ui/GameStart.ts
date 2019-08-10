import GameWorld from "../GameWorld";
import { EventConstant } from "../EventConstant";
import Joystick from "../Joystick";

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
export default class GameStart extends cc.Component {

    //是否暂停
    static isPaused = true;
    @property(GameWorld)
    world: GameWorld = null;
    @property(cc.Node)
    startDialog:cc.Node = null;
    @property(cc.Node)
    finishDialog:cc.Node = null;
    @property(cc.Node)
    overDialog:cc.Node = null;
    @property(cc.Node)
    joystick:cc.Node = null;
    
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.on(EventConstant.GAME_FINISHED, (event) => { this.gameFinish() });
        cc.director.on(EventConstant.GAME_START, (event) => { this.gameStart() });
        cc.director.on(EventConstant.GAME_OVER, (event) => { this.gameOver() });
    }

    start () {

    }
  
    gameFinish(){
        GameStart.isPaused = true;
        this.startDialog.active = false;
        this.finishDialog.active = true;
        this.overDialog.active = false;
        let joy = this.joystick.getComponent(Joystick);
        if(joy){
            joy.init();
        }
        this.joystick.active = false;
        this.world.init();
    }
    gameStart(){
        GameStart.isPaused = false;
        this.startDialog.active = false;
        this.finishDialog.active = false;
        this.overDialog.active = false;
        this.joystick.active = true;
        let joy = this.joystick.getComponent(Joystick);
        if(joy){
            joy.init();
        }
    }
    gameOver(){
        GameStart.isPaused = true;
        this.startDialog.active = false;
        this.finishDialog.active = false;
        this.overDialog.active = true;
        let joy = this.joystick.getComponent(Joystick);
        if(joy){
            joy.init();
        }
        this.joystick.active = false;
    }

    // update (dt) {}
}
