// functions/github-api.js
exports.handler = async (event) => {
    try {
        const { method, path, body } = JSON.parse(event.body);
        const response = await fetch(`https://api.github.com${path}`, {
            method,
            headers: {
                'Authorization': `token ${process.env.GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github+json',
                'X-GitHub-Api-Version': '2022-11-28'
            },
            body: body ? JSON.stringify(body) : undefined
        });
        const data = await response.json();
        return {
            statusCode: response.status,
            body: JSON.stringify(data)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Server error' })
        };
    }
};
