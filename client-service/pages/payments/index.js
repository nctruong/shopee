import {useEffect, useState} from "react";
import Link from "next/link";

const OrderIndex = ({jsonData}) => {
    const orders = jsonData.data

    const {data, meta: {total, page, pageSize}} = jsonData;
    const [currentPage, setCurrentPage] = useState(page);

    const totalPages = Math.ceil(total / pageSize);

    useEffect(() => {
        setCurrentPage(page);
    }, [page]);

    return (
        <div>
            <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg ">
                <h3 className="text-2xl font-bold mb-2 text-gray-800">📋 Payment</h3>
                <h4 className="text-sm text-gray-600 mb-6">
                    Total: {total}, Page: {page}, Page Size: {pageSize}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="group p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition"
                        >
                            <h5 className="text-lg font-semibold text-gray-700">{order.userId}</h5>
                            <p className="text-sm text-gray-500">ID: {order.status}</p>
                            <p className="text-sm text-gray-500">Price: ${order.createdAt}</p>
                            <p className="text-sm text-gray-500">Quantity: {order.amount}</p>
                            <Link
                                href={`/products/${order.id}`}
                                className="inline-block mt-3 text-blue-600 hover:underline"
                            >
                                View Details →
                            </Link>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center mt-8 space-x-2">
                    {Array.from({length: totalPages}, (_, i) => (
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
        </div>
    );
};

OrderIndex.getInitialProps = async (context, client) => {
    const {data} = await client.get('/api/payments', {
        params: {page: 1, pageSize: 5},
    });

    return {jsonData: data};
};

export default OrderIndex;
