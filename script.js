
const button = document.querySelector("#button");
const byTen = ["", "one", "two", "tree", "four", "five", "six", "seven", "eight", "nine"];
const byTwenty = ["ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
const byHandred = ["", "ten", "twenty", "thirty", "fourty", "fifty", "sixty", "seventy", "eighty", "ninety"];

class OneDigit {
    constructor (one_digits) {
        this.one_didits = one_digits;
    }
    transferToTextOneDigit(val){
        return this.one_didits[val];
    }
}
class TwoDigitByTwenty extends OneDigit {
    constructor (one_digits, two_Digits) {
        super(one_digits)
        this.two_Digits = two_Digits;
    }
    transferToTextTwoDigitByTwenty(val) {
        return this.two_Digits[val-10]
    }
}
class TwoDigitsByHandred extends TwoDigitByTwenty{
    constructor (one_digits, two_Digits, two_Digits_by_handred) {
        super (one_digits, two_Digits);
        this.two_Digits_by_handred = two_Digits_by_handred;
    }
    transferToTextTwoDigitByHandred(val) {
        return this.two_Digits_by_handred[val[0]] + " " + this.one_didits[val[1]];
    }
}
class TreeDigits extends TwoDigitsByHandred {
    constructor (one_digits, two_Digits, two_Digits_by_handred, handred) {
        super(one_digits, two_Digits, two_Digits_by_handred); 
        this.handred = handred; 
    }
    transferToTextTreeDigit(val) {
        if (val[1] + val[2] < 10) {
            if (val[0] == 0 && val[1] == 0) {
                return this.one_didits[val[0]] + " " + this.transferToTextOneDigit(val[2]);
            }
            return this.one_didits[val[0]] + " " + this.handred + " " + this.transferToTextOneDigit(val[2]);
        }
        if (val[1] + val[2] > 10 && val[1] + val[2] < 20){
            if (val[0] == 0) {
                return this.one_didits[val[0]] + " " + this.transferToTextTwoDigitByTwenty(val[1] + val[2]);
            }
            return this.one_didits[val[0]] + " " + this.handred + " " + this.transferToTextTwoDigitByTwenty(val[1] + val[2]);
        }
        if (val[0] == 0) {
            return this.one_didits[val[0]] + " "  + this.transferToTextTwoDigitByHandred(val[1] + val[2])
        }
        return this.one_didits[val[0]] + " " + this.handred + " " + this.transferToTextTwoDigitByHandred(val[1] + val[2])
    }
}
class FourDigits extends TreeDigits {
    constructor(one_digits, two_Digits, two_Digits_by_handred, handred, thousand) {
        super(one_digits, two_Digits, two_Digits_by_handred, handred); 
        this.thousand = thousand; 
    }
    transferToTextFourDigit(val) {
        const temp = val[2] + val[3];
        if (temp < 10) {
            return this.one_didits[val[0]] + " " + this.thousand + " " + this.one_didits[val[3]]; 
        }
        if (temp >= 10 && temp < 20) {
            return this.one_didits[val[0]] + " " + this.thousand + " " + this.transferToTextTwoDigitByTwenty(val[2] + val[3]);
        }
        if (val[0] == 0) {
            return this.one_didits[val[0]] + " " + this.transferToTextTreeDigit(val[1] + val[2] + val[3])

        }
        return this.one_didits[val[0]] + " " + this.thousand + " " + this.transferToTextTreeDigit(val[1] + val[2] + val[3])
    }
}
class FiveDigits extends FourDigits {
    constructor(one_digits, two_Digits, two_Digits_by_handred, handred, thousand) {
        super(one_digits, two_Digits, two_Digits_by_handred, handred, thousand);
    }
    transferToTextFiveDigit (val) {
        const begining = val[0] + val[1]; 
        const ending = val[2] + val[3] + val[4];
        if (begining >= 10 && begining < 20) {
            return this.transferToTextTwoDigitByTwenty(begining) + " " + this.thousand + " " + this.transferToTextTreeDigit(ending);
        }
        if (begining >= 20) {
            return this.transferToTextTwoDigitByHandred(begining) + " " + this.thousand + " " + this.transferToTextTreeDigit(ending);
        }
    }
}
class SixDigits extends FiveDigits {
    constructor(one_digits, two_Digits, two_Digits_by_handred, handred, thousand) {
        super(one_digits, two_Digits, two_Digits_by_handred, handred, thousand);
    }
    transferToTextSixDigit (val) {
        const begining = val[0] + val[1] + val[2];
        const ending = val[3] + val[4] + val[5]; 
        if (begining == 0) {
            return this.transferToTextTreeDigit(begining) + " " + this.transferToTextTreeDigit(ending);
        }
        return this.transferToTextTreeDigit(begining) + " " + this.thousand + " " + this.transferToTextTreeDigit(ending);
    }
}
class SevenDigits extends SixDigits {
    constructor(one_digits, two_Digits, two_Digits_by_handred, handred, thousand, million) {
        super(one_digits, two_Digits, two_Digits_by_handred, handred, thousand);
        this.million = million; 
    }
    transferToTextSevenDigit(val) {
        const begining = val[0]; 
        const ending = val[1] + val[2] + val[3] + val[4] + val[5] + val[6]; 
        return this.transferToTextOneDigit(begining) + " " + this.million + " " + this.transferToTextSixDigit(ending);
    }
}
class EightDigits extends SevenDigits {
    constructor(one_digits, two_Digits, two_Digits_by_handred, handred, thousand, million) {
        super(one_digits, two_Digits, two_Digits_by_handred, handred, thousand, million);
    }
    transferToTextEightDigit(val) {
        const begining = val[0] + val[1];
        const ending = val[2] + val[3] + val[4] + val[5] + val[6] + val[7]; 
        if (begining >= 10 && begining < 20) {
           return this.transferToTextTwoDigitByTwenty(begining) + " " + this.million + " " +  this.transferToTextSixDigit(ending);
        }
        return this.transferToTextTwoDigitByHandred(begining) + " " + this.million + " " + this.transferToTextSixDigit(ending);
    }
}
class NineDigits extends EightDigits {
    constructor(one_digits, two_Digits, two_Digits_by_handred, handred, thousand, million) {
        super(one_digits, two_Digits, two_Digits_by_handred, handred, thousand, million);
    }
    transferToTextNineDigit(val) {
        const begining = val[0] + val[1] + val[2];
        const ending = val[3] + val[4] + val[5] + val[6] + val[7] + val[8]; 
        return this.transferToTextTreeDigit(begining) + " " + this.million + " " + this.transferToTextSixDigit(ending);
    }
}
const oneDigits = new OneDigit(byTen); 
const twoDigitsByTwenty = new TwoDigitByTwenty(byTen, byTwenty);
const twoDigitsByHandred = new TwoDigitsByHandred(byTen, byTwenty, byHandred);
const treeDigits = new TreeDigits(byTen, byTwenty, byHandred, "handred");
const fourDigits = new FourDigits(byTen, byTwenty, byHandred, "handred", "thousand");
const fiveDigits = new FiveDigits(byTen, byTwenty, byHandred, "handred", "thousand");
const sixDigits = new SixDigits(byTen, byTwenty, byHandred, "handred", "thousand");
const sevenDigits = new SevenDigits(byTen, byTwenty, byHandred, "handred", "thousand", "million");
const eightDigits = new EightDigits(byTen, byTwenty, byHandred, "handred", "thousand", "million");
const nineDigits = new NineDigits(byTen, byTwenty, byHandred, "handred", "thousand", "million"); 

button.onclick = () => {
    let userNumber = document.querySelector("#userText").value;
    if (userNumber < 10) {
        console.log(oneDigits.transferToTextOneDigit(userNumber));
    }
    if (userNumber > 10 && userNumber  < 20) {
        console.log(twoDigitsByTwenty.transferToTextTwoDigitByTwenty(userNumber));
    }
    if ((userNumber >= 20 && userNumber < 100) || userNumber == 10) {
        console.log(twoDigitsByHandred.transferToTextTwoDigitByHandred(userNumber));
    }
    if (userNumber >= 100 && userNumber < 1000) {
        console.log(treeDigits.transferToTextTreeDigit(userNumber));
    }
    if(userNumber >= 1000 && userNumber < 10000) {
        console.log(fourDigits.transferToTextFourDigit(userNumber));
    }
    if (userNumber >= 10000 && userNumber < 100000) {
        console.log(fiveDigits.transferToTextFiveDigit(userNumber));
    }
    if(userNumber >= 100000 && userNumber < 1000000) {
        console.log(sixDigits.transferToTextSixDigit(userNumber));
    }
    if(userNumber >= 1000000 && userNumber < 10000000) {
        console.log(sevenDigits.transferToTextSevenDigit(userNumber));
    }
    if(userNumber >=10000000 && userNumber < 100000000) {
        console.log(eightDigits.transferToTextEightDigit(userNumber));
    }
    if (userNumber >= 100000000 && userNumber < 1000000000) {
        console.log(nineDigits.transferToTextNineDigit(userNumber));
    }
    if (userNumber >= 1000000000) {
        console.log("your number is bigger then expected, I am Sorry");
    }
}


