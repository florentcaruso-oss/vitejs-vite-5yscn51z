// @ts-nocheck
/* eslint-disable */

export default async (req) => {
if (req.method === 'OPTIONS') {
return new Response('ok', {
headers: {
'Access-Control-Allow-Origin': '*',
'Access-Control-Allow-Methods': 'POST',
'Access-Control-Allow-Headers': 'Content-Type',
}
});
}

const body = await req.json();

const key = [
process.env.ANTHROPIC_API_KEY
].join('');

const response = await fetch('https://api.anthropic.com/v1/messages', {
method: 'POST',
headers: {
'Content-Type': 'application/json',
'x-api-key': key,
'anthropic-version': '2023-06-01',
},
body: JSON.stringify(body),
});

const data = await response.json();

return new Response(JSON.stringify(data), {
headers: {
'Content-Type': 'application/json',
'Access-Control-Allow-Origin': '*',
}
});
};

export const config = { path: '/api/chat' };
