import { MeenaSelect } from "./MeenaSelect";

export class Marbles {

    meenaMarbleSelectedToConsult(marbles: number[]): MeenaSelect {
        const position = Math.floor((Math.random() * marbles.length)+5);
        let selectMarble = marbles[position];
        const MARBLESIZE = 99899;
        const MARBLEMINIMUM = 99000;
        if (selectMarble == undefined) {
            selectMarble = Math.floor(Math.random() * (MARBLESIZE - MARBLEMINIMUM + 1)) + MARBLEMINIMUM;
            return {selectMarble: selectMarble}
        }
        return {
            selectMarble: selectMarble,
            position: position
        }
    }

    randomMarbles(marblesSize: number) {
        const marbles: number[] = [];
        const MARBLESIZE = 99999;
        const MARBLEMINIMUM = 99900;
        for (let i=0; i<marblesSize; i++) {
            marbles.push(Math.floor(Math.random() * (MARBLESIZE - MARBLEMINIMUM + 1)) + MARBLEMINIMUM);
        }
        return marbles;
    }

    difficultMarbles(difficult: string = "easy"): number[] {
        let marbles: number[] = [];
        switch(difficult) {
            case 'hard':
                marbles = this.randomMarbles(100);
                break;
            case 'medium':
                marbles = this.randomMarbles(25);
                break;
            case 'easy':
            default:
                marbles = this.randomMarbles(5);
                break;
        }
        return marbles;
    } 

    merge(marblesLeft: number[], marblesRight: number[]): number[] { 
        let sortedMarbles: number[] = [];
        while (marblesLeft.length && marblesRight.length) { 
            if (marblesLeft[0] <= marblesRight[0]) { 
                sortedMarbles.push(marblesLeft[0]); 
                marblesLeft = marblesLeft.slice(1)
            } else { 
                sortedMarbles.push(marblesRight[0]); 
                marblesRight = marblesRight.slice(1) 
            } 
        } 
        while (marblesLeft.length != 0) {
            const leftMarble = marblesLeft.shift();
            if (leftMarble != undefined) {
                sortedMarbles.push(leftMarble);
            }
        }
        while (marblesRight.length) {
            const rightMarble = marblesRight.shift();
            if (rightMarble != undefined) {
                sortedMarbles.push(rightMarble); 
            }
        }
        return sortedMarbles; 
    }

    mergesort(marbles: number[]): number[] { 
        if (marbles.length < 2) { 
            return marbles;
        }
        const midMarbles = marbles.length / 2; 
        const marblesLeft = marbles.slice(0, midMarbles); 
        const marblesRight = marbles.slice(midMarbles, marbles.length); 
        return this.merge(this.mergesort(marblesLeft), this.mergesort(marblesRight)); 
    }

}
