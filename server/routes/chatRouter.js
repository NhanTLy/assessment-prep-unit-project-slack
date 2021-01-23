const express = require('express');

const chatRouter = express.Router();

const chatController = require('../controllers/chatController');

// localhost:3000/api/
chatRouter.get('/', chatController.getChat, (req, res) =>
	res.status(200).json({ chat: res.locals.chat })
);

// localhost:3000/api/send
chatRouter.post(
	'/send',
	chatController.sendMessage,
	chatController.getChat,
	(req, res) => res.status(200).json({ chat: res.locals.chat })
);

// localhost:3000/api/delete
chatRouter.delete(
	'/delete',
	chatController.deleteMessage,
	chatController.getChat,
	(req, res) => res.status(200).json({ chat: res.locals.chat })
);

module.exports = chatRouter;
