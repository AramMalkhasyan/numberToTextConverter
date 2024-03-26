const button = document.querySelector("#button");
const result = document.querySelector("#result")
const numbersByTen = ["", "one", "two", "tree", "four", "five", "six", "seven", "eight", "nine"];
const numbersByTwenty = ["ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
const numbersByHandred = ["", "ten", "twenty", "thirty", "fourty", "fifty", "sixty", "seventy", "eighty", "ninety"];

class TwoDigit{
    constructor(byTen, byTwenty, byHandred) {
        this.byTen = byTen;
        this.byTwenty = byTwenty; 
        this.byHandred = byHandred;
    }

    transferToTextOneDigit(val) {
        return this.byTen[val];
    }
    transferToTextTwoDigit(val) {
        if (val < 20) {
            return this.byTwenty[val-10];
        }
        if (val >= 20 && val <100) {
            return this.byHandred[val[0]] + " " + this.byTen[val[1]]
        }
    }
}
class TreeDigit extends TwoDigit {
    constructor (byTen, byTwenty, byHandred, handred){
        super(byTen, byTwenty, byHandred);
        this.handred = handred;
    }
    transferToTextTreeDigit(val) {
        const begining = val[0];
        const ending = val[1] + val[2];
        if (ending < 10) {
            if (begining == 0) {
                return this.transferToTextOneDigit(begining) + this.transferToTextOneDigit(val[2]);
            }
            return this.transferToTextOneDigit(begining) + " " + this.handred + " " + this.transferToTextOneDigit(val[2]);
        }
        if (ending >= 10 && begining == 0) {
            return this.transferToTextOneDigit(begining) + this.transferToTextTwoDigit(ending);
        }
        return this.transferToTextOneDigit(begining) + " " + this.handred + " " + this.transferToTextTwoDigit(ending);
    }
}
class FourDigit extends TreeDigit {
    constructor (byTen, byTwenty, byHandred, handred, thousand) {
        super(byTen, byTwenty, byHandred, handred);
        this.thousand = thousand;
    }
    transferToTextFourDigit(val){
        const begining = val[0]; 
        const ending = val[1] + val[2] + val[3];
        if (begining == 0) {
            return this.transferToTextOneDigit(begining) + this.transferToTextTreeDigit(ending);  
        }
        return this.transferToTextOneDigit(begining) + " " + this.thousand + " " + this.transferToTextTreeDigit(ending);  
    }
}
class FiveDigit extends FourDigit {
    constructor(byTen, byTwenty, byHandred, handred, thousand){
        super (byTen, byTwenty, byHandred, handred, thousand)
    }
    transferToTextFiveDigit (val) {
        const begining = val[0] + val[1];
        const ending = val[2] + val[3] + val[4];
        if (begining == 0) {
            return this.transferToTextTwoDigit(begining) + this.transferToTextTreeDigit(ending);
        }
        return this.transferToTextTwoDigit(begining) + " " + this.thousand + " " + this.transferToTextTreeDigit(ending);
    }
}
class SixDigit extends FiveDigit {
    constructor(byTen, byTwenty, byHandred, handred, thousand){
        super(byTen, byTwenty, byHandred, handred, thousand);
    }
    transferToTextSixDigit(val) {
        const begining = val[0] + val[1] + val[2];
        const ending = val[3] + val[4] + val[5];
        if (begining == 0) {
            return this.transferToTextTreeDigit(begining) + this.transferToTextTreeDigit(ending);
        }
        return this.transferToTextTreeDigit(begining) + " " + this.thousand + " " + this.transferToTextTreeDigit(ending);
    }
}
class SevenDigit extends SixDigit {
    constructor(byTen, byTwenty, byHandred, handred, thousand, million){
        super(byTen, byTwenty, byHandred, handred, thousand);
        this.million = million; 
    }
    transferToTextSevenDigit(val){
        const begining = val[0];
        const ending = val[1] + val[2] + val[3]+ val[4]+ val[5]+ val[6]; 
        if (begining == 0) {
            return this.transferToTextOneDigit(begining) + this.transferToTextSixDigit(ending);
        }
        return this.transferToTextOneDigit(begining) + " " + this.million + " " + this.transferToTextSixDigit(ending);
    }
}
class EightDigit extends SevenDigit {
    constructor(byTen, byTwenty, byHandred, handred, thousand, million){
        super(byTen, byTwenty, byHandred, handred, thousand, million);
    }
    transferToTextEightDigit(val) {
        const begining = val[0] + val[1];
        const ending = val[2] + val[3] + val[4]+ val[5]+ val[6]+ val[7]; 
        if(begining == 0) {
            return this.transferToTextTwoDigit(begining) + this.transferToTextSixDigit(ending);
        }
        return this.transferToTextTwoDigit(begining) + " " + this.million + " " + this.transferToTextSixDigit(ending);
    }
}
class NineDigit extends EightDigit {
    constructor(byTen, byTwenty, byHandred, handred, thousand, million){
        super(byTen, byTwenty, byHandred, handred, thousand, million);
    }
    transferToTextNineDigit(val) {
        const begining = val[0] + val[1] + val[2];
        const ending = val[3] + val[4] + val[5]+ val[6]+ val[7]+ val[8]; 
        if (begining == 0) {
            return this.transferToTextTreeDigit(begining) + this.transferToTextSixDigit(ending);
        }
        return this.transferToTextTreeDigit(begining) + " " + this.million + " " + this.transferToTextSixDigit(ending);
    }
}
class TenDigit extends NineDigit {
    constructor(byTen, byTwenty, byHandred, handred, thousand, million, billion){
        super(byTen, byTwenty, byHandred, handred, thousand, million);
        this.billion = billion;
    }
    transferToTextTenDigit (val) {
        const begining = val[0];
        const ending = val[1] + val[2] + val[3] + val[4] + val[5] + val[6] + val[7] + val[8] + val[9];
        if (begining == 0) {
            return this.transferToTextOneDigit(begining) + this.transferToTextNineDigit(ending);  
        }
        return this.transferToTextOneDigit(begining) + " " + this.billion + " " + this.transferToTextNineDigit(ending);  
    }
}
class ElevenDigit extends TenDigit {
    constructor (byTen, byTwenty, byHandred, handred, thousand, million, billion) {
        super(byTen, byTwenty, byHandred, handred, thousand, million, billion)
    }
    transferToTextElevenDigit(val) {
        const begining = val[0] + val[1];
        const ending = val[2] + val[3] + val[4] + val[5] + val[6] + val[7] + val[8] + val[9] + val[10];
        if (begining == 0) {
            return this.transferToTextTwoDigit(begining) + this.transferToTextNineDigit(ending);
        }
        return this.transferToTextTwoDigit(begining) + " " + this.billion + " " + this.transferToTextNineDigit(ending);
    }
}
class TwelveDigit extends ElevenDigit {
    constructor (byTen, byTwenty, byHandred, handred, thousand, million, billion) {
        super(byTen, byTwenty, byHandred, handred, thousand, million, billion)
    }
    transferToTextTwelveDigit(val) {
        const begining = val[0] + val[1] + val[2];
        const ending = val[3] + val[4] + val[5] + val[6] + val[7] + val[8] + val[9] + val[10] + val[11];
        return this.transferToTextTreeDigit(begining) + " " + this.billion + " " + this.transferToTextNineDigit(ending);
    }
}

button.onclick = () => {
    const userNumber = document.querySelector("#userText").value;
    console.log(userNumber.length);
    if (userNumber == 0) {
        result.innerHTML = "zero";
    }
    if (userNumber.length > 1 && userNumber[0] == 0){
        result.innerHTML = "this is not a number";
    } else if (userNumber > 0 && userNumber < 10) {
        const twoDigit = new TwoDigit(numbersByTen, numbersByTwenty, numbersByHandred); 
        result.innerHTML = twoDigit.transferToTextOneDigit(userNumber);
    }else if (userNumber >= 10 && userNumber < 100) {
        const twoDigit = new TwoDigit(numbersByTen, numbersByTwenty, numbersByHandred); 
        result.innerHTML = twoDigit.transferToTextTwoDigit(userNumber);
    }else if (userNumber >= 100 && userNumber < 1000) {
        const treeDigit = new TreeDigit(numbersByTen, numbersByTwenty, numbersByHandred, "handred"); 
        result.innerHTML = treeDigit.transferToTextTreeDigit(userNumber);
    } else if (userNumber >= 1000 && userNumber < 10000) {
        const fourDigit = new FourDigit(numbersByTen, numbersByTwenty, numbersByHandred, "handred", "thousand");
        result.innerHTML = fourDigit.transferToTextFourDigit(userNumber);
    }else if (userNumber >= 10000 && userNumber < 100000) {
        const fiveDigit = new FiveDigit(numbersByTen, numbersByTwenty, numbersByHandred, "handred", "thousand");
        result.innerHTML = fiveDigit.transferToTextFiveDigit(userNumber);
    } else if (userNumber >= 100000 && userNumber < 1000000) {
        const sixDigit = new SixDigit(numbersByTen, numbersByTwenty, numbersByHandred, "handred", "thousand");
        result.innerHTML = sixDigit.transferToTextSixDigit(userNumber);
    }else if (userNumber >= 1000000 && userNumber < 10000000) {
        const sevenDigit = new SevenDigit(numbersByTen, numbersByTwenty, numbersByHandred, "handred", "thousand", "million");
        result.innerHTML = sevenDigit.transferToTextSevenDigit(userNumber);
    }else if (userNumber >= 1000000 && userNumber < 10000000) {
        const sevenDigit = new SevenDigit(numbersByTen, numbersByTwenty, numbersByHandred, "handred", "thousand", "million");
        result.innerHTML = sevenDigit.transferToTextSevenDigit(userNumber);
    }else if (userNumber >= 10000000 && userNumber < 100000000) {
        const eightDigit = new EightDigit(numbersByTen, numbersByTwenty, numbersByHandred, "handred", "thousand", "million");
        result.innerHTML = eightDigit.transferToTextEightDigit(userNumber);
    }else if (userNumber >= 100000000 && userNumber < 1000000000) {
        const nineDigit = new NineDigit(numbersByTen, numbersByTwenty, numbersByHandred, "handred", "thousand", "million");
        result.innerHTML =nineDigit.transferToTextNineDigit(userNumber);
    }else if (userNumber >= 100000000 && userNumber < 1000000000) {
        const nineDigit = new NineDigit(numbersByTen, numbersByTwenty, numbersByHandred, "handred", "thousand", "million");
        result.innerHTML =nineDigit.transferToTextNineDigit(userNumber);
    }else if (userNumber >= 1000000000 && userNumber < 10000000000) {
        const tenDigit = new TenDigit(numbersByTen, numbersByTwenty, numbersByHandred, "handred", "thousand", "million", "billion");
        result.innerHTML = tenDigit.transferToTextTenDigit(userNumber);
    }else if (userNumber >= 10000000000 && userNumber < 100000000000) {
        const elevenDigit = new ElevenDigit(numbersByTen, numbersByTwenty, numbersByHandred, "handred", "thousand", "million", "billion");
        result.innerHTML = elevenDigit.transferToTextElevenDigit(userNumber);
    }else if (userNumber >= 100000000000 && userNumber < 1000000000000) {
        const twelveDigit = new TwelveDigit(numbersByTen, numbersByTwenty, numbersByHandred, "handred", "thousand", "million", "billion");
        result.innerHTML = twelveDigit.transferToTextTwelveDigit(userNumber);
    }
    if (userNumber == 1000000000000) {
        result.innerHTML = "one trillion";
    }
    if (userNumber > 1000000000000) {
        result.innerHTML = "your number is bigger then expected, I am Sorry";
    }
}