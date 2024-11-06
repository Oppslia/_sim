import {Mood} from "../../models/mood.mjs"
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
        this.mood = Mood.HAPPY;
        this.location = "not home";
        this.message = []
    }

    #laugh() {
        console.log("baby_laugh01.mp3");
        this.mood = Mood.HAPPY;
        return this.mood;
    }

    #cry() {
        console.log("baby_weep01.mp3");
        this.mood = Mood.SAD;
        return this.mood;
    }

    #sleep(length = 0) {
        console.log("goodnight");
        setTimeout(() => {}, length * 1000); // simulate sleep
        this.mood = Mood.CONTENT;
        return this.#randCheck(() => this.#scream()); // returns a mood
    }

    drink(drink) {
        const amountOz = Object.values(drink)[0].weight
        this.weightOz += amountOz;
        this.bladder += 1;
        this.stomachPressure += 1;
        this.message.push({
            drank: Object.keys(drink)[0],
            mood: ((this.#randCheck(() => this.#scream(true)) === Mood.MAD) ? this.mood : (this.mood = Mood.CONTENT))
        })// Sets mood to a Mood which can be either MAD or Content.  It is only mad if the randcheck is is true, where it makes the baby scream.
        // Instead of building the message in the scream if scream rand === true, I build it here. If i didn't, the message log would be Scream before drinking.
        if (this.mood === Mood.MAD){ // Can only happen from the randCheck, since the drinking action before it will make sure its always either-
            this.message.push({    // CONTENT or MAD
                scream: "babyRandScream.mp3",
                mood: (this.mood = Mood.MAD) // I just do this assignment everywhere since it makes sure I do not forget to assign it. 
            })
        }//----------------------------------------------This clause is only so that I can append a screaming message AFTER drinking

        if (this.stomachPressure >= 3) {
            this.message.push({
                burp: "babyBurp.mp3",
                mood: (this.mood = this.#burp()) 
            })
        }
        if (this.bladder >= 3) {
            this.bladder = 0
            this.message.push({
                pee: "babyPee.mp3",
                mood: ((this.#randCheck(() => this.#scream(true)) === Mood.MAD) ? this.mood : (this.mood = Mood.CONTENT)) //sets mood
            })
            if (this.mood === Mood.MAD){ // Can only happen from the randCheck, since the peeing action before it will make sure its always either-
                this.message.push({    // CONTENT or MAD
                    scream: "babyRandScream.mp3", // The previous moods above the parent guard clause are irrelevant to this conditional.
                    mood: (this.mood = Mood.MAD) // I just do this assignment everywhere since it makes sure I do not forget to assign it. 
                })
            }//----------------------------------------------This clause is only so that I can append a screaming message AFTER peeing
        }
        
        console.log(this.message)
        return this.mood
    }

    eat(food) {
        const amountOz = Object.values(food)[0].weight
        this.weightOz += amountOz;
        this.stomach += 1;
        this.stomachPressure += 1;
        food = Object.keys(food)[0]
        switch (true) {
            case (food in Fruit || food in Goodie):
                this.mood = this.#laugh();  // set mood to HAPPY for fruit
                break;
            case (food in Cereal):
                this.mood = this.#sleep();  // set mood to CONTENT for goodies
                break;
            case (food in Vegetable):
                this.mood = this.#cry();
                break
        }

        if (this.stomachPressure >= 3) {
            this.mood = this.#burp();
        }
        if (this.stomach >= 3) {
            this.mood = this.#poop();
            return this.mood;
        }
        if (this.mood === Mood.SAD) {
            return this.mood;
        }

        return this.randCheck(() => this.#scream()); // returns a mood based on a random scream check
    }

    #scream(rand = false) {
        console.log("AHHHHHHHHHHHH");
        if(rand){
            return (this.mood = Mood.MAD)
            // Specific case. With the way I invoke these, I need to build the Message later in a clause within the parent method
        }
        this.message.push({
            scream: "babyScream.mp3",
            mood: (this.mood = Mood.MAD)
        })
        return this.mood;
    }

    #pee() {
        this.bladder = 0;
        this.weightOz -= 4;
        console.log("yellow liquids flow");
        return Mood.CONTENT;
    }

    #poop() {
        this.stomach = 0;
        this.weightOz -= 5;
        this.mood = Mood.CONTENT;
        console.log("dook");
        return this.#randCheck(() => this.#cry());
    }

    #burp() {
        this.stomachPressure = 0;
        return Mood.HAPPY;
    }

    #randCheck(func) {
        let x = Math.random() * 10
        console.log(x)
        return  x > 8 ? func() : this.mood;
    }
}

export default Baby