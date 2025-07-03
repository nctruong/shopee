import Link from 'next/link';
import {Fragment, useEffect, useState} from "react";
import randomImage from "../lib/random-image";

const LandingPage = ({ currentUser, jsonData }) => {
    const { data, meta: { total, page, pageSize } } = jsonData;
    const [currentPage, setCurrentPage] = useState(page);

    const totalPages = Math.ceil(total / pageSize);

    useEffect(() => {
        setCurrentPage(page);
    }, [page]);

    return (
        <div className="max-w-7xl mx-auto p-6 bg-white rounded-2xl ">
            <h3 className="text-2xl font-bold mb-2 text-gray-800">🛍️ Products</h3>
            <h4 className="text-sm text-gray-500 mb-6">
                Total: {total}, Page: {page}, Page Size: {pageSize}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {data.map((product) => (
                    <div
                        key={product.id}
                        className="group p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition"
                    >
                        <div className="relative w-full h-48 overflow-hidden rounded-md mb-4">
                            <img
                                src={product?.imageUrl || randomImage()}
                                alt={product.title}
                                className="w-full h-full object-cover transform group-hover:scale-105 transition duration-300"
                            />
                        </div>

                        <h5 className="text-lg font-semibold text-gray-800 truncate">{product.title}</h5>
                        <p className="text-xs text-gray-400">ID: {product.id}</p>

                        <div className="flex justify-between items-center mt-2">
                            <span className="text-sm font-medium text-green-600">${product.price}</span>
                            <span className="text-xs text-gray-500">Qty: {product.quantity}</span>
                        </div>

                        <Link
                            href={`/products/${product.id}`}
                            className="inline-block mt-4 text-sm text-blue-600 hover:text-blue-800 hover:underline transition"
                        >
                            View Details →
                        </Link>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-10 space-x-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((pageNum) => {
                        if (
                            pageNum === 1 || // always show first
                            pageNum === totalPages || // always show last
                            Math.abs(pageNum - currentPage) <= 1 // show current, prev, next
                        ) {
                            return true;
                        }
                        return false;
                    })
                    .map((pageNum, idx, arr) => {
                        const isGap =
                            idx > 0 && pageNum - arr[idx - 1] > 1;

                        return (
                            <Fragment key={pageNum}>
                                {isGap && (
                                    <span className="px-2 py-2 text-sm text-gray-400">…</span>
                                )}
                                <Link
                                    href={`/?page=${pageNum}&pageSize=${pageSize}`}
                                    className={`px-4 py-2 text-sm font-medium rounded-full border transition ${
                                        currentPage === pageNum
                                            ? 'bg-blue-600 text-white border-blue-600 shadow'
                                            : 'text-blue-600 border-blue-300 hover:bg-blue-100'
                                    }`}
                                >
                                    {pageNum}
                                </Link>
                            </Fragment>
                        );
                    })}
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
