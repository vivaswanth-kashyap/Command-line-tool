const { isValidWord } = require("./lib");
const dictionary = require("./controllers/Dictionary");
const args = process.argv.slice(2);

const init = async () => {
  const ob1 = new dictionary();
  switch(args[0]){
    case 'def':
        console.log(await ob1.definitions(args[1]));
        break;
    case 'syn':
        console.log(await ob1.synonyms(args[1]));
        break;
    case 'ant':
        console.log(await ob1.antonyms(args[1]));
        break;
    case 'ex':
        console.log(await ob1.examples(args[1]));
        break;
    case 'dict':
        console.log(await ob1.definitions(args[1]));
        console.log(await ob1.synonymsAndAntonyms(args[1]));
        console.log(await ob1.examples(args[1]));
        break;
    case 'play':
        //
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
