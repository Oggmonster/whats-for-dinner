const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

const client = require('contentful').createClient({
  space: space,
  accessToken: accessToken,
});

export default async (req, res) => {  
  const contentType = req.query.contentType;
  const entries = await client.getEntries()
  if (entries.items) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(entries.items));    
    return;
  }  
  res.statusCode = 500;
  res.end('Something went wrong');
}