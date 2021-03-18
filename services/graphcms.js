import { GraphQLClient } from "graphql-request";

async function requestGraphCMS(query, variables) {
  const endpoint = process.env.GRAPHCMS_API || "";
  const apiToken = process.env.GRAPHCMS_API_TOKEN;

  try {
    const graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });

    const data = await graphQLClient.request(query, variables);

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default requestGraphCMS;
