const { isValidWord } = require("./lib");
const dictionary = require("./controllers/Dictionary");
const args = process.argv.slice(2);
const readline = require("readline");

const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const init = async () => {
    const ob1 = new dictionary();

    switch (args[0]) {
    case "def":
        console.log(await ob1.definitions(args[1]));
        break;
    case "syn":
        console.log(await ob1.synonyms(args[1]));
        break;
    case "ant":
        console.log(await ob1.antonyms(args[1]));
        break;
    case "ex":
        console.log(await ob1.examples(args[1]));
        break;
    case "dict":
        console.log(await ob1.definitions(args[1]));
        console.log(await ob1.synonymsAndAntonyms(args[1]));
        console.log(await ob1.examples(args[1]));
        break;

    case "play":
      //word game
        let flag = 1;
        let score = 0;

        do {
        let randWord = await ob1.randomWord();
        let x = Math.floor(Math.random() * 3 + 1);
        console.log(
            "The following could be a definition, or synonym, or antonym"
        );
        switch (x) {
            case 1:
                ans = await ob1.synonyms(randWord);
                console.log(ans[x]);
                break;
            case 2:
                ans = await ob1.antonyms(randWord);
                ans
                ? console.log(ans[0])
                : console.log(await ob1.synonyms(randWord)[0]);
                break;
            case 3:
                ans = await ob1.definitions(randWord);
                console.log(ans[x]);
                break;
        }
        let ques = async () => {
            await readLine("guess the word\n");
            process.exit();
        };
        ques()
        if( ques == randWord){
            score += 10;
            console.log(`your guess is correct ${ques} is correct\n`);
            let choice = async () => {
                await readLine("do you want to continue? type 1 for yes, 0 for no\n");
                process.exit();
            }
            flag = choice()
        } else{
            let next = async () => {
                await readLine("1.try again 2.hint 3.skip\n");
                process.exit();
            };
            next()
            switch (next) {
                case 1:
                    score -= 2;
                    console.log(`try again, your score is ${score}\n`);
                    continue;
                case 2:
                    score -= 4;
                    console.log(`your hint is ${ans[x + 1]}\n`);
                    console.log(score);
                    continue;
                case 3:
                    console.log(`your score is ${score}\n`);
                    break;
            }
        } 
    }while (flag);
    break;

    default:
        let tempWord = await ob1.randomWord();
        console.log(tempWord);
        console.log(await ob1.definitions(tempWord));
        console.log(await ob1.synonymsAndAntonyms(tempWord));
        console.log(await ob1.examples(tempWord));
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
