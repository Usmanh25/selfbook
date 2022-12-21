import mongoose from "mongoose";

const userIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];

export const users = [
  {
    _id: userIds[0],
    firstName: "Harry",
    lastName: "Sachs",
    email: "harrysachs@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p3.jpg",
    friends: [],
    location: "South Beach, Florida",
    occupation: "Catch me at the beach",
    viewedProfile: 14561,
    impressions: 888822,
    createdAt: 1115211422,
    updatedAt: 1115211422,
    __v: 0,
  },
  {
    _id: userIds[1],
    firstName: "Anita",
    lastName: "Naylor",
    email: "anitanaylor@gmail.com",
    password: "$!FEAS@!O)_IDJda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p6.jpg",
    friends: [],
    location: "New York City",
    occupation: "Fashionista",
    viewedProfile: 12351,
    impressions: 55555,
    createdAt: 1595589072,
    updatedAt: 1595589072,
    __v: 0,
  },
  {
    _id: userIds[2],
    firstName: "Mona",
    lastName: "Lott",
    email: "monalott@gmail.com",
    password: "da39a3ee5e6b4b0d3255bfef95601890afd80709",
    picturePath: "p5.jpg",
    friends: [],
    location: "Denver, Colorado",
    occupation: "I love coding and snowboarding",
    viewedProfile: 45468,
    impressions: 19986,
    createdAt: 1288090662,
    updatedAt: 1288090662,
    __v: 0,
  },
  {
    _id: userIds[3],
    firstName: "Hugh",
    lastName: "Jass",
    email: "hughjass@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p7.jpg",
    friends: [],
    location: "Los Angeles, CA",
    occupation: "Always stuck in traffic...",
    viewedProfile: 41024,
    impressions: 55316,
    createdAt: 1219214568,
    updatedAt: 1219214568,
    __v: 0,
  },
  {
    _id: userIds[4],
    firstName: "Jenna",
    lastName: "Talia",
    email: "jennatalia@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p8.jpg",
    friends: [],
    location: "San Jose, CA",
    occupation: "I'm Jenna but you can call me Jen",
    viewedProfile: 40212,
    impressions: 7758,
    createdAt: 1493463661,
    updatedAt: 1493463661,
    __v: 0,
  },
  {
    _id: userIds[5],
    firstName: "Ben",
    lastName: "Dover",
    email: "bendover@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p9.jpg",
    friends: [],
    location: "Austin, Texas",
    occupation: "I love you all & keep rockin!",
    viewedProfile: 976,
    impressions: 4658,
    createdAt: 1381326073,
    updatedAt: 1381326073,
    __v: 0,
  },
  {
    _id: userIds[6],
    firstName: "Yuri",
    lastName: "Nata",
    email: "yurinata@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p14.jpg",
    friends: [],
    location: "San Francisco Bay Area",
    occupation: "Wandering",
    viewedProfile: 1510,
    impressions: 77579,
    createdAt: 1714704324,
    updatedAt: 1642716557,
    __v: 0,
  },
  {
    _id: userIds[7],
    firstName: "Mary",
    lastName: "Wana",
    email: "marywana@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p15.jpg",
    friends: [],
    location: "Seattle, WA",
    occupation: "Living it up in the rain",
    viewedProfile: 19520,
    impressions: 83970,
    createdAt: 1369908044,
    updatedAt: 1359322268,
    __v: 0,
  },
  {
    _id: userIds[8],
    firstName: "Michael",
    lastName: "Toris",
    email: "michaeltorris@gmail.com",
    password: "$13b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p17.jpg",
    friends: [],
    location: "Las Vegas, Nevada",
    occupation: "Live every day like its your last!",
    viewedProfile: 19420,
    impressions: 82970,
    createdAt: 1369908044,
    updatedAt: 1359322268,
    __v: 0,
  },
  {
    _id: userIds[9],
    firstName: "Amanda",
    lastName: "Mount",
    email: "amandamount@gmail.com",
    password: "$14b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p16.jpg",
    friends: [],
    location: "Honolulu",
    occupation: "Dreamer, Visionary, Business woman",
    viewedProfile: 19420,
    impressions: 82970,
    createdAt: 1369908044,
    updatedAt: 1359322268,
    __v: 0,
  },
  {
    _id: userIds[10],
    firstName: "fifteen",
    lastName: "fifteen",
    email: "fifteen@gmail.com",
    password: "$215b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p3.jpg",
    friends: [],
    location: "San Francisco",
    occupation: "Engineer",
    viewedProfile: 19420,
    impressions: 82970,
    createdAt: 1369908044,
    updatedAt: 1359322268,
    __v: 0,
  },
  {
    _id: userIds[11],
    firstName: "sixteen",
    lastName: "sixteen",
    email: "sixteen@gmail.com",
    password: "$216b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p3.jpg",
    friends: [],
    location: "San Francisco",
    occupation: "Engineer",
    viewedProfile: 19420,
    impressions: 82970,
    createdAt: 1369908044,
    updatedAt: 1359322268,
    __v: 0,
  },
  {
    _id: userIds[12],
    firstName: "seventeen",
    lastName: "seventeen",
    email: "seventeen@gmail.com",
    password: "$217b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p3.jpg",
    friends: [],
    location: "San Francisco",
    occupation: "Engineer",
    viewedProfile: 19420,
    impressions: 82970,
    createdAt: 1369908044,
    updatedAt: 1359322268,
    __v: 0,
  },
  {
    _id: userIds[13],
    firstName: "eighteen",
    lastName: "eighteen",
    email: "eighteen@gmail.com",
    password: "$218b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p3.jpg",
    friends: [],
    location: "San Francisco",
    occupation: "Engineer",
    viewedProfile: 19420,
    impressions: 82970,
    createdAt: 1369908044,
    updatedAt: 1359322268,
    __v: 0,
  },
  {
    _id: userIds[14],
    firstName: "nineteen",
    lastName: "nineteen",
    email: "nineteen@gmail.com",
    password: "$192b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p3.jpg",
    friends: [],
    location: "San Francisco",
    occupation: "Engineer",
    viewedProfile: 19420,
    impressions: 82970,
    createdAt: 1369908044,
    updatedAt: 1359322268,
    __v: 0,
  },
  {
    _id: userIds[15],
    firstName: "twenty",
    lastName: "twenty",
    email: "twenty@gmail.com",
    password: "$20b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p3.jpg",
    friends: [],
    location: "San Francisco",
    occupation: "Engineer",
    viewedProfile: 19420,
    impressions: 82970,
    createdAt: 1369908044,
    updatedAt: 1359322268,
    __v: 0,
  },
  {
    _id: userIds[16],
    firstName: "twentyone",
    lastName: "twentyone",
    email: "twentyone@gmail.com",
    password: "$21b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p3.jpg",
    friends: [],
    location: "San Francisco",
    occupation: "Engineer",
    viewedProfile: 19420,
    impressions: 82970,
    createdAt: 1369908044,
    updatedAt: 1359322268,
    __v: 0,
  },
  {
    _id: userIds[17],
    firstName: "twentytwo",
    lastName: "twentytwo",
    email: "twentytwo@gmail.com",
    password: "$212b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p3.jpg",
    friends: [],
    location: "San Francisco",
    occupation: "Engineer",
    viewedProfile: 19420,
    impressions: 82970,
    createdAt: 1369908044,
    updatedAt: 1359322268,
    __v: 0,
  },
  {
    _id: userIds[18],
    firstName: "twentythree",
    lastName: "twentythree",
    email: "twentythree@gmail.com",
    password: "$232b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p3.jpg",
    friends: [],
    location: "San Francisco",
    occupation: "Engineer",
    viewedProfile: 19420,
    impressions: 82970,
    createdAt: 1369908044,
    updatedAt: 1359322268,
    __v: 0,
  },
  {
    _id: userIds[19],
    firstName: "Lee",
    lastName: "Nover",
    email: "leenover@gmail.com",
    password: "$10b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p18.jpg",
    friends: [],
    location: "Los Angeles",
    occupation: "Professional MMA Fighter",
    viewedProfile: 19420,
    impressions: 82970,
    createdAt: 1369908044,
    updatedAt: 1359322268,
    __v: 0,
  },
  {
    _id: userIds[20],
    firstName: "twentyfour",
    lastName: "twentyfour",
    email: "twentyfour@gmail.com",
    password: "$10b$10$dsasdgssldyda//G9JxQ4ajsgXf4OAIe/X/AK9skyWUy",
    picturePath: "p3.jpg",
    friends: [],
    location: "San Francisco",
    occupation: "Engineer",
    viewedProfile: 19420,
    impressions: 82970,
    createdAt: 1369908044,
    updatedAt: 1359322268,
    __v: 0,
  },
  {
    _id: userIds[21],
    firstName: "twentyfive",
    lastName: "twentyfive",
    email: "twentyfive@gmail.com",
    password: "$10b$10$sjwsdgssldyda//G9JxQ4ajsgXf4wude/X/AK9skyWUy",
    picturePath: "p3.jpg",
    friends: [],
    location: "San Francisco",
    occupation: "Engineer",
    viewedProfile: 19420,
    impressions: 82970,
    createdAt: 1369908044,
    updatedAt: 1359322268,
    __v: 0,
  },
  {
    _id: userIds[22],
    firstName: "twentysix",
    lastName: "twentysix",
    email: "twentysix@gmail.com",
    password: "$10b$90$sjwsdgssljsda//G9Jxjke4ajsgXf4wu/X/AK9skyWUy",
    picturePath: "p3.jpg",
    friends: [],
    location: "San Francisco",
    occupation: "Engineer",
    viewedProfile: 19420,
    impressions: 82970,
    createdAt: 1369908044,
    updatedAt: 1359322268,
    __v: 0,
  },
  {
    _id: userIds[23],
    firstName: "twentyseven",
    lastName: "twentyseven",
    email: "twentyseven@gmail.com",
    password: "$10b$60$sjwsdgssljssa//G9Jxjke4ajsgXj7wu/X/AK9skyWUy",
    picturePath: "p3.jpg",
    friends: [],
    location: "San Francisco",
    occupation: "Engineer",
    viewedProfile: 19420,
    impressions: 82970,
    createdAt: 1369908044,
    updatedAt: 1359322268,
    __v: 0,
  },
  {
    _id: userIds[24],
    firstName: "twentyeight",
    lastName: "twentyeight",
    email: "twentyeight@gmail.com",
    password: "$10b$60$sjskjgssljssa//G9Jxlkd4ajsgXj7wu/X/AK9skyWUy",
    picturePath: "p3.jpg",
    friends: [],
    location: "San Francisco",
    occupation: "Engineer",
    viewedProfile: 19420,
    impressions: 82970,
    createdAt: 1369908044,
    updatedAt: 1359322268,
    __v: 0,
  },
  {
    _id: userIds[25],
    firstName: "twentynine",
    lastName: "twentynine",
    email: "twentynine@gmail.com",
    password: "$10b$40$sjajsgssljssa//G9Jxlkd4ajsgXj7wu/J/AK9aldWUy",
    picturePath: "p3.jpg",
    friends: [],
    location: "San Francisco",
    occupation: "Engineer",
    viewedProfile: 19420,
    impressions: 82970,
    createdAt: 1369908044,
    updatedAt: 1359322268,
    __v: 0,
  },
  {
    _id: userIds[26],
    firstName: "Jackie",
    lastName: "Moff",
    email: "jackiemoff@gmail.com",
    password: "password",
    picturePath: "p19.jpg",
    friends: [],
    location: "San Francisco",
    occupation: "Real eyes realize real lies",
    viewedProfile: 19420,
    impressions: 82970,
    createdAt: 1369908044,
    updatedAt: 1359322268,
    __v: 0,
  },
];

export const posts = [
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[1],
    firstName: "Anita",
    lastName: "Naylor",
    location: "New York City",
    description: "New York is great until you get robbed on the subway",
    // picturePath: "post1.jpeg",
    userPicturePath: "p6.jpg",
    likes: new Map([
      [userIds[0], true],
      [userIds[1], true],
      [userIds[2], true],
      [userIds[3], true],
      [userIds[4], true],
      [userIds[5], true],
      [userIds[6], true],
      [userIds[7], true],
      [userIds[8], true],
      [userIds[9], true],
      [userIds[10], true],
      [userIds[11], true],
      [userIds[12], true],
      [userIds[13], true],
      [userIds[14], true],
      [userIds[15], true],
      [userIds[16], true],
      [userIds[17], true],
      [userIds[18], true],
      [userIds[19], true],
      [userIds[20], true],
      [userIds[21], true],
    ]),
    comments: [
      "We miss you back home Anita!",
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[3],
    firstName: "Hugh",
    lastName: "Jass",
    location: "Los Angeles, CA",
    description: "Guess where I am",
    picturePath: "post4.jpg",
    userPicturePath: "p7.jpg",
    likes: new Map([
      [userIds[0], true],
      [userIds[1], true],
      [userIds[2], true],
      [userIds[3], true],
      [userIds[4], true],
      [userIds[5], true],
      [userIds[6], true],
      [userIds[7], true],
      [userIds[8], true],
      [userIds[9], true],
      [userIds[10], true],
      [userIds[11], true],
      [userIds[12], true],
      [userIds[13], true],
      [userIds[14], true],
      [userIds[15], true],
      [userIds[16], true],
    ]),
    comments: [
      "You're late for work, Hugh!!",
      "I miss you Hugh Jass!",
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[4],
    firstName: "Jenna",
    lastName: "Talia",
    location: "San Jose, CA",
    description: "I love this cat",
    picturePath: "post11.jpg",
    userPicturePath: "p8.jpg",
    likes: new Map([
      [userIds[0], true],
      [userIds[1], true],
      [userIds[2], true],
      [userIds[3], true],
      [userIds[4], true],
      [userIds[5], true],
      [userIds[6], true],
      [userIds[7], true],
      [userIds[8], true],
      [userIds[9], true],
      [userIds[10], true],
      [userIds[11], true],
      [userIds[12], true],
      [userIds[13], true],
      [userIds[14], true],
      [userIds[15], true],
      [userIds[16], true],
      [userIds[17], true],
      [userIds[18], true],
      [userIds[19], true],
      [userIds[20], true],
      [userIds[21], true],
    ]),
    comments: [
      "She looks so snuggly",
      "Thats one fluffball",
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[5],
    firstName: "Ben",
    lastName: "Dover",
    location: "Austin, Texas",
    description: "The goodest boy",
    picturePath: "post12.jpg",
    userPicturePath: "p9.jpg",
    likes: new Map([
      [userIds[0], true],
      [userIds[1], true],
      [userIds[2], true],
      [userIds[3], true],
      [userIds[4], true],
      [userIds[5], true],
      [userIds[6], true],
      [userIds[7], true],
      [userIds[8], true],
      [userIds[9], true],
      [userIds[10], true],
      [userIds[11], true],
      [userIds[12], true],
      [userIds[13], true],
      [userIds[14], true],
      [userIds[15], true],
      [userIds[16], true],
      [userIds[17], true],
      [userIds[18], true],
    ]),
    comments: [
      "Good boy!",
      "Suchhh a great boi!",
      "Ben Dover!",
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[6],
    firstName: "Yuri",
    lastName: "Nata",
    location: "San Francisco Bay Area",
    description: "Picking apples today :)",
    picturePath: "post10.jpg",
    userPicturePath: "p14.jpg",
    likes: new Map([
      [userIds[0], true],
      [userIds[1], true],
      [userIds[2], true],
      [userIds[3], true],
      [userIds[4], true],
      [userIds[5], true],
      [userIds[6], true],
      [userIds[7], true],
      [userIds[8], true],
      [userIds[9], true],
      [userIds[10], true],
      [userIds[11], true],
      [userIds[12], true],
      [userIds[13], true],
      [userIds[14], true],
      [userIds[15], true],
      [userIds[16], true],
      [userIds[17], true],
      [userIds[18], true],
      [userIds[19], true],
      [userIds[20], true],
      [userIds[21], true],
      [userIds[22], true],
    ]),
    comments: [
      "So prettyy",
      "How did they taste?",
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[7],
    firstName: "Mary",
    lastName: "Wana",
    location: "Seattle, WA",
    description: "That skyline, though",
    picturePath: "post19.jpg",
    userPicturePath: "p15.jpg",
    likes: new Map([
      [userIds[0], true],
      [userIds[1], true],
      [userIds[2], true],
      [userIds[3], true],
      [userIds[4], true],
      [userIds[5], true],
      [userIds[6], true],
      [userIds[7], true],
      [userIds[8], true],
      [userIds[9], true],
      [userIds[10], true],
      [userIds[11], true],
      [userIds[12], true],
      [userIds[13], true],
      [userIds[14], true],
      [userIds[15], true],
      [userIds[16], true],
      [userIds[17], true],
      [userIds[18], true],
      [userIds[19], true],
    ]),

    comments: [
      "Looks great girl friend",
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[19],
    firstName: "Lee",
    lastName: "Nover",
    location: "Los Angeles",
    description: "Today's lunch",
    picturePath: "post14.jpg",
    userPicturePath: "p18.jpg",
    likes: new Map([
      [userIds[0], true],
      [userIds[1], true],
      [userIds[2], true],
      [userIds[3], true],
      [userIds[4], true],
      [userIds[5], true],
      [userIds[6], true],
      [userIds[7], true],
      [userIds[8], true],
    ]),

    comments: [
      "Look's great, Lee!",
      "Your a BEAST!",    
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[8],
    firstName: "Michael",
    lastName: "Toris",
    location: "Las Vegas, Nevada",
    description: "Check out this view from the Cosmopolitan!",
    picturePath: "post15.jpg",
    userPicturePath: "p17.jpg",
    likes: new Map([
      [userIds[0], true],
      [userIds[1], true],
      [userIds[2], true],
      [userIds[3], true],
      [userIds[4], true],
      [userIds[5], true],
      [userIds[6], true],
      [userIds[7], true],
      [userIds[8], true],
      [userIds[9], true],
      [userIds[10], true],
      [userIds[11], true],
      [userIds[12], true],
      [userIds[13], true],
      [userIds[14], true],
      [userIds[15], true],
    ]),

    comments: [
      "Did you get the penthouse?!",
      "Now THAT'S living!",    
      "Stop flexing so hard, Michael Torris!",    
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[9],
    firstName: "Amanda",
    lastName: "Mount",
    location: "Honolulu",
    description: "Another day in paradise",
    picturePath: "post16.jpg",
    userPicturePath: "p16.jpg",
    likes: new Map([
      [userIds[0], true],
      [userIds[1], true],
      [userIds[2], true],
      [userIds[3], true],
      [userIds[4], true],
      [userIds[5], true],
      [userIds[6], true],
      [userIds[7], true],
      [userIds[8], true],
      [userIds[9], true],
      [userIds[10], true],
      [userIds[11], true],
      [userIds[12], true],
      [userIds[13], true],
      [userIds[14], true],
      [userIds[15], true],
      [userIds[16], true],
      [userIds[17], true],
      [userIds[18], true],
      [userIds[19], true],
    ]),

    comments: [
      "Anywhere with a beach is paradise",
      "Get it queen",   
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[8],
    firstName: "Michael",
    lastName: "Torris",
    location: "Las Vegas, Nevada",
    description: "At the Raiders game, its lit!",
    // picturePath: null,
    userPicturePath: "p17.jpg",
    likes: new Map([
      [userIds[0], true],
      [userIds[1], true],
      [userIds[2], true],
      [userIds[3], true],
      [userIds[4], true],
      [userIds[5], true],
      [userIds[6], true],
      [userIds[7], true],
      [userIds[8], true],
      [userIds[9], true],
      [userIds[10], true],
      [userIds[11], true],
      [userIds[12], true],
      [userIds[13], true],
      [userIds[14], true],
      [userIds[15], true],
    ]),
    comments: [
      "GO RAIDERS!",
      "Be careful!!!",
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[0],
    firstName: "Harry",
    lastName: "Sachs",
    location: "South Beach, Florida",
    description: "Bored, someone message me =(",
    // picturePath: null,
    userPicturePath: "p3.jpg",
    likes: new Map([
      [userIds[0], true],
      [userIds[1], true],
      [userIds[2], true],
      [userIds[3], true],
      [userIds[4], true],
      [userIds[5], true],
      [userIds[6], true],
      [userIds[7], true],
      [userIds[8], true],
      [userIds[9], true],
      [userIds[10], true],
      [userIds[11], true],
      [userIds[12], true],
      [userIds[13], true],
      [userIds[14], true],
      [userIds[15], true],
      [userIds[16], true],
      [userIds[17], true],
      [userIds[18], true],
      [userIds[19], true],
    ]),
    comments: [
      "Great, I'll message you!",
      "Get it together, Harry!!!",
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[6],
    firstName: "Yuri",
    lastName: "Nata",
    location: "San Francisco Bay Area",
    description: "Anither day another dollar",
    picturePath: "post9.jpg",
    userPicturePath: "p14.jpg",
    likes: new Map([
      [userIds[0], true],
      [userIds[1], true],
      [userIds[2], true],
      [userIds[3], true],
      [userIds[4], true],
      [userIds[5], true],
      [userIds[6], true],
      [userIds[7], true],
      [userIds[8], true],
      [userIds[9], true],
      [userIds[10], true],
      [userIds[11], true],
      [userIds[12], true],
      [userIds[13], true],
      [userIds[14], true],
      [userIds[15], true],
      [userIds[16], true],
      [userIds[17], true],
      [userIds[18], true],
      [userIds[19], true],
      [userIds[20], true],
      [userIds[21], true],
    ]),
    comments: [
      "Thats my motto",
      "Great picture, Yuri!",
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[7],
    firstName: "Mary",
    lastName: "Wana",
    location: "Seattle, WA",
    description: "Just moved to Seattle and I am in LOVE",
    // picturePath: "post9.jpg",
    userPicturePath: "p15.jpg",
    likes: new Map([
      [userIds[0], true],
      [userIds[1], true],
      [userIds[2], true],
      [userIds[3], true],
      [userIds[4], true],
      [userIds[5], true],
      [userIds[6], true],
      [userIds[7], true],
      [userIds[8], true],
      [userIds[9], true],
      [userIds[10], true],
      [userIds[11], true],
      [userIds[12], true],
      [userIds[13], true],
      [userIds[14], true],
      [userIds[15], true],
      [userIds[16], true],
      [userIds[17], true],
      [userIds[18], true],
      [userIds[19], true],
      [userIds[20], true],
      [userIds[21], true],
      [userIds[22], true],
    ]),
    comments: [
      "Seattle already loves you, Mary Wana",
      "Have a great time",
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[9],
    firstName: "Amanda",
    lastName: "Mount",
    location: "Honolulu",
    description: "Sometimes I feel like I'm missing something...",
    // picturePath: "post9.jpg",
    userPicturePath: "p16.jpg",
    likes: new Map([
      [userIds[0], true],
      [userIds[1], true],
      [userIds[2], true],
      [userIds[3], true],
      [userIds[4], true],
      [userIds[5], true],
      [userIds[6], true],
      [userIds[7], true],
      [userIds[8], true],
      [userIds[9], true],
      [userIds[10], true],
      [userIds[11], true],
      [userIds[12], true],
      [userIds[13], true],
      [userIds[14], true],
      [userIds[15], true],
      [userIds[16], true],
      [userIds[17], true],
      [userIds[18], true],
      [userIds[19], true],
    ]),
    comments: [
      "Is that how you feel Amanda Mount?",
      "You're going to be fine!",
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[1],
    firstName: "Anita",
    lastName: "Naylor",
    location: "New York City",
    description: "Can't wait to get home",
    picturePath: "post2.jpg",
    userPicturePath: "p6.jpg",
    likes: new Map([
      [userIds[0], true],
      [userIds[1], true],
      [userIds[2], true],
      [userIds[3], true],
      [userIds[4], true],
      [userIds[5], true],
      [userIds[6], true],
      [userIds[7], true],
      [userIds[8], true],
      [userIds[9], true],
      [userIds[10], true],
      [userIds[11], true],
      [userIds[12], true],
      [userIds[13], true],
      [userIds[14], true],
      [userIds[15], true],
      [userIds[16], true],
    ]),
    comments: [
      "Let's go out tonight",
      "Be careful on the train! Lotta weirdos!",
      "LOL ^^ I just got robbed on that train!",
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[2],
    firstName: "Mona",
    lastName: "Lott",
    location: "Denver, Colorado",
    description: "Living in a winter wonderland!",
    picturePath: "post17.jpg",
    userPicturePath: "p5.jpg",
    likes: new Map([
      [userIds[0], true],
      [userIds[1], true],
      [userIds[2], true],
      [userIds[3], true],
      [userIds[4], true],
      [userIds[5], true],
      [userIds[6], true],
      [userIds[7], true],
      [userIds[8], true],
      [userIds[9], true],
      [userIds[10], true],
      [userIds[11], true],
      [userIds[12], true],
      [userIds[13], true],
      [userIds[14], true],
      [userIds[15], true],
      [userIds[16], true],
      [userIds[17], true],
      [userIds[18], true],
      [userIds[19], true],
      [userIds[20], true],
      [userIds[21], true],
      [userIds[22], true],
      [userIds[23], true],
    ]),
    comments: [
      "Looks beautiful!",
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[0],
    firstName: "Harry",
    lastName: "Sachs",
    location: "South Beach, Florida",
    description: "Catch me at the beach",
    picturePath: "post1.jpg",
    userPicturePath: "p3.jpg",    likes: new Map([
      [userIds[0], true],
      [userIds[1], true],
      [userIds[2], true],
      [userIds[3], true],
      [userIds[4], true],
      [userIds[5], true],
      [userIds[6], true],
      [userIds[7], true],
      [userIds[8], true],
      [userIds[9], true],
      [userIds[10], true],
      [userIds[11], true],
      [userIds[12], true],
      [userIds[13], true],
    ]),
    comments: [
      "I have to come visit sometimes",
      "Tell the entire Sachs family I said hello!",
      "Call me Harry! Gotta tell you something",
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[1],
    firstName: "Anita",
    lastName: "Naylor",
    location: "New York City",
    description: "The view from Ellis Island",
    picturePath: "post13.jpg",
    userPicturePath: "p6.jpg",
    likes: new Map([
      [userIds[0], true],
      [userIds[1], true],
      [userIds[2], true],
      [userIds[3], true],
      [userIds[4], true],
      [userIds[5], true],
      [userIds[6], true],
      [userIds[7], true],
      [userIds[8], true],
      [userIds[9], true],
      [userIds[10], true],
      [userIds[11], true],
      [userIds[12], true],
      [userIds[13], true],
      [userIds[14], true],
      [userIds[15], true],
      [userIds[16], true],
      [userIds[17], true],
      [userIds[18], true],
      [userIds[19], true],
      [userIds[20], true],
      [userIds[21], true],
      [userIds[22], true],
    ]),
    comments: [
      "I have to come visit!",
      "Bring me with you next time!",
      "You're such a New Yorker!",
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[3],
    firstName: "Hugh",
    lastName: "Jass",
    location: "Los Angeles, CA",
    description: "Broke my toilet today when I sat on it =(",
    // picturePath: "post2.jpeg",
    userPicturePath: "p7.jpg",
    likes: new Map([
      [userIds[0], true],
      [userIds[1], true],
      [userIds[2], true],
      [userIds[3], true],
      [userIds[4], true],
      [userIds[5], true],
      [userIds[6], true],
      [userIds[7], true],
      [userIds[8], true],
      [userIds[9], true],
      [userIds[10], true],
      [userIds[11], true],
      [userIds[12], true],
      [userIds[13], true],
      [userIds[14], true],
      [userIds[15], true],
      [userIds[16], true],
      [userIds[17], true],
      [userIds[18], true],
      [userIds[19], true],
      [userIds[20], true],
      [userIds[21], true],
      [userIds[22], true],
      [userIds[23], true],
      [userIds[24], true],
      [userIds[25], true],
    ]),
    comments: [
      "That's so fitting LOL",
      "You're a MENACE!",
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[4],
    firstName: "Jenna",
    lastName: "Talia",
    location: "San Jose, CA",
    description: "Its so hot outside",
    picturePath: "post5.jpg",
    userPicturePath: "p8.jpg",
    likes: new Map([
      [userIds[0], true],
      [userIds[1], true],
      [userIds[2], true],
      [userIds[3], true],
      [userIds[4], true],
      [userIds[5], true],
      [userIds[6], true],
      [userIds[7], true],
      [userIds[8], true],
      [userIds[9], true],
      [userIds[10], true],
      [userIds[11], true],
      [userIds[12], true],
      [userIds[13], true],
      [userIds[14], true],
      [userIds[15], true],
      [userIds[16], true],
    ]),
    comments: [
      "Jennaaaa",
      "Lets meet up",
      "Come over later",
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[19],
    firstName: "Lee",
    lastName: "Nover",
    location: "Los Angeles",
    description: "Training was brutal today, I almost killed 2 sparring partners",
    // picturePath: null,
    userPicturePath: "p18.jpg",    
    likes: new Map([
      [userIds[0], true],
      [userIds[1], true],
      [userIds[2], true],
      [userIds[3], true],
      [userIds[4], true],
      [userIds[5], true],
      [userIds[6], true],
      [userIds[7], true],
      [userIds[8], true],
      [userIds[9], true],
      [userIds[10], true],
      [userIds[11], true],
      [userIds[12], true],
      [userIds[13], true],
      [userIds[14], true],
      [userIds[15], true],
      [userIds[16], true],
      [userIds[17], true],
      [userIds[18], true],
    ]),
    comments: [
      "You're my inspiration",
      "LEE NOVER!",
      "Get it in Lee!",    
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[5],
    firstName: "Ben",
    lastName: "Dover",
    location: "Austin, Texas",
    description: "What a view",
    picturePath: "post6.jpeg",
    userPicturePath: "p9.jpg",
    likes: new Map([
      [userIds[0], true],
      [userIds[1], true],
      [userIds[2], true],
      [userIds[3], true],
      [userIds[4], true],
      [userIds[5], true],
      [userIds[6], true],
      [userIds[7], true],
      [userIds[8], true],
      [userIds[9], true],
      [userIds[10], true],
      [userIds[11], true],
      [userIds[12], true],
      [userIds[13], true],
      [userIds[14], true],
      [userIds[15], true],
      [userIds[16], true],
      [userIds[17], true],
      [userIds[18], true],
      [userIds[19], true],
      [userIds[20], true],
      [userIds[21], true],
      [userIds[22], true],
      [userIds[23], true],
    ]),
    comments: [
      "Looks like a great timee",
      "Miss you, Ben!",
      "Ben Dover!",    
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[6],
    firstName: "Yuri",
    lastName: "Nata",
    location: "San Francisco Bay Area",
    description: "Foggy day on the Golden Gate",
    picturePath: "post18.jpg",
    userPicturePath: "p14.jpg",
    likes: new Map([
      [userIds[0], true],
      [userIds[1], true],
      [userIds[2], true],
      [userIds[3], true],
      [userIds[4], true],
      [userIds[5], true],
      [userIds[6], true],
      [userIds[7], true],
      [userIds[8], true],
      [userIds[9], true],
      [userIds[10], true],
      [userIds[11], true],
      [userIds[12], true],
      [userIds[13], true],
      [userIds[14], true],
      [userIds[15], true],
      [userIds[16], true],
      [userIds[17], true],
      [userIds[18], true],
      [userIds[19], true],
      [userIds[20], true],
      [userIds[21], true],
      [userIds[22], true],
    ]),
    comments: [
      "I'm so jealous you live in SF",
      "Fog City",
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[2],
    firstName: "Mona",
    lastName: "Lott",
    location: "Denver, Colorado",
    description: "Almost broke my leg today! #snowboarding",
    picturePath: "post3.jpg",
    userPicturePath: "p5.jpg",
    likes: new Map([
      [userIds[0], true],
      [userIds[1], true],
      [userIds[2], true],
      [userIds[3], true],
      [userIds[4], true],
      [userIds[5], true],
      [userIds[6], true],
      [userIds[7], true],
      [userIds[8], true],
      [userIds[9], true],
      [userIds[10], true],
      [userIds[11], true],
      [userIds[12], true],
      [userIds[13], true],
      [userIds[14], true],
      [userIds[15], true],
      [userIds[16], true],
      [userIds[17], true],
      [userIds[18], true],
      [userIds[19], true],
      [userIds[20], true],
      [userIds[21], true],
      [userIds[22], true],
      [userIds[23], true],
      [userIds[24], true],
      [userIds[25], true],
    ]),
    comments: [
        "I hope you are okay",
        "Did it hurt? Did you moan alot?",
        "How are you?!",
    ],
  },
];

