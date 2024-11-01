export class Baby {
    constructor({name, birthDate = new Date(), heightIn = 20, weightOz = 25}) {
        this.name = name;
        this.birthDate = birthDate;
        this.heightIn = heightIn;
        this.weightOz = weightOz;
        this.stomach = 0;
        this.stomachPressure = 0;
        this.bladder = 0;
        this.mood = Mood.HAPPY;
        this.location = "not home";
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
        return this.randCheck(() => this.#scream()); // returns a mood
    }

    drink(amountOz = 8) {
        this.weightOz += amountOz;
        this.bladder += 1;
        this.stomachPressure += 1;
        this.mood = Mood.CONTENT;

        if (this.stomachPressure >= 3) {
            this.mood = this.#burp();
        }
        if (this.bladder >= 3) {
            this.mood = this.#pee();
        }
        return this.randCheck(() => this.#scream()); // returns a mood
    }

    eat(food = Vegetable, amountOz = 11) {
        this.weightOz += amountOz;
        this.stomach += 1;
        this.stomachPressure += 1;

        switch (food) {
            case Fruit:
                this.mood = this.#laugh(); // sets mood to HAPPY and returns it
                break;
            case Vegetable:
                this.mood = this.#cry(); // sets mood to SAD and returns it
                break;
            case Cereal:
                this.mood = this.#sleep(); // sets mood to CONTENT and returns it
                break;
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

    #scream() {
        this.mood = Mood.MAD;
        console.log("AHHHHHHHHHHHH");
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
        return this.randCheck(() => this.#cry());
    }

    #burp() {
        this.stomachPressure = 0;
        return Mood.HAPPY;
    }

    randCheck(func) {
        return Math.random() * 10 > 5 ? func() : this.mood;
    }
}

export class BabyConsole{
    createBaby(specs){
        new Baby(specs)
    }
    getBabySpecs(baby) {
        for (const [attr, value] of Object.entries(baby)) {
            console.log(`${attr}: ${value}`);
        }
    }
}