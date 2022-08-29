const mongoose = require('mongoose');

const { mongoDbConfig } = require("./config");
const url = mongoDbConfig.connectString;

mongoose.connect(url)
.catch( (err) => {
    console.error(`Error connecting to the database. n${err}`);
})

mongoose.connection;
const Schema = mongoose.Schema;
const ChatModelSchema = new Schema({
    author: String,
    email: {
        type: String,
        required: [true, 'email is required'],
    },
    message: String,
    id: String
},{ timestamps: true });
const ChatModel = mongoose.model('chat', ChatModelSchema );


async function get(user){
    const querySnapshot = await ChatModel.find({email: user}).sort({'timestamp': -1});
    return querySnapshot;
}

async function add(newMessage){
    let id;
    ChatModel.create({ email: newMessage.email, email: newMessage.email, author: newMessage.author, message: newMessage.message  }, function (err, chat) {
        if (err) return false;
        id = chat._id;
    })

    const doc = await ChatModel.findOne({ id });
    let updateChat = {...newMessage};
    updateChat.id = id;
    doc.overwrite(updateChat);
    const data = await doc.save();
    return data;
}

module.exports = {
    get,
    add,
};