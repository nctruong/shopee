import Link from 'next/link';
import { useEffect, useState } from "react";

const LandingPage = ({ currentUser, jsonData }) => {
    const { data, meta: { total, page, pageSize } } = jsonData;
    const [currentPage, setCurrentPage] = useState(page);

    const totalPages = Math.ceil(total / pageSize);

    useEffect(() => {
        setCurrentPage(page);
    }, [page]);

    return (
        <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow">
            <h3 className="text-2xl font-bold mb-2 text-gray-800">🛍️ Products</h3>
            <h4 className="text-sm text-gray-600 mb-6">
                Total: {total}, Page: {page}, Page Size: {pageSize}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((product) => (
                    <div
                        key={product.id}
                        className="p-4 border rounded-lg shadow-sm hover:shadow-md transition"
                    >
                        <h5 className="text-lg font-semibold text-gray-700">{product.title}</h5>
                        <p className="text-sm text-gray-500">ID: {product.id}</p>
                        <p className="text-sm text-gray-500">Price: ${product.price}</p>
                        <p className="text-sm text-gray-500">Quantity: {product.quantity}</p>
                        <Link
                            href={`/products/${product.id}`}
                            className="inline-block mt-3 text-blue-600 hover:underline"
                        >
                            View Details →
                        </Link>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-8 space-x-2">
                {Array.from({ length: totalPages }, (_, i) => (
                    <Link
                        key={i}
                        href={`/?page=${i + 1}&pageSize=${pageSize}`}
                        className={`px-4 py-2 text-sm rounded border ${
                            currentPage === i + 1
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'text-blue-600 border-blue-300 hover:bg-blue-100'
                        } transition`}
                    >
                        {i + 1}
                    </Link>
                ))}
            </div>
        </div>
    );
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
    const { page, pageSize } = context.query;
    const { data } = await client.get(`/api/products?page=${page}&pageSize=${pageSize}`);
    return { jsonData: data };
};

export default LandingPage;
