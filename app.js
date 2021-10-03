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
        //Create a set of the words that have been found
        this.foundWords = new Set();
    }

    playGame() {
        let solved = false;
        this.printStatus();
        while(!solved) {
            //get a word from the user
            if(this.queryUser() == null) {
                this.printStatus(true);
                return;
            }
            //update the console
            this.printStatus(false);

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
        return;
    }

    queryUser() {
        let guess = prompt("Enter a guess: ")
        //if the user gives up, return null
        if(guess == null) {
            return null;
        }

        guess = guess.toLowerCase();
        //if the user inputed '*', shuffle the available letters
        if(guess == '*') {
            alert(`Shuffling root word...`);
            shuffle(this.availableLetters);
        }
        //if the guess is too short or too long, let the player know
        else if(guess.length < Min_Length) alert(`Guess is too short!`);
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
        return true;
    }

    printStatus(gameOver) {
        //clear the console first
        console.clear();

        let output = ""
        //if the game is over, print to the console the number of words we have found
        if(gameOver) {
            output += `You answered ${this.foundWords.size} out of ${this.listOfWords.size}!\n\n`;
            this.listOfWords.foreach((word) => {output += (word + '\n')});
            
        }
        //otherwise, print the available letters
        else {
            output += `Available letters: ${this.availableLetters.join("")}\n\n`;

            //print each word in the listOfWords (keeping the characters 
            //hidden if the word has not been found)
            this.listOfWords.foreach((word) => {
                if(this.foundWords.has(word)) output += (word + '\n');
                else {
                    let line = "";
                    for (let char of this.listOfWords[i]) {
                        line = line + "- ";
                    }
                    line += "\n"
                    output += line;
                }
            });
        }
        console.log(output);

    }
}

/**
 * This shuffle method uses the Fisher-Yates shuffle algorithm 
 * to shuffle an inputed array.
 * 
 * @param {*} array The array to shuffle
 * @returns The shuffled array
 */
function shuffle(array) {
    let currentIndex = array.length;
    let randomIndex = -1;
  
    // Go backwards through the array and swap each 
    // element with another random index
    while (currentIndex != 0) {
  
      // Select a random element
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // swap it with the current element
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

function findWord() {
    return 'catch';
}

function findSubwords(word) {





    return ['cat', 'hat', 'chat', 'catch']
}



game = new WordPlay();
game.playGame();

