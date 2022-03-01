import Airtable from 'airtable';
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_NAME);

export async function fetchData(id) {
  const results = [
    ...await base('Table 1').select({ view: "Grid view" }).all()
  ].map(({ fields }) => fields);

  if (id) {
    return results.find(result =>
      result.id === id
    );
  }

  return results
}
