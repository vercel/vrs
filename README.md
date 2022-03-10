[![](https://assets.zeit.co/image/upload/v1556749417/front/blog/serverless-ecommerce/serverless-vrs.now.sh.png)](https://serverless-vrs.now.sh)

---

# VRS

VRS is a fully-functional e-commerce store using Next.js 12, three.js, NextAuth.js, Stripe Elements, and Airtable.  

## Demo 

https://serverless-vrs.vercel.app/

## Configuration 

### Step 1

Clone the repository 

```bash
$ git clone https://github.com/vercel/vrs.git
```

### Step 2 

In order to run this example locally, you have to set up your environment in the `.env.local` file.

Copy the `.env.local.example` file in this directory to `.env.local` (which will be ignored by Git):

```
cp .env.local.example .env.local
```

Then, open `.env.local` and add the missing environment variables:

- `NEXTAUTH_SECRET`: A secret value that's used by NextAuth.js to encrypt JWTs. Read more about NextAuth.js's secret value [here](https://next-auth.js.org/configuration/options#nextauth_secret). 
- `STRIPE_PK`:  Stripe's publishable key. Read more about Stripe's API keys [here](https://stripe.com/docs/keys#obtain-api-keys). 
- `STRIPE_SK`:  Stripe's secret key. Read more about Stripe's API keys [here](https://stripe.com/docs/keys#obtain-api-keys). 
- `GITHUB_CLIENT_ID`:  Client ID of your registered OAuth application within Github. Read more about creating a Github app [here](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app).
- `GITHUB_CLIENT_SECRET`:  Client Secret of your registered OAuth application within Github. Read more about creating a Github app [here](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app).

In this example, we're using [Airtable](https://airtable.com/) as our data source. If you haven't configured Airtable, this example uses the local mock data that can be found in `mockdata.ts`. You can optionally provide the necessary environment variables in the `.env.local` file. 


- `AIRTABLE_API_KEY` (_optional_): Airtable's API key. Read more about Airtable's API keys [here](https://support.airtable.com/hc/en-us/articles/219046777-How-do-I-get-my-API-key-) 
- `AIRTABLE_BASE_NAME`  (_optional_): Your Airtable's base name. Read more about Airtable's API keys [here](https://support.airtable.com/hc/en-us/articles/219046777-How-do-I-get-my-API-key-) 
- `AIRTABLE_TABLE_NAME`  (_optional_): Your Airtable's Table name. Read more about using data from Airtable [here](https://help.appsheet.com/en/articles/1785063-using-data-from-airtable#:~:text=The%20base%20ID%20can%20be,must%20be%20separated%20by%20commas).
- `AIRTABLE_VIEW_NAME`  (_optional_): Your Airtable's View name. Read more about using data from Airtable [here](https://help.appsheet.com/en/articles/1785063-using-data-from-airtable#:~:text=The%20base%20ID%20can%20be,must%20be%20separated%20by%20commas).

