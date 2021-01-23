const db = require('../models/model');

// create "chat" table
const createTableQuery = `
  CREATE TABLE "chat" (
    "_id" serial NOT NULL UNIQUE,
    "message" varchar(255) NOT NULL,
    "created_at" timestamp NOT NULL,
    "created_by" varchar NOT NULL
  )
`;

const chatController = {};

chatController.getChat = (req, res, next) => {
	const query = `SELECT * FROM chat`;
	db.query(query)
		.then((data) => {
			res.locals.chat = data.rows;
			return next();
		})
		.catch((err) => next(`Error in chatController.getChat: ${err}`));
};

chatController.sendMessage = (req, res, next) => {
	const query = `INSERT INTO chat (message, created_at, created_by) VALUES($1, $2, $3) RETURNING *`;
	const vals = [req.body.message, req.body.createdAt, req.body.createdBy];
	db.query(query, vals)
		.then((data) => next())
		.catch((err) => next(`Error in chatController.sendMessage: ${err}`));
};

chatController.deleteMessage = (req, res, next) => {
	const query = `DELETE FROM chat WHERE _id=$1 RETURNING *`;
	const vals = [req.params._id];

	db.query(query, vals)
		.then((data) => next())
		.catch((err) => next(`Error in chatController.deleteMessage: ${err}`));
};

module.exports = chatController;
