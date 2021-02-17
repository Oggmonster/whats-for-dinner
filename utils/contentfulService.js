const contentful = require('contentful-management');

const spaceId = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_MANAGEMENT_TOKEN;

const client = contentful.createClient({
  accessToken: accessToken
});

const mapDataToFields = (data, existing = {}) => {
  return Object.keys(data).reduce((prev, curr) => {
    const fields = prev.fields || {};
    return { fields: { ...fields,  [curr]: { 'en-US': data[curr] }}};
  }, existing);
};

const mapFieldsToData = (fields) => {
  return Object.keys(fields).reduce((prev, curr) => {
    return { ...prev, [curr]: fields[curr]['en-US'] };
  }, {});
}

export async function getEntry(entryId) {
  const result = await client.getSpace(spaceId)
    .then((space) => space.getEnvironment('master'))
    .then((environment) => environment.getEntry(entryId));
  
  return { ...mapFieldsToData(result.fields), id: result.sys.id };
};


export async function addEntry(contentType, data) {
  const result = client.getSpace(spaceId)
  .then((space) => space.getEnvironment('master'))
  .then((environment) => environment.createEntry(contentType, mapDataToFields(data))); 
  return result;
};

export async function updateEntry(entryId, data) {
  const result = client.getSpace(spaceId)
  .then((space) => space.getEnvironment('master'))
  .then((environment) => environment.getEntry(entryId))
  .then((entry) => {
    //do update stuff here
    Object.keys(data).forEach(key => {
      entry.fields[key]['en-US'] = data[key];
    });
    return entry.update()
  })
  return result;
};
