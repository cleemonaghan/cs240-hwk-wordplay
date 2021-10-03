var Min_Length = 3;
var Root_Word_Length = 6;

class WordPlay {
    constructor() {
        //find word to use
        let word = findWord()
        //put characters of word into an array and shuffle it
        this.availableLetters = []
        for (let char of word) {
            this.availableLetters.push(char);
        }
        shuffle(this.availableLetters)

        //create an array of all the subwords of the hiddenWord (this array contains the hiddenWord)
        this.listOfWords = findSubwords(word);
        //Create an array of booleans defining which words have been found
        this.foundWords = new Array();
        for(let i = 0; i < this.listOfWords.length; i++) {
            this.foundWords.push(false);
        }
    }

    playGame() {
        let solved = false;
        this.printStatus();
        while(!solved) {
            //get a word from the user
            this.queryUser();
            //update the console
            this.printStatus();

            //check if the game is over
            let foundAllWords = true;
            for(let i = 0; i < this.foundWords.length; i++) {
                //if a single word is unfound, then the game is not over
                if(!this.foundWords[i]) {
                    foundAllWords = false;
                    break;
                }
            }
            solved = foundAllWords

        }

        //congratulate the player and terminate
        alert(`You guessed all the words! Good Job!`);
    }

    queryUser() {
        let guess = prompt("Enter a guess: ")
        //if the user gives up
        if(guess == null) {

        }
        //if the user wants to shuffle the letters
        if(guess == '*') {
            
        }
        guess = guess.toLowerCase();
        //if the guess is too short or too long, let the player know
        if(guess.length < Min_Length) alert(`Guess is too short!`);
        else if(guess.length > Root_Word_Length) alert(`Guess is too long!`);
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
    return ['cat', 'hat', 'chat', 'catch']
}



game = new WordPlay();
game.playGame();

