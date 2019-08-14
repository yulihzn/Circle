
export default class Utils {
    
    static lerpnum(self:number,to:number, ratio:number):number{
        let out = 0;
        out = self+(to-self)*ratio;
        return out;
    }
    static lerp(self:cc.Vec2,to:cc.Vec2, ratio:number):cc.Vec2 {
        let out = cc.v2(0,0);
        let x = self.x;
        let y = self.y;
        out.x = x + (to.x - x) * ratio;
        out.y = y + (to.y - y) * ratio;
        return out;
    }
}
