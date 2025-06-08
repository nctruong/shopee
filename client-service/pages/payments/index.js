const OrderIndex = ({data}) => {
    const orders = data.data
    const { page, pageSize } = data.meta
    return (
        <div>
            <h4>Total: {data.meta.total}, Page: {page}, PageSize: {pageSize}</h4>
            <ul>
                {orders.map((order) => {
                    return (
                        <li key={order.id}>
                            <pre>{JSON.stringify(order, null, 2)}</pre>

                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

OrderIndex.getInitialProps = async (context, client) => {
    const {data} = await client.get('/api/payments', {
        params: {page: 1, pageSize: 5},
    });

    return {data: data};
};

export default OrderIndex;
