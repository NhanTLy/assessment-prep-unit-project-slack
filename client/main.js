const renderChat = (input) => {
	let result = '';
	console.log(input);
	for (let i = 0; i < input.length; i++) {
		result += renderMessage(input[i]);
	}
	return result;
};

const renderMessage = (message) => `
  <ul>
    <li>Created at: ${message.created_at}</li>
    <li>Created by: ${message.created_by}</li>
    <li>Message: ${message.message}</li>
  </ul>
`;

$(document).on('ready', () => {
	fetch('/api/')
		.then((resp) => resp.json())
		.then((data) => {
			document.querySelector('.chat').innerHTML += renderChat(data.chat);
		});
});

const btnAction = document.getElementById('btnId');

btnAction.addEventListener('click', function (e) {
	e.preventDefault();

	const message = document.getElementById('inputId').value;
	const createdAt = new Date().toString().slice(0, 25);
	const createdBy = 'theGuy';

	fetch('/api/send', {
		method: 'POST',
		body: JSON.stringify({ message, createdAt, createdBy }),
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
	})
		.then((resp) => resp.json())
		.then((data) => {
			document.getElementById('inputId').value = '';
			document.querySelector('.chat').innerHTML = renderChat(data.chat);
		});
});
