const { isValidWord } = require("./lib");
const dictionary = require("./controllers/Dictionary");
const args = process.argv.slice(2);
const readline = require("readline");

const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const init = async () => {
    const dict = new dictionary();

    switch (args[0]) {
        case "def":
            console.log(await dict.definitions(args[1]));
            break;
        case "syn":
            console.log(await dict.synonyms(args[1]));
            break;
        case "ant":
            console.log(await dict.antonyms(args[1]));
            break;
        case "ex":
            console.log(await dict.examples(args[1]));
            break;
        case "dict":
            console.log(await dict.definitions(args[1]));
            console.log(await dict.synonymsAndAntonyms(args[1]));
            console.log(await dict.examples(args[1]));
            break;

        case "play":
            
            //word game
            let willingToPlay = 1;
            let score = 0;

            do {
                let randWord = await dict.randomWord();
                let idx = Math.floor(Math.random() * 3 + 1);
                console.log(
                "The following could be a definition, or synonym, or antonym"
                );
                let synidx = Math.floor(Math.random() * 5 +1);
                switch (idx) {
                    case 1:
                        ans = await dict.synonyms(randWord);
                        console.log(ans[synidx]);
                        break;
                    case 2:
                        ans = await dict.antonyms(randWord);
                        // console.log('ans', ans)
                        if (ans != undefined) console.log(ans[0]);
                        else {
                            let synonym = await dict.synonyms(randWord);
                            console.log(synonym[0]);
                        }
                        // ans != undefined
                        // ? console.log(ans[0], 'un')
                        // : console.log(await dict.synonyms(randWord)[0], 'syn');
                        break;
                    case 3:
                        ans = await dict.definitions(randWord);
                        console.log(ans[parseInt((idx * synidx)/5)]);
                        break;
                }
                let ques = await readLine("guess the word\n");
                console.log(ques);
                if (ques == randWord) {
                    score += 10;
                    console.log(`your guess is correct ${ques} is correct\n`);
                    let choice = await readLine( "do you want to continue? type 1 for yes, 0 for no\n" );
                    willingToPlay = parseInt(choice);
                } else {
                    let continueGuessing = 1;
                    do{
                        let next = await readLine("1.try again 2.hint 3.skip\n");
                        console.log(next);
                        switch (parseInt(next)) {
                            case 1:
                                score -= 2;
                                console.log(`try again, your score is ${score}\n`);
                                let guessAgain = await readLine("guess the word again\n");
                                if(guessAgain == randWord){
                                    score += 10;
                                    console.log(`correct answer your score is ${score}\n`);
                                }else{
                                    score -= 2 ;
                                    console.log(`wrong answer , your score is ${score}`);
                                }
                                continue;
                            case 2:
                                score -= 3;
                                ans = await dict.synonyms(randWord);
                                console.log(`your hint is ${ans[synidx + 1]}\n`);
                                let guessAgainHint = await readLine("guess the word again\n");
                                if(guessAgainHint == randWord){
                                    score += 10;
                                    console.log(`correct answer your score is ${score}\n`);
                                }else{
                                    score -= 2 ;
                                    console.log(`wrong answer , your score is ${score}`);
                                }                    
                                console.log(score);
                                continue;
                            case 3:
                                score -= 4;
                                console.log(`your score is ${score}\n`);
                                continueGuessing = 0;
                                break;
                            }
                    }while(continueGuessing);
                    }
            } while (willingToPlay);
            console.log("Thankyou for playing :)");
        break;

        default:
            let tempWord = await dict.randomWord();
            console.log(tempWord);
            console.log(await dict.definitions(tempWord));
            console.log(await dict.synonymsAndAntonyms(tempWord));
            console.log(await dict.examples(tempWord));
            break;
        }
};
init();

const readLine = (message) => {
    return new Promise((res, rej) => {
        r1.question(message, function (guess) {
        return res(guess);
    });
    });
};
