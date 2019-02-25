/**
 * This class provides support functions for the entire application
 */
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
     * Extract target param from url
     * @param {any} location 
     */
    static extractTargetUrl(location){
        if (location && location.search){
            if (location.search.indexOf('?target' > -1)){
                const arrUrl = location.search.split('=')
                if (arrUrl.length === 2){
                    return arrUrl[1]
                }
            }
        }
        return ''
    }
    /**
     * Create a distinct collection from an array
     * @param {array} collection 
     * @param {function} selector 
     */
    static distinct(collection, selector){
        var allData = selector ? [...collection.map(selector)] : [...collection]
        const result = new Set(allData)
        const array = [...result]
        return array
    }
    /**
     * Normalize a collection
     * @param {array} collection 
     */
    static normalize(collection){                
        let normalizedData = {}
        collection.forEach(item => normalizedData[item.id] = item)
        return normalizedData
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
     * @param {string} gender male or female
     */
    static generateRandomAvatar(gender) {

        const maleParameters = {                     
            facialHairType: ["Hat", "BeardMedium", "BeardLight", "BeardMagestic", "MoustacheFancy", "MoustacheMagnum"],
            topType:["NoHair",  "Turban", "Eyepatch",  "LongHairBun", "LongHairDreads", "LongHairFro", "ShortHairShaggyMullet", "ShortHairTheCaesar", "ShortHairTheCaesarSidePart",  "ShortHairDreads01", "ShortHairDreads02", "ShortHairFrizzle", "ShortHairShortCurly", "ShortHairShortFlat", "ShortHairShortRound", "ShortHairShortWaved", "ShortHairSides", "WinterHat1", "WinterHat2", "WinterHat3", "WinterHat4"],
            eyeType: ["EyeRoll"]
        }
        const femaleParameters = {                     
            topType: ["Hijab", "LongHairBigHair", "LongHairBob", "LongHairCurly", "LongHairCurvy",  "LongHairFrida", "LongHairFroBand", "LongHairNotTooLong", "LongHairShavedSides", "LongHairMiaWallace", "LongHairStraight", "LongHairStraight2", "LongHairStraightStrand"],
            accessoriesType: ["Kurt"]
        }

        let customParameters = {}
        if (gender){
            if (gender === 'male'){
                customParameters = { ...maleParameters }
            }else{
                customParameters = { ...femaleParameters }
            }
        }else{
            const set = new Set(Object.keys(maleParameters).concat(Object.keys(femaleParameters)))
            const keys = [...set]
            keys.forEach(key => customParameters[key] = [...(maleParameters[key] || []), ...(femaleParameters[key] || [])] )
        }

        const parameters = {
            topType: [],
            accessoriesType: ["Blank", "Prescription01", "Prescription02", "Round", "Sunglasses", "Wayfarers"],
            facialHairType: ["Blank"],
            facialHairColor: ["Auburn", "Black", "Blonde", "BlondeGolden", "Brown", "BrownDark", "Platinum", "Red"],
            clotheType: ["BlazerShirt", "BlazerSweater", "CollarSweater", "GraphicShirt", "Hoodie", "Overall", "ShirtCrewNeck", "ShirtScoopNeck", "ShirtVNeck"],
            clotheColor: ["Black", "Blue01", "Blue02", "Blue03", "Gray01", "Gray02", "Heather", "PastelBlue", "PastelGreen", "PastelOrange", "PastelRed", "PastelYellow", "Pink", "Red", "White"],
            eyeType: ["Close", "Cry", "Default", "Dizzy", "Happy", "Hearts", "Side", "Squint", "Surprised", "Wink", "WinkWacky"],
            eyebrowType: ["Angry", "AngryNatural", "Default", "DefaultNatural", "FlatNatural", "RaisedExcited", "RaisedExcitedNatural", "SadConcerned", "SadConcernedNatural", "UnibrowNatural", "UpDown", "UpDownNatural"],
            mouthType: ["Concerned", "Default", "Disbelief", "Eating", "Grimace", "Sad", "ScreamOpen", "Serious", "Smile", "Tongue", "Twinkle", "Vomit"],
            skinColor: ["Tanned", "Yellow", "Pale", "Light", "Brown", "DarkBrown", "Black"]
        }
        const configuredParameters = {...parameters}    
        const customKeys = Object.keys(customParameters)
        customKeys.forEach(key => configuredParameters[key] = [...configuredParameters[key], ...customParameters[key]] )
       
        const urlParams = Object.keys(configuredParameters).map(key => {
            const arr = configuredParameters[key]
            const index = Utilities.generateRandomNumber(0, arr.length)
            const value = arr[index]
            return `${key}=${value}`
        }).join('&')

        return {
            url: `https://avataaars.io/?${urlParams}`,
            gender
        }
    }
    /***
     * Get all keys from active items
     */
    static getActiveKeys(data){
        return Object.keys(data).filter(key => data[key].deleted === false)
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
     * Save item to html5 local storage
     * @param {string} key 
     * @param {any} value 
     */
    static appendToLocalStorage(key, value) {    
        let currentData = this.getFromLocalStorage(key)
        if (currentData){
            currentData = [
                ...currentData,
                value
            ]
        }else{
            currentData = [value]
        }
        localStorage.setItem(key, JSON.stringify(currentData))
    }
    /**
     * Get item from html5 local storage
     * @param {string} key 
     */
    static getFromLocalStorage(key) {   
        const data = localStorage.getItem(key) 
        if (data){
            return JSON.parse(data)
        }
        return null
    }
}

export default Utilities