import { GraphQLClient } from "graphql-request";

const requestGraphCMS = async (query: string) => {
  const endpoint = process.env.GRAPHCMS_API || "";
  const apiToken = process.env.GRAPHCMS_API_TOKEN;

  try {
    const graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });

    const data = await graphQLClient.request(query);

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default requestGraphCMS;
