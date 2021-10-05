var Min_Length = 3;
var Root_Word_Length = 6;
var Root_Word_List = new Array();
var Word_List = new Set();

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
            solved = (this.listOfWords.size == this.foundWords.size);

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
        else if(this.listOfWords.has(guess)) {
            if(this.foundWords.has(guess)) {
                //We already guessed this word, so inform the player
                alert(`Already guessed ${guess}!`);
            }
            else {
                //this was a correct guess, so update foundWords
                this.foundWords.add(guess);
                //give a message that the guess was correct
                alert(`Correct! ${guess}`);
                }
                
            }
        else {
            //If we didn't find the word
            alert(`${guess} is not a word!`);
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
            this.listOfWords.forEach((word) => {output += (word + '\n')});
            
        }
        //otherwise, print the available letters
        else {
            output += `Available letters: ${this.availableLetters.join("")}\n\n`;

            //print each word in the listOfWords (keeping the characters 
            //hidden if the word has not been found)
            this.listOfWords.forEach((word) => {
                if(this.foundWords.has(word)) output += (word + '\n');
                else {
                    let line = "";
                    for (let char of word) {
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
    //select a random word from Root_Word_List
    return Root_Word_List[Math.floor(Math.random() * Root_Word_List.length)];
}

function findSubwords(word) {

    //create a set of all the possible permutations of the word
    let set = permutations(word);
    
    //remove all the permutations that are less than 3 chars and not in Word_List
    set.forEach(subWord => {
        if(subWord < 3) set.delete(subWord);
        else if(!Word_List.has(subWord)) set.delete(subWord);
    });

    return set;
}


function permutations(word) {

    if (0 == word.length) return new Set().add("");

    
    let firstLetter = word[0];
    //find all permutations of the subword (indices 1 -> n)
    let subSet = permutations(word.substring(1));
    let set = new Set();

    //need to convert subSet to an iterable so we can traverse all the elements of the set
    let setIterator = subSet.values()
    
    element = setIterator.next();
    while(!element.done) {
        //need to convert subSet to an array or iterable!!!
        let tempWord = element.value;
        for (let i = 0; i <= tempWord.length; i++) {
            let frontHalf = tempWord.substring(-1, i);
            let backHalf = tempWord.substring(i);
            set.add(frontHalf + firstLetter + backHalf);
        }
        set.add(tempWord);
        element = setIterator.next();
    }
    return set;
}


function initializeLists() {
    console.log(dictionary);
    for(let index in dictionary) {
        let word = dictionary[index]
        if(word.length <= 6 && word.length >= 3) Word_List.add(word);
        if(word.length == 6) Root_Word_List.push(word);
    }
}


initializeLists();
game = new WordPlay();
game.playGame();



