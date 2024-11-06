import { Mood } from "../../models/mood.mjs"
import Baby from "./babyrepo.mjs"
export class BabyConsole{
    static commands = {
        "Feed":    "Feed the specimen with food",
        "Hydrate": "Hydrate the specimen with hydratives",
        "Home":    "Send that b**** home",
        "Specs":   "Baby Spec Monitor",
        "--help":  "Displays available commands"
    }
    static babies = []
    static currentBaby;
    static interface(action, ...args){
        switch (action){
            case 'create':
                return this.#createBaby(...args)
            case 'feed':
                return this.#feed(...args)
            case 'hydrate':
                return this.#Hydrate(...args)
            case 'punt':
                return this.#punt()
            case 'throw':
                return this.#throw()
            case 'hug':
                return this.#hug()
            case 'specs':
                return this.#getBabySpecs(this.currentBaby)
            case 'switch':
                this.#switchBaby(...args)
                return this.currentBaby
            case 'all':
                return this.#getAllBabies()
            default:
                console.log(`Unkown action: ${action}`)

        }
    }
    static #createBaby(specs){
        const newBaby = new Baby(specs)
        this.babies.push(newBaby)
        this.currentBaby = newBaby
        return this.#getBabySpecs(newBaby)    
    }
    static #getBabySpecs(baby) {
        const babyData = Object.entries(baby)
        for (let i = 0; i < babyData.length; i++) {
            if (babyData[i][0] === 'mood') {
                babyData[i][1] = this.#getMoodString(baby.mood)
                break
            }
        }
        const updatedSpecs = Object.fromEntries(babyData)
        return updatedSpecs
    }
    static #getMoodString(moodValue) {
        switch (moodValue) {
            case Mood.HAPPY:
                return 'HAPPY';
            case Mood.CONTENT:
                return 'CONTENT';
            case Mood.MAD:
                return 'MAD';
            case Mood.SAD:
                return 'SAD';
            default:
                return 'unknown'; // For any undefined mood
        }
    }
    static #feed(food){
        console.log(food)
        this.currentBaby.eat(food)
        return this.#getBabySpecs(this.currentBaby)
    }
    static #Hydrate(drink){
        this.currentBaby.drink(drink)
        return this.#getBabySpecs(this.currentBaby)
    }
    static #switchBaby(babyName){
        this.currentBaby = this.babies.find(baby => baby.name === babyName)
    }
    static #getAllBabies() {
        return this.babies
    }
    static #hug(){
        return this.currentBaby.hug()
    }
    static #punt(){
        return this.currentBaby.punt()
    }
    static #throw(){
        return this.currentBaby.throw()
    }
    static #whisper(){
        return this.currentBaby.whisper()
    }
}

