import React, { useEffect, useRef } from "react";
import Canvas from "./Canvas"

var objects = []

class Vector2{
    constructor(x,y){
        this.x = x
        this.y = y
    }
    Add(secondVector){
        return new Vector2(this.x+secondVector.x,this.y+secondVector.y)
    }

}

class drawObject{
    constructor(size){
        this.position = new Vector2(0,0)
        this.localposition = new Vector2(0,0)
        this.size = size
        this.objectFrame = 0
        this.color = "#000000"
        this.debugText = "test"
        objects.push(this)
    }

    _onDrawCall = (context, frame) =>{
        context.fillStyle = this.color
        context.fillRect(this.position.x-this.size.x/2,this.position.y-this.size.y/2,this.size.x,this.size.y)
        context.font = "20px Arial";
        context.fillStyle = "red"
        context.fillText(this.debugText,this.position.x-this.size.x/2,this.position.y)
        this.objectFrame++
        this.Update(frame)

    }

    looped(){
        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        this.color = `#${randomColor}`
        this.debugText = this.parent.loottable[Math.floor(Math.random()*this.parent.loottable.length)]
        if (this.parent.speed <= 9.5622325 && this.parent.haswin == null){
            this.color = "black"
            this.debugText = this.parent.winBurger
            this.parent.haswin = true
        }
    }

    Update = (frame) =>{
        if (this.position.x < -150){
            // const randomColor = Math.floor(Math.random()*16777215).toString(16);
            // this.color = `#${randomColor}`
        }
    }
}

class drawRow extends drawObject{

    constructor(position, size = new Vector2(140,50)){
        super(new Vector2(0,0))

        this.position = position
        this.children = []
        this.startspeed = Math.random()*150+200
        for (var i = 0; i<6; i++){
            var obj = new drawObject(size)
            obj.parent = this
            obj.localposition = new Vector2(300-i*150,0)
            this.children.push(obj)
        }
    }

    _onDrawCall = (context,frame) =>{
        this.objectFrame++
        this.Update(frame)
        this.children.map((obj)=>{
            obj.position = this.position.Add(obj.localposition)
            obj.position = new Vector2(-300+obj.position.x%900, obj.position.y)
            
            if (Math.round(obj.position.x/100)*100==-300){
                if (!obj.loopDebounce){
                    obj.looped()
                    obj.loopDebounce = true
                }
            }else{
                obj.loopDebounce = false
            }

            obj._onDrawCall(context,frame)
        })
    }

    RngFinished(){}

    findWonChild(){
        this.children.map((obj)=>{
            if (Math.round(obj.position.x)==150){
                this.winObj = obj
                obj.debugText = this.winBurger
                obj.basesize = obj.size;
            }
        })
    }
    
    Update = (frame) =>{
        var speed = Math.max(0,(this.startspeed-this.objectFrame)/10)
        this.speed = speed
        if (speed < 1){
            if (Math.round(this.position.x)%150!=0){
                speed = 1
            }else{
                
                this.Update = (frame) => {}
                this.findWonChild()
                this.winObj.endAnimationStartFrame = 0
                this.RngFinished() 
            }
        }
        this.position = this.position.Add(new Vector2(1*speed,0))
        // this.position = new Vector2(this.position.x%300, this.position.y)
        
    }
}
var opening = false

const generateBurgerStructure = (burgerStructure, burgerDroppedCallback) =>{
    var i = 0;
    var posOffset = 25

    var burgirStatus = {}

    burgerStructure.map((burgerObj)=>{
        posOffset += burgerObj.height/2
        var obj = new drawRow(new Vector2(0,posOffset), new Vector2(140,burgerObj.height))
        obj.loottable = burgerObj.all
        obj.winBurger = burgerObj.ingredient
        burgirStatus[obj.position.y]=false
        obj.RngFinished = () =>{
            burgirStatus[obj.position.y]=true
            obj.Update = frame => {
                var time = obj.winObj.endAnimationStartFrame
                var basesize = obj.winObj.basesize
                obj.winObj.size = new Vector2(basesize.x-1.5*(Math.sin(time/25)), basesize.y-1.5*(Math.sin(time/25)))
                obj.winObj.endAnimationStartFrame++
            }
            var pass = true

            for(var key in burgirStatus) {
                var bool = burgirStatus[key]
                if (bool == false) {
                    pass = false
                }
            }
            if (pass == true){
                burgerDroppedCallback()
            }
        }
        posOffset += burgerObj.height/2 + 3
    })
}


const getRandomBurger = (skladniki) =>{
    var wybraneSkladniki = []
    // alert(skladniki)
    skladniki.map((skladnik)=>{
        var table = [];
        var nazwaSkladnika = Object.keys(skladnik)[0]
        var opcje = skladnik[nazwaSkladnika]["opcje"]
        var wysokosc = skladnik[nazwaSkladnika]["wysokosc"] || 30
        opcje.map((opcja)=>{
            var nazwa = opcja.nazwa
            var szansa = opcja.szansa
            for (var i = 0; i<szansa;i++){
                table.push(nazwa)
            }
        })
        var skladnik = table[Math.floor(Math.random() * table.length)]
        var chance = opcje.find((opcja)=>opcja.nazwa==skladnik).szansa

        wybraneSkladniki.push({
            "name": nazwaSkladnika,
            "height": wysokosc,
            "ingredient": skladnik,
            "all": table,
            "chance": chance
        });
    })
    console.log(wybraneSkladniki)
    return wybraneSkladniki
    // return table[Math.floor(Math.random() * table.length)];
}

const BurgerCanvas = props => {
    
    const start = () =>{
        objects = []
        opening = true

        var burger = getRandomBurger(props.skladniki);


        generateBurgerStructure(burger, () =>{
            props.burgerOpenedCallback()
            opening = false
            // var pertg = 1
            // burger.map( czesc => {
            //     pertg*=czesc.chance/100
            // })
            // alert(`NA TEGO BURGERA JEST ${pertg*100}% SZANSY!`)
        })
    }

    if (props.isOpening && opening == false){
        start()
    }

    const draw = (context, frame)=>{
        context.clearRect(0,0,context.canvas.width, context.canvas.height)
        context.fillStyle='grey';
        
        objects.map((obj)=>{
            obj._onDrawCall(context, frame);
        })

    }

    return (
        <>
            <Canvas draw={draw} width="300" height="200"/>
        </>
    )
}

export default BurgerCanvas;