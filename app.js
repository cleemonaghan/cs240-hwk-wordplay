var Min_Length = 3;

class WordPlay {
    constructor() {
        //create an array of all the subwords of the hiddenWord (this array contains the hiddenWord)
        this.listOfWords = findSubwords(findWord());
        //Create an array of booleans defining which words have been found
        this.foundWords = new Array();
        for(let i = 0; i < this.listOfWords.length; i++) {
            this.foundWords.push(false);
        }
    }

    queryUser() {
        let guess = prompt("Enter a guess: ").toLowerCase();
        //if the guess is too short, let the player know
        if(guess.length < Min_Length) alert(`Guess is too short!`);
        //otherwise, check if it is a solution
        else {
            let found = false;
            for(let index=0; index<this.listOfWords.length;index++) {
                if(guess == this.listOfWords[index]) {

                    if(this.foundWords[index]) {
                        //We already guessed this word, so inform the player
                        alert(`Already guessed ${guess}!`);
                    }
                    else {
                        //this was a correct guess, so update foundWords
                        this.foundWords[index] = true;
                        //give a message that the guess was correct
                        alert(`Correct! ${guess}`);

                    }
                    //change found to true
                    found = true;
                    break;
                }
            }
            if(!found) {
                //If we didn't find the word
                alert(`${guess} is not a word!`);
            }
        }
    }

    printStatus() {
        //clear the console first
        console.clear();

        let output = ""
        //tally the number of words we have found 
        let found = 0;
        this.foundWords.forEach(element => {
            //if we have found this word, then increase the number of found words
            if(element) found++;
        });
        //print to the console the number of words we have found
        output += `You answered ${found} out of ${this.foundWords.length}!\n`;

        //print each word in the listOfWords (keeping the characters 
        //hidden if the word has not been found)
        for(let i = 0; i < this.listOfWords.length; i++) {
            if(this.foundWords[i]) output += (this.listOfWords[i] + '\n');
            else {
                let line = "";
                for (let char of this.listOfWords[i]) {
                    line = line + "- ";
                }
                line += "\n"
                output += line;
            }
        }
        console.log(output);

    }
}

function findWord() {
    return 'catch';
}

function findSubwords(word) {
    return ['cat', 'dog', 'bird', 'mouse']
}



game = new WordPlay();
game.printStatus();
game.queryUser();
game.printStatus();
game.queryUser();
game.printStatus();

