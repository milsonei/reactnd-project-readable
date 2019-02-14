 class Utilities { 
   /**
     * Get sort condition to sort function
     * @param {any} firstData First data to compare
     * @param {any} secondData Second data to compare
     * @param {string} direction asc or desc
     * @return {number} 1 to ascending sort, -1 to descending sort and 0 to none
     */
    static getSortCondition (firstData, secondData, direction) {    
        const sortKey = direction === "asc" ? 1 : -1   
        if (firstData > secondData) {
            return 1*sortKey;
          }
          if (firstData < secondData) {
            return -1*sortKey;
          }
          // a must be equal to b
          return 0;
    }
     /**
     * Normalize author array into object and add random avatar icon
     * @param {array} newAuthors New authors array
     * @param {any} oldAuthors Existent authors array
     * @return {object} Normalized object
     */
    static createAuthors(newAuthors, oldAuthors){                 
        let authors 
        if (oldAuthors)           {
            authors = {...oldAuthors} 
        }else{
            authors = {}
        }        
    
        const existentKeys = Object.keys(authors)        
        const exists = (author) => existentKeys.filter(key => key === author).length > 0
        let filteredAuthors = newAuthors.filter(author => exists(author) === false)
        if (filteredAuthors.length === 0) return {}
        filteredAuthors.forEach(author => authors[author] = {name: author, avatar: Utilities.generateRandomAvatar()})   
        return authors
    }    
    /**
     * Generate a new identify
     */
    static generateUID(){
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    }
    /**
     * Generate a new timestamp
     */
    static generateTimestamp() {
        return Date.now()
    }

    /**
     * Generates a random number between a minimum value and a maximum value
     * @param {integer} min Mininum value
     * @param {integer} max Maximum value
     */
    static generateRandomNumber(min, max){
        return Math.floor(Math.random() * (max - min) + min)
    }
    /**
     * Generate a random avatar from https://getavataaars.com
     */
    static generateRandomAvatar() {
        const parameters = {
            topType: ["NoHair", "Eyepatch", "Hat", "Hijab", "Turban", "WinterHat1", "WinterHat2", "WinterHat3", "WinterHat4", "LongHairBigHair", "LongHairBob", "LongHairBun", "LongHairCurly", "LongHairCurvy", "LongHairDreads", "LongHairFrida", "LongHairFro", "LongHairFroBand", "LongHairNotTooLong", "LongHairShavedSides", "LongHairMiaWallace", "LongHairStraight", "LongHairStraight2", "LongHairStraightStrand", "ShortHairDreads01", "ShortHairDreads02", "ShortHairFrizzle", "ShortHairShaggyMullet", "ShortHairShortCurly", "ShortHairShortFlat", "ShortHairShortRound", "ShortHairShortWaved", "ShortHairSides", "ShortHairTheCaesar", "ShortHairTheCaesarSidePart"],
            accessoriesType: ["Blank", "Kurt", "Prescription01", "Prescription02", "Round", "Sunglasses", "Wayfarers"],
            facialHairType: ["Blank", "BeardMedium", "BeardLight", "BeardMagestic", "MoustacheFancy", "MoustacheMagnum"],
            facialHairColor: ["Auburn", "Black", "Blonde", "BlondeGolden", "Brown", "BrownDark", "Platinum", "Red"],
            clotheType: ["BlazerShirt", "BlazerSweater", "CollarSweater", "GraphicShirt", "Hoodie", "Overall", "ShirtCrewNeck", "ShirtScoopNeck", "ShirtVNeck"],
            clotheColor: ["Black", "Blue01", "Blue02", "Blue03", "Gray01", "Gray02", "Heather", "PastelBlue", "PastelGreen", "PastelOrange", "PastelRed", "PastelYellow", "Pink", "Red", "White"],
            eyeType: ["Close", "Cry", "Default", "Dizzy", "EyeRoll", "Happy", "Hearts", "Side", "Squint", "Surprised", "Wink", "WinkWacky"],
            eyebrowType: ["Angry", "AngryNatural", "Default", "DefaultNatural", "FlatNatural", "RaisedExcited", "RaisedExcitedNatural", "SadConcerned", "SadConcernedNatural", "UnibrowNatural", "UpDown", "UpDownNatural"],
            mouthType: ["Concerned", "Default", "Disbelief", "Eating", "Grimace", "Sad", "ScreamOpen", "Serious", "Smile", "Tongue", "Twinkle", "Vomit"],
            skinColor: ["Tanned", "Yellow", "Pale", "Light", "Brown", "DarkBrown", "Black"]
        }
        
        const urlParams = Object.keys(parameters).map(key => {
            const arr = parameters[key]
            const index = Utilities.generateRandomNumber(0, arr.length)
            const value = arr[index]
            return `${key}=${value}`
        }).join('&')

        return `https://avataaars.io/?${urlParams}`
    }
    /**
     * Save item to html5 local storage
     * @param {string} key 
     * @param {any} value 
     */
    static saveToLocalStorage(key, value) {    
        localStorage.setItem(key, JSON.stringify(value))
    }
    /**
     * Get item from html5 local storage
     * @param {string} key 
     */
    static getFromLocalStorage(key) {    
        return JSON.parse(localStorage.getItem(key))
    }
}

export default Utilities