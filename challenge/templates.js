function home(posts, errors = {}, requests = {}) {
	const title = 'All posts';
	const content = /*html*/ `
    <h2>New post</h2>
    <form method="POST">
      <p>
        <label for="nickname">Nickname</label>
        <input id="nickname" name="nickname" value="${
					requests.nickname ? sanitise(requests.nickname) : ''
				}">
        ${validate(errors.nickname)}
      </p>
      <p>
        <label for="message">Message</label>
        <textarea id="message" name="message" value="${
					requests.message ? sanitise(requests.message) : ''
				}"></textarea>
        ${validate(errors.message)}
      </p>
      <button>Send</button>
    </form>
    <h2>All posts</h2>
    <ul>
      ${posts.map(postItem).join('')}
    </ul>
  `;
	return layout(title, content);
}

function sanitise(unsafeInput) {
	return unsafeInput.replaceAll('<', `&lt;`);
}

function validate(message) {
	if (message) {
		return `<span style="color: red">${message}</span>`;
	} else return '';
}

function postItem(post) {
	const date = new Date(post.created);
	const prettyDate = date.toLocaleString('en-GB');
	const sanitisedMessage = sanitise(post.message);
	const sanitisedNickname = sanitise(post.nickname);
	return `
    <li>
      <p>${sanitisedMessage}</p>
      <p>—${sanitisedNickname} | ${prettyDate}</p>
    </li>
  `;
}

function layout(title, content) {
	return /*html*/ `
    <!doctype html>
    <html>
      <head>
        <title>${title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
      </head>
      <body>
        ${content}
      </body>
    </html>
  `;
}

module.exports = { home };
