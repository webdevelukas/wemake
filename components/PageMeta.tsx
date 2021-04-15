import Head from "next/head";

type MetaDataProps = {
  MetaData: {
    title: string;
    description: string;
    keywords: string;
    image: string;
    url: string;
  };
};

function PageMeta({ MetaData }: MetaDataProps) {
  const { title, description, keywords, image, url } = MetaData;

  return (
    <Head>
      <title>wemake | {title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="wemake" />
      <meta property="og:image" content={image} />
      <meta name="og:type" content="website" />
    </Head>
  );
}

export default PageMeta;
