export default class LevelData{
    level:number = 0;//关卡等级
    width:number = 0;//高
    height:number =0;//宽
    randomCircleNum: number = 0;//随机圆个数
    targetLevel:number = 1;//碰撞目标完成等级 最大31，最小1
    flyThief:number = 0;//金色飞贼数目
    ghostBall:number = 0;//鬼飞球数目
    
    valueCopy(data:LevelData){
        this.level = data.level?data.level:0;
        this.width = data.width?data.width:0;
        this.height = data.height?data.height:0;
        this.randomCircleNum = data.randomCircleNum?data.randomCircleNum:0;
        this.targetLevel = data.targetLevel?data.targetLevel:1;
        this.flyThief = data.flyThief?data.flyThief:0;
        this.ghostBall = data.ghostBall?data.ghostBall:0;
    }
    clone():LevelData{
        let e = new LevelData();
        e.level = this.level;
        e.width = this.width;
        e.height = this.height;
        e.randomCircleNum = this.randomCircleNum;
        e.targetLevel = this.targetLevel;
        e.flyThief = this.flyThief;
        e.ghostBall = this.ghostBall;
        return e;
    } 
}