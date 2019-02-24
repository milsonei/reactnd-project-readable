const clone = require('clone')

let db = {}

const defaultData = {
  "thingone": {
    id: 'thingone',
    timestamp: 1467166872634,
    password: 'AheHoOnUodtekWftaYJqPA==',
    gender: 'male',
    avatar: 'https://avataaars.io/?topType=WinterHat4&accessoriesType=Round&facialHairType=Blank&facialHairColor=Brown&clotheType=ShirtScoopNeck&clotheColor=PastelOrange&eyeType=Cry&eyebrowType=Default&mouthType=Tongue&skinColor=Yellow'
  },
  "thingtwo": {
    id: 'thingtwo',
    timestamp: 1467166872634,
    password: 'sOjwfAf1C3oZaVOpAXFflQ==',
    gender: 'female',
    avatar: 'https://avataaars.io/?topType=LongHairBigHair&accessoriesType=Wayfarers&facialHairType=BeardMagestic&facialHairColor=Auburn&clotheType=BlazerShirt&clotheColor=Black&eyeType=Happy&eyebrowType=UpDownNatural&mouthType=Grimace&skinColor=Light'
  },
}

function getData (token) {
  let data = db[token]
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function get (token, id) {
  return new Promise((res) => {
    const users = getData(token)
    res(
      users[id]
    )
  })
}

function getAll (token) {
  return new Promise((res) => {    
    const users = getData(token)        
    let keys = Object.keys(users)  
    const data = keys.map(key => ({
      id: users[key].id,
      timestamp: users[key].timestamp,      
      avatar: users[key].avatar,      
      gender: users[key].gender
    }))
    res(data)
  })
}

function add (token, user) {
  return new Promise((res) => {
    let users = getData(token)

    users[user.id] = {
      id: user.id,
      timestamp: user.timestamp,      
      avatar: user.avatar,
      password: user.password,
      gender: user.gender
    }

    res(users[user.id])
  })
}

function edit (token, id, user) {
    return new Promise((res) => {
        let users = getData(token)
        for (prop in user) {
            users[id][prop] = user[prop]
        }
        res(users[id])
    })
}

module.exports = {
  get,
  getAll,
  add,
  edit
}
