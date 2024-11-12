import {Mood} from "../../models/mood.mjs"
import {Status} from "../../models/status.mjs"
import {Fruit, Vegetable, Cereal, Goodie} from "../../models/foods.mjs"
import * as Drink from "../../models/foods.mjs"
export class Baby {
    constructor({name, birthDate = new Date(), heightIn = 20, weightOz = 130}) {
        this.name = name;
        this.birthDate = birthDate;
        this.heightIn = heightIn;
        this.weightOz = weightOz;
        this.stomach = 0;
        this.stomachPressure = 0;
        this.bladder = 0;
        this.status = Status.HEALTHY
        this.hp = 100
        this.mood = Mood.HAPPY;
        this.location = "not home";
        this.message = []
        this.rested = false

    }
    #healthCheck(){
        console.log(this.status)
        switch(true){
            case (this.hp <=0):
                (this.status = Status.DEAD);break
            case (this.hp >= 1 && 15 >= this.hp):
                (this.status = Status.EDGE_OF_DEATH);break
            case(this.hp >= 16 && 50 >= this.hp):
                (this.status = Status.FAIR);break
            case(this.hp >= 51 && 100>= this.hp):
                (this.status = Status.HEALTHY);break
            case(this.hp > 100):
                (this.status = Status.GOD_HOOD_ACHIEVED);break
                
        }
        if (this.weightOz > 15999){
            return (this.status = Status.DEAD)
        }else{return this.status}
    }

    #laugh() {
        console.log("baby_laugh01.mp3");
        return Mood.HAPPY
    }
    #scream() {
        console.log("AHHHHHHHHHHHH");
        return Mood.MAD
    }
    #cry() {
        console.log("WAHHHH");
        return Mood.SAD
    }
    #sleep(length = 1200, rand = false) {
        console.log("goodnight");
        setTimeout(() => {}, length * 1000); // simulate sleep
        this.rested = true
        return (this.#randCheck(() => this.#scream() === Mood.MAD) ? [Mood.MAD, length] : [Mood.CONTENT, length]) // returns a mood
    }
    drink(drink) {
        const amountOz = Object.values(drink)[0].weight
        this.weightOz += amountOz;
        console.log(this.#healthCheck())
        if(!this.#healthCheck()){
            this.message.push({
                drank: Object.keys(drink)[0],
                status: this.status
            })
            return  
        }//--- Dead
        this.bladder += 1;
        this.stomachPressure += 1;
        this.message.push({
            drank: Object.keys(drink)[0],
            mood: ((this.#randCheck(() => this.#scream()) === Mood.MAD) ? (this.mood = Mood.MAD) : (this.mood = Mood.CONTENT))
        })// Sets mood to a Mood which can be either MAD or Content.  It is only mad if the randcheck is is true, where it makes the baby scream.
        // Instead of building the message in the scream if scream rand === true, I build it here. If i didn't, the message log would be Scream before drinking.
        if (this.mood === Mood.MAD){ // Can only happen from the randCheck, since the drinking action before it will make sure its always either-
            this.message.push({    // CONTENT or MAD
                scream: "babyRandScream.mp3",
                mood: this.mood // I just do this assignment everywhere since it makes sure I do not forget to assign it. 
            })
        }//----------------------------------------------This clause is only so that I can append a screaming message AFTER drinking

        if (this.stomachPressure >= 3) {
            this.mood = this.#burp()
            
        }
        if (this.bladder >= 3) {
            this.mood = this.#pee()
        }
        
        console.log(this.message)
        return this.mood
    }
    eat(foodStats) {
        const food = Object.keys(foodStats)[0]
        const amountOz = foodStats[food].weight
        this.weightOz += amountOz;
        if(!this.#healthCheck()){
            this.message.push({
                ate: Object.keys(food)[0],
                status: this.status
            })
            return  
        }//--- Dead
        this.stomach += 1;
        this.stomachPressure += 1;
        let bSleep;
        this.message.push({
            ate: food,
            mood: (() => { // randcheck...... fuck my life
                switch (true) {
                    case (food in Fruit || food in Goodie):
                        return ((this.#randCheck(() => this.#scream()) === Mood.MAD) ? (this.mood = Mood.MAD) : (this.mood = this.#laugh()))  // set mood to HAPPY for fruit
                    case (food in Cereal):
                        bSleep = this.#sleep()
                        return (this.mood = bSleep[0])   // set mood to CONTENT or MAD if randcheck true
                    case (food in Vegetable):
                        return (this.mood = this.#cry()) // set mood to SAD
                }
            })()
        })
        if (this.stomachPressure >= 3) {
            this.#burp(); // Burping BUT NOT setting mood, since its unclear which mood will result from the consumed item
        }
        switch (this.mood){
            case Mood.HAPPY:
                this.message.push({
                    laugh: "baby_laugh01.mp3",
                    mood: this.mood
                })
                break
            case Mood.MAD:
                if(this.rested){
                    // wow this code is getting weird So i set rested as true anytime i call #sleep. But this conditional will unset it if the sleep fails
                    // I am specifically doing this so i can reference the difference between a Mood.MAD scream result from FOODrand and from SLEEPrand
                    // Then I reset it, since it didnt actually sleep. Its hackey sackey, but Im too far into the lambdas to quit now.
                    this.message.push({
                        scream : "baby_fail_sleep_scream.mp3",
                        mood: this.mood
                    })
                    this.rested = false
                    break
                } 
                this.message.push({
                    scream : "babyRandscream.mp3",
                    mood: this.mood
                })
                break
            case Mood.SAD:
                this.message.push({
                    cry: "baby_weep.mp3",
                    mood: this.mood
                })
                break
            case Mood.CONTENT:
                this.message.push({
                    sleep: (() =>{
                        if (this.stomach >= 3){
                            this.#poop() // 
                            return `Pooped While sleeping for ${bSleep[1]}`
                        }
                        return `Slept for ${bSleep[1]}`
                    })() , // weird since you dont usually burp after sleeping.. 
                    mood: this.mood
                })
                break
            }
        if (this.stomach === 0 && this.rested === true){ // pooped while sleeping
            if (this.#randCheck(() => this.#scream()) === Mood.MAD){
                this.message.push({
                    scream: "babyRandScreamPoopedTheBed.mp3",
                    mood: (this.mood = Mood.MAD) //assigning and using
                })
            }
        }
        
        if (this.stomach >= 3) { // default if stomach is >=3
            this.message.push({
                poop: "plop.mp3",
                mood: (this.mood = this.#poop()) // set the mood = result of poop+randCheck
            })
            if (!this.mood === Mood.CONTENT){// Baby not content after pooping means it cried.
                this.message.push({
                    cry: "baby_weep.mp3",
                    mood: this.mood
                })
            }
        
        }
        console.log(this.message)
        return this.mood
    }


    #pee() {
        this.bladder = 0;
        this.weightOz -= 4;
        console.log("yellow liquids flow");
        this.message.push({
            pee: "babyPee.mp3",
            mood: ((this.#randCheck(() => this.#cry()) === Mood.SAD) ? (this.mood = Mood.SAD) : (this.mood = Mood.CONTENT)) //sets mood
        })
        if (this.mood === Mood.SAD){ // Can only happen from the randCheck, since the peeing action before it will make sure its always either-
            this.message.push({    // CONTENT or MAD
                scream: "babyRandCry.mp3", // The previous moods above the parent guard clause are irrelevant to this conditional.
                mood: this.mood // I just do this assignment everywhere since it makes sure I do not forget to assign it. 
            })
        }//----------------------------------------------This clause is only so that I can append a screaming message AFTER peeing
        return this.mood
    }

    #poop() {
        this.stomach = 0;
        this.weightOz -= 5;
        console.log("dook")
        return (this.#randCheck(() => this.#cry()) === Mood.SAD) ? Mood.SAD : Mood.CONTENT
    }

    #burp() {
        this.stomachPressure = 0;
        this.message.push({
            burp: "babyBurp.mp3",
            mood: Mood.HAPPY 
        })
        return Mood.HAPPY;
    }

    #randCheck(func) {
        if (Math.random() * 10 > 8){
           return func()
        }
    }
}

export default Baby