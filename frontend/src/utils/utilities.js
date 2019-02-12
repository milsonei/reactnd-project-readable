const utilities = {  
     /**
     * Normalize author array into object and add random avatar icon
     * @param {array} arr Author array
     * @return {object} Normalized object
     */
    createAuthors :  (arr) => {
        let authors = {}
        arr.forEach(author => authors[author] = {name: author, avatar: utilities.generateRandomAvatar()});
        return authors
    },
    /**
     * Generate a new identify
     */
    generateUID : () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),

    /**
     * Generate a new timestamp
     */
    generateTimestamp : () => Date.now(),

    /**
     * Generates a random number between a minimum value and a maximum value
     * @param {integer} min Mininum value
     * @param {integer} max Maximum value
     */
    generateRandomNumber : (min, max) => Math.floor(Math.random() * (max - min) + min),

    /**
     * Generate a random avatar from https://getavataaars.com
     */
    generateRandomAvatar : () => {
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
            const index = this.generateRandomNumber(0, arr.length)
            const value = arr[index]
            return `${key}=${value}`
        }).join('&')

        return `https://avataaars.io/?${urlParams}`
    }
}

export default utilities