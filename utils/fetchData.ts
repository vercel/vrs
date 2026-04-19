import Airtable from 'airtable';
import type { FieldSet } from 'airtable';

function getBase() {
  if (
    !process.env.AIRTABLE_API_KEY ||
    !process.env.AIRTABLE_BASE_NAME ||
    !process.env.AIRTABLE_TABLE_NAME ||
    !process.env.AIRTABLE_VIEW_NAME
  ) {
    return null;
  }

  return new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_NAME);
}

export async function fetchData(id: string): Promise<FieldSet>;
export async function fetchData(): Promise<FieldSet[]>;

export async function fetchData(id?: string): Promise<FieldSet | FieldSet[]> {
  const base = getBase();
  const results = base ?
    [...await base(process.env.AIRTABLE_TABLE_NAME).select({ view: process.env.AIRTABLE_VIEW_NAME }).all()].map(({ fields }) => fields)
    // Use fake data if Airtable has not been configured
    : require('../mockdata').default;

  if (id) {
    return results.find(result =>
      result.id === id
    );
  }

  return results
}
