import mongoose from "mongoose";

const userIds = Array.from({ length: 27 }, () => new mongoose.Types.ObjectId());

export const users = [
  { _id: userIds[0], firstName: "Harry", lastName: "Smith", email: "harry.smith@gmail.com", password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy", picturePath: "p3.jpg", friends: [], location: "South Beach, Florida", occupation: "Beach enthusiast", viewedProfile: 14561, impressions: 888822, createdAt: 1115211422, updatedAt: 1115211422, __v: 0 },
  { _id: userIds[1], firstName: "Anita", lastName: "Nguyen", email: "anita.nguyen@gmail.com", password: "$!FEAS@!O)_IDJda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy", picturePath: "p6.jpg", friends: [], location: "New York City", occupation: "Fashion consultant", viewedProfile: 12351, impressions: 55555, createdAt: 1595589072, updatedAt: 1595589072, __v: 0 },
  { _id: userIds[2], firstName: "Monica", lastName: "Lopez", email: "monica.lopez@gmail.com", password: "da39a3ee5e6b4b0d3255bfef95601890afd80709", picturePath: "p5.jpg", friends: [], location: "Denver, Colorado", occupation: "Software developer", viewedProfile: 45468, impressions: 19986, createdAt: 1288090662, updatedAt: 1288090662, __v: 0 },
  { _id: userIds[3], firstName: "Hugh", lastName: "Johnson", email: "hugh.johnson@gmail.com", password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy", picturePath: "p7.jpg", friends: [], location: "Los Angeles, CA", occupation: "Traffic analyst", viewedProfile: 41024, impressions: 55316, createdAt: 1219214568, updatedAt: 1219214568, __v: 0 },
  { _id: userIds[4], firstName: "Lena", lastName: "Martinez", email: "lena.martinez@gmail.com", password: "hashedpassword", picturePath: "p1.jpg", friends: [], location: "Chicago, Illinois", occupation: "Graphic designer", viewedProfile: 30000, impressions: 80000, createdAt: 1315211422, updatedAt: 1315211422, __v: 0 },
  { _id: userIds[5], firstName: "David", lastName: "Kim", email: "david.kim@gmail.com", password: "hashedpassword", picturePath: "p2.jpg", friends: [], location: "Seattle, Washington", occupation: "Data analyst", viewedProfile: 40000, impressions: 90000, createdAt: 1415211422, updatedAt: 1415211422, __v: 0 },
  { _id: userIds[6], firstName: "Emily", lastName: "Clark", email: "emily.clark@gmail.com", password: "hashedpassword", picturePath: "p4.jpg", friends: [], location: "Austin, Texas", occupation: "Teacher", viewedProfile: 35000, impressions: 85000, createdAt: 1515211422, updatedAt: 1515211422, __v: 0 },
  { _id: userIds[7], firstName: "Michael", lastName: "Brown", email: "michael.brown@gmail.com", password: "hashedpassword", picturePath: "p8.jpg", friends: [], location: "Miami, Florida", occupation: "Photographer", viewedProfile: 38000, impressions: 88000, createdAt: 1615211422, updatedAt: 1615211422, __v: 0 },
  { _id: userIds[8], firstName: "Sophia", lastName: "Lopez", email: "sophia.lopez@gmail.com", password: "hashedpassword", picturePath: "p9.jpg", friends: [], location: "Boston, Massachusetts", occupation: "Nurse", viewedProfile: 27000, impressions: 77000, createdAt: 1715211422, updatedAt: 1715211422, __v: 0 },
  { _id: userIds[9], firstName: "James", lastName: "Wilson", email: "james.wilson@gmail.com", password: "hashedpassword", picturePath: "p10.jpg", friends: [], location: "San Francisco, California", occupation: "Engineer", viewedProfile: 50000, impressions: 100000, createdAt: 1815211422, updatedAt: 1815211422, __v: 0 },
  { _id: userIds[10], firstName: "Olivia", lastName: "Garcia", email: "olivia.garcia@gmail.com", password: "hashedpassword", picturePath: "p11.jpg", friends: [], location: "Portland, Oregon", occupation: "Chef", viewedProfile: 31000, impressions: 81000, createdAt: 1915211422, updatedAt: 1915211422, __v: 0 },
  { _id: userIds[11], firstName: "Daniel", lastName: "Hernandez", email: "daniel.hernandez@gmail.com", password: "hashedpassword", picturePath: "p12.jpg", friends: [], location: "Houston, Texas", occupation: "Journalist", viewedProfile: 36000, impressions: 86000, createdAt: 2015211422, updatedAt: 2015211422, __v: 0 },
  { _id: userIds[12], firstName: "Grace", lastName: "Lee", email: "grace.lee@gmail.com", password: "hashedpassword", picturePath: "p13.jpg", friends: [], location: "Philadelphia, Pennsylvania", occupation: "Artist", viewedProfile: 29000, impressions: 79000, createdAt: 2115211422, updatedAt: 2115211422, __v: 0 },
  { _id: userIds[13], firstName: "Ethan", lastName: "Perez", email: "ethan.perez@gmail.com", password: "hashedpassword", picturePath: "p14.jpg", friends: [], location: "Atlanta, Georgia", occupation: "Software engineer", viewedProfile: 47000, impressions: 97000, createdAt: 2215211422, updatedAt: 2215211422, __v: 0 },
  { _id: userIds[14], firstName: "Chloe", lastName: "Young", email: "chloe.young@gmail.com", password: "hashedpassword", picturePath: "p15.jpg", friends: [], location: "Las Vegas, Nevada", occupation: "Event planner", viewedProfile: 32000, impressions: 82000, createdAt: 2315211422, updatedAt: 2315211422, __v: 0 },
  { _id: userIds[15], firstName: "Ryan", lastName: "King", email: "ryan.king@gmail.com", password: "hashedpassword", picturePath: "p16.jpg", friends: [], location: "Phoenix, Arizona", occupation: "Marketing manager", viewedProfile: 33000, impressions: 83000, createdAt: 2415211422, updatedAt: 2415211422, __v: 0 },
  { _id: userIds[16], firstName: "Ava", lastName: "Scott", email: "ava.scott@gmail.com", password: "hashedpassword", picturePath: "p17.jpg", friends: [], location: "Orlando, Florida", occupation: "Fitness instructor", viewedProfile: 34000, impressions: 84000, createdAt: 2515211422, updatedAt: 2515211422, __v: 0 },
  { _id: userIds[17], firstName: "Liam", lastName: "Adams", email: "liam.adams@gmail.com", password: "hashedpassword", picturePath: "p18.jpg", friends: [], location: "San Diego, California", occupation: "Photographer", viewedProfile: 35000, impressions: 85000, createdAt: 2615211422, updatedAt: 2615211422, __v: 0 },
  { _id: userIds[18], firstName: "Mia", lastName: "Baker", email: "mia.baker@gmail.com", password: "hashedpassword", picturePath: "p19.jpg", friends: [], location: "Dallas, Texas", occupation: "Teacher", viewedProfile: 36000, impressions: 86000, createdAt: 2715211422, updatedAt: 2715211422, __v: 0 },
  { _id: userIds[19], firstName: "Noah", lastName: "Campbell", email: "noah.campbell@gmail.com", password: "hashedpassword", picturePath: "p20.jpg", friends: [], location: "Chicago, Illinois", occupation: "Architect", viewedProfile: 37000, impressions: 87000, createdAt: 2815211422, updatedAt: 2815211422, __v: 0 },
  { _id: userIds[20], firstName: "Ella", lastName: "Mitchell", email: "ella.mitchell@gmail.com", password: "hashedpassword", picturePath: "p21.jpg", friends: [], location: "Austin, Texas", occupation: "Designer", viewedProfile: 38000, impressions: 88000, createdAt: 2915211422, updatedAt: 2915211422, __v: 0 },
  { _id: userIds[21], firstName: "Alexander", lastName: "Carter", email: "alex.carter@gmail.com", password: "hashedpassword", picturePath: "p22.jpg", friends: [], location: "New York, New York", occupation: "Consultant", viewedProfile: 39000, impressions: 89000, createdAt: 3015211422, updatedAt: 3015211422, __v: 0 },
  { _id: userIds[22], firstName: "Lily", lastName: "Evans", email: "lily.evans@gmail.com", password: "hashedpassword", picturePath: "p23.jpg", friends: [], location: "Los Angeles, California", occupation: "Writer", viewedProfile: 40000, impressions: 90000, createdAt: 3115211422, updatedAt: 3115211422, __v: 0 },
  { _id: userIds[23], firstName: "Benjamin", lastName: "Wright", email: "ben.wright@gmail.com", password: "hashedpassword", picturePath: "p24.jpg", friends: [], location: "Seattle, Washington", occupation: "Engineer", viewedProfile: 41000, impressions: 91000, createdAt: 3215211422, updatedAt: 3215211422, __v: 0 },
  { _id: userIds[24], firstName: "Charlotte", lastName: "Harris", email: "charlotte.harris@gmail.com", password: "hashedpassword", picturePath: "p25.jpg", friends: [], location: "Miami, Florida", occupation: "Chef", viewedProfile: 42000, impressions: 92000, createdAt: 3315211422, updatedAt: 3315211422, __v: 0 },
  { _id: userIds[25], firstName: "Matthew", lastName: "Lewis", email: "matthew.lewis@gmail.com", password: "hashedpassword", picturePath: "p26.jpg", friends: [], location: "Boston, Massachusetts", occupation: "Teacher", viewedProfile: 43000, impressions: 93000, createdAt: 3415211422, updatedAt: 3415211422, __v: 0 },
  { _id: userIds[26], firstName: "Sophia", lastName: "Turner", email: "sophia.turner@gmail.com", password: "hashedpassword", picturePath: "p27.jpg", friends: [], location: "Portland, Oregon", occupation: "Artist", viewedProfile: 44000, impressions: 94000, createdAt: 3515211422, updatedAt: 3515211422, __v: 0 },
];

export const posts = [
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[0],
    firstName: "Harry",
    lastName: "Smith",
    description: "Morning jog along the beach. Feeling refreshed!",
    location: "South Beach, Florida",
    userPicturePath: "p3.jpg",
    likes: new Map([[userIds[1], true]]),
    comments: ["Keep it up!", "Looks refreshing!"]
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[1],
    firstName: "Anita",
    lastName: "Nguyen",
    description: "Visited the city today. It was busy but fun!",
    location: "New York City",
    userPicturePath: "p6.jpg",
    likes: new Map([[userIds[0], true], [userIds[2], true]]),
    comments: ["Glad you had fun!", "Great pic!"]
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[2],
    firstName: "Monica",
    lastName: "Lopez",
    description: "Working on a new coding project this week.",
    location: "Denver, Colorado",
    userPicturePath: "p5.jpg",
    likes: new Map([[userIds[0], true], [userIds[3], true]]),
    comments: ["Good luck!", "Excited to see the results!"]
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[3],
    firstName: "Hugh",
    lastName: "Johnson",
    description: "Enjoying a sunny day in LA.",
    location: "Los Angeles, California",
    userPicturePath: "p7.jpg",
    likes: new Map([[userIds[0], true], [userIds[1], true]]),
    comments: ["Looks great!", "Beautiful weather!"]
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[4],
    firstName: "Lena",
    lastName: "Martinez",
    description: "Just finished designing a new logo for a client.",
    location: "Chicago, Illinois",
    userPicturePath: "p1.jpg",
    likes: new Map([[userIds[1], true]]),
    comments: ["Looks amazing!", "Well done!"]
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[5],
    firstName: "David",
    lastName: "Kim",
    description: "Tried a new recipe today. It turned out great!",
    location: "Seattle, Washington",
    userPicturePath: "p2.jpg",
    likes: new Map([[userIds[0], true], [userIds[2], true]]),
    comments: ["Yum!", "Recipe please!"]
  }
];
