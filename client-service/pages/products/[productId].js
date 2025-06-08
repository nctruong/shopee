import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const ProductShow = ({ product, currentUser }) => {
  const { doRequest, errors } = useRequest({
    url: '/api/orders',
    method: 'post',
    body: {
        userId: currentUser.id,
      products: [product.id],
    },
    onSuccess: (order) =>
      Router.push('/orders/[orderId]', `/orders/${order.id}`),
  });

  return (
    <div>
      <h1>{product.title}</h1>
      <h4>Price: {product.price}</h4>
      {errors}
      <button onClick={() => doRequest()} className="btn btn-primary">
        Purchase
      </button>
        <br/>
        <a href="https://docs.stripe.com/testing?testing-method=card-numbers#visa" target="_blank" rel="noopener noreferrer">
            Visa Cards
        </a>
    </div>
  );
};

ProductShow.getInitialProps = async (context, client) => {
  const { productId } = context.query;
  const { data } = await client.get(`/api/products/${productId}`);

  return { product: data };
};

export default ProductShow;
