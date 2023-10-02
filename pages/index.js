import path from 'path';
import fs from 'fs';
import Link from 'next/link';

function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/products/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps(context) {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFileSync(filePath);
  const data = JSON.parse(jsonData);

  // redirects to /no-data if no data is returned
  // if (!data) {
  //   return {
  //     redirect: { destination: '/no-data' },
  //   };
  // }

  //if no data is returned, redirect to 404 page
  // if (data.products.length === 0) {
  //   return { notFound: true };
  // }

  return {
    props: {
      products: data.products,
    },
    revalidate: 1,
  };
}

export default HomePage;
