import Link from 'next/link';

const LandingPage = ({ currentUser, products }) => {
    const productList = products.map((product) => {
        return (
            <tr key={product.id} className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>
                    <Link href="/products/[productId]" as={`/products/${product.id}`}>
                        View
                    </Link>
                </td>
            </tr>
        );
    });

    return (
        <div className="">
            <h3>Products</h3>

            <div className="overflow-x-auto">
                <table className="  max-w-[900px] min-w-[900px] divide-y divide-gray-200 border border-gray-300">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Link</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {productList}
                    </tbody>
                </table>
            </div>
        </div>
    )
        ;
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
    const {data} = await client.get('/api/products');

    return {products: data};
};

export default LandingPage;
