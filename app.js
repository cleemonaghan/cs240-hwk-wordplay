//the minimum length of a word in the game
var Min_Length = 3;
//the maximum length of a root word
var Root_Word_Length = 6;
//contains all the possibble starter words for the WordPlay game
var Root_Word_List = new Array();
//contains all words in the dictionary (words of length 3 through length 6)
var Word_List = new Set();

/***
 * This class contains the fields and methods for playing the WoldPlay game. 
 */
class WordPlay {
    /** This constructor initializes the class's fields:
     * this.availableLetters- an array of characters that make up the 6-letter root word
     * this.listOfWords- the set of words and subwords that can be formed from the 6-letter root word
     * this.foundWords- the set of words the player has found
     */
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

    /** This method simulates the game for the user. Each turn, 
     * if the game is not over, the player will be queried for 
     * a new guess and then the game status will be updated and 
     * printed to the console. If the player guesses all the 
     * words in listOfWords, or if they give up, the game will end. 
     * 
     * @returns None is returned when the game is finished
     */
    playGame() {
        //solved is a boolean that will be set to true when the game is over
        let solved = false;
        //print the initial status of the game
        this.printStatus();
        //enter the game loop
        while(!solved) {
            //get a word from the user
            if(this.queryUser() == null) {
                //the player gave up, so print the game over status to the console
                this.printStatus(true);
                return;
            }
            //update and print the current game status to the console
            this.printStatus(false);

            //check if the game is over
            solved = (this.listOfWords.size == this.foundWords.size);

        }

        //congratulate the player and terminate
        alert(`You guessed all the words! Good Job!`);
        return;
    }

    /** This method queries the player for a guess. If they enter *, 
     * then the letters shown will be shuffled. If they enter a word 
     * with more than 6 letters or less than 3, they will be informed 
     * that the entered word is too long or too short. If they enter 
     * a word that they have already guessed, they will be reminded 
     * that they already guessed that word. If they guess correctly 
     * or incorrectly, they will be informed that the word they entered 
     * was correct or incorrect. 
     * If the player cancels the prompt, the game will end and 
     * they will have given up. 
     * 
     * @returns null if the player gives up, true otherwise
     */
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

    /** This method prints the status of the game to the console. 
     * The console will be cleared and then the status of the game will be printed. 
     * The game status consists of the letters available to guess with and the list 
     * of words to be guessed. If a word has not been guessed, the letters of the 
     * word will be replaced with dashes, so that the player knows how many letters 
     * are in the word, but not the letters of the word.
     * At the end of the game, the number of correctly answered words will be printed, 
     * along with all the hidden words in Word_List.
     * 
     * @param {Boolean} gameOver true if the game is over
     */
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
        //print the status of the game to the console
        console.log(output);

    }
}

/**This shuffle method uses the Fisher-Yates shuffle algorithm 
 * to shuffle an inputed array.
 * 
 * @param {Array} array The array to shuffle
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

/** This method selects a random 6-letter word from Root_Word_List to play the game with
 */
function findWord() {
    //select a random word from Root_Word_List
    return Root_Word_List[Math.floor(Math.random() * Root_Word_List.length)];
}

/** This method finds all the valid subwords (between 3 and 6 letters long) of the inputed word.
 * 
 * This method first creates a set of all the possible permutations of the inputed words, 
 * then removes all the invalid words from the set.
 * 
 * @param {String} word the word to find all the subwords of
 * @returns A set of valid subwords
 */
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

/** This method uses recursion to find all the permutations of the inputed word.
 * 
 * @param {String} word the word to find all the permutations of
 * @returns A set of all possible permutations of the word
 */
function permutations(word) {

    //if the word is the empty string, add it to the set
    if (0 == word.length) return new Set().add("");

    //remember the first letter of the word
    let firstLetter = word[0];
    //recursively find all permutations of the subword (indices 1 -> n) and store them in subSet
    let subSet = permutations(word.substring(1));
    //the set to store all our final permutations in
    let set = new Set();

    //convert subSet to an iterable so we can traverse all the elements of the set
    let setIterator = subSet.values()
    //element is the current word of subSet as we traverse it
    element = setIterator.next();
    while(!element.done) {
        //insert the first letter of the word between every pair of letters in the word
        let tempWord = element.value;
        for (let i = 0; i <= tempWord.length; i++) {
            let frontHalf = tempWord.substring(-1, i);
            let backHalf = tempWord.substring(i);
            //add the permutation to the final set
            set.add(frontHalf + firstLetter + backHalf);
        }
        //add the permutation from subSet to the final set
        set.add(tempWord);
        element = setIterator.next();
    }
    //return the set of permutations
    return set;
}

/**This function initializes the Word_List and Root_Word_List for the WordPlay game.
 */
function initializeLists() {
    //for each word in the dictionary
    for(let index in dictionary) {
        let word = dictionary[index]
        //check if we need to add it to the Word_List
        if(word.length <= Root_Word_Length && word.length >= Min_Length) Word_List.add(word);
        //check if we need to add it to the Root_Word_List
        if(word.length == Root_Word_Length) Root_Word_List.push(word);
    }
}


//intialize the Word_List and Root_Word_List, then begin a game of WordPlay
initializeLists();
game = new WordPlay();
game.playGame();



