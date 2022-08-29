const chatService = require("../services/chatService");


async function refreshMensajeria(io, email){
    const all = await chatService.getAll(email);
    io.to(email).emit("refreshMessages", all);
}

const support = (req, res) => {
    const io = req.chat;

    io.on('connection', (socket) => {
        socket.join(req.user.email);
        refreshMensajeria(io, req.user.email);
    });

    res.render("support", {
        loggedIn: true,
        signUp: false,
        scripts : [{ script: './js/handlebars.js'}, { script: './js/socket.io.min.js'}, { script: './js/chat.js'}]
    });   
}
const newMessage = async (req, res) => {
    const io = req.chat;
    const { body } = req;
    if (
        !body.msg
    ) {
        res
        .status(400)
        .send({
            status: "FAILED",
            data: {
            error:
                "Lo sentimos, no hemos recibido correctamente los campos requeridos. Revise la documentación.",
            },
        });
        return;
    }
    const newMessage = {
        message: body.msg,
        email: req.user.email,
        author: req.user.nombre,
    };
    const createdMessage = await chatService.createNewMessage(newMessage);
    if(createdMessage){
        refreshMensajeria(io, req.user.email);
    }else{
        res.status(400).send({ status: "FAILED", data: {error: "Lo sentimos, no pudimos agregar el elemento."} });
    }
}

const newAdminMessage = async (req, res) => {
    const io = req.chat;
    const { body } = req;
    if (
        !body.msg ||
        !body.email
    ) {
        res
        .status(400)
        .send({
            status: "FAILED",
            data: {
            error:
                "Lo sentimos, no hemos recibido correctamente los campos requeridos. Revise la documentación.",
            },
        });
        return;
    }
    const newMessage = {
        message: body.msg,
        email: body.email,
        author: 'Chatbot',
    };
    const createdMessage = await chatService.createNewMessage(newMessage);
    if(createdMessage){
        refreshMensajeria(io, body.email);
        res.status(200).send({ status: "OK" });
    }else{
        res.status(400).send({ status: "FAILED", data: {error: "Lo sentimos, no pudimos agregar el elemento."} });
    }
}

module.exports = {
    support,
    newMessage,
    newAdminMessage,
};