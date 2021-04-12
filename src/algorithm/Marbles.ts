export class Marbles {

    // randomMarbles(marblesSize: number): number[] {

    // } 

    merge(marblesLeft: number[], marblesRight: number[]): number[] { 
        let sortedArr: number[] = [];
        while (marblesLeft.length && marblesRight.length) { 
            if (marblesLeft[0] <= marblesRight[0]) { 
                sortedArr.push(marblesLeft[0]); 
                marblesLeft = marblesLeft.slice(1)
            } else { 
                sortedArr.push(marblesRight[0]); 
                marblesRight = marblesRight.slice(1) 
            } 
        } 
        while (marblesLeft.length != 0) {
            const leftMarble = marblesLeft.shift();
            if (leftMarble != undefined) {
                sortedArr.push(leftMarble);
            }
        }
        while (marblesRight.length) {
            const rightMarble = marblesRight.shift();
            if (rightMarble != undefined) {
                sortedArr.push(rightMarble); 
            }
        }
        return sortedArr; 
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
