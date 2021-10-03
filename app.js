var Min_Length = 3;





class game {
    constructor() {
        //A random word from words_alpha.js 
        this.hiddenWord = findWord();
        //create an array of all the subwords of the hiddenWord (this array contains the hiddenWord)
        this.listOfSubwords = findSubwords(this.hiddenWord);
        //Create an array of booleans defining which words have been found
        this.foundWords = new Array();
        for(let i = 0; i < this.listOfSubwords.length; i++) {
            this.foundWords.push(false);
        }
    }

    queryUser() {

    }

    printStatus() {
        //tally the number of words we have found 
        let found = 0;
        this.foundWords.forEach(element => {
            //if we have found this word, then increase the number of found words
            if(element) found++;
        });
        //print to the console the number of words we have found
        console.log(`You answered ${found} out of ${this.foundWords.length}!\n`)

        //print each word in the listOfSubwords (keeping the characters 
        //hidden if the word has not been found)
        for(let i = 0; i < this.listOfSubwords; i++) {
            if(this.foundWords[i]) console.log(this.listOfSubwords[i]);
            else {
                let output = "";
                this.listOfSubwords[i].forEach(char => {output = output + "- ";});
                console.log(output);
            }
        }

    }
}

function findWord() {
    
}

function findSubwords(word) {
    
}