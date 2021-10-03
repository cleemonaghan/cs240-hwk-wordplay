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
}
