import { useRouter } from "next/dist/client/router";
import Head from "next/head";

type MetaDataProps = {
  metaData: {
    title?: string;
    description?: string;
    keywords?: string;
    image?: { url: string };
  };
};

function PageMeta({ metaData }: MetaDataProps) {
  const { pathname } = useRouter();
  const { title, description, keywords, image } = metaData;

  return (
    <Head>
      <title>wemake {title && `| ${title}`}</title>
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      {image && <meta property="image" content={image.url} />}
      {pathname && (
        <meta property="og:url" content={`https://wemake.de${pathname}`} />
      )}
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      <meta property="og:site_name" content="wemake" />
      {image && <meta property="og:image" content={image.url} />}
      <meta name="og:type" content="website" />
    </Head>
  );
}

export default PageMeta;
