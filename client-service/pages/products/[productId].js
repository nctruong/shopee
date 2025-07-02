import Router from 'next/router';
import useRequest from '../../hooks/use-request';
import randomImage from "../../lib/random-image";

const ProductShow = ({ product, currentUser }) => {
  const { doRequest, errors } = useRequest({
    url: '/api/orders',
    method: 'post',
    body: {
        userId: currentUser.id,
        productId: product.id,
    },
    onSuccess: (order) =>
      Router.push('/orders/[orderId]', `/orders/${order.id}`),
  });

  return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md space-y-4 border border-gray-200">
          <img
              src={product?.imageUrl || randomImage()}
              alt={product.title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition duration-300"
          />
          <h1 className="text-2xl font-bold text-gray-800">{product.title}</h1>
          <h4 className="text-lg text-gray-600">Price: ${product.price}</h4>

          {errors && <div className="text-red-500 text-sm">{errors}</div>}

          <button
              onClick={() => doRequest()}
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200"
          >
              Purchase
          </button>

          <div className="text-sm text-center">
              <a
                  href="https://docs.stripe.com/testing?testing-method=card-numbers#visa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
              >
                  Visa Cards
              </a>
          </div>
      </div>
  );
};

ProductShow.getInitialProps = async (context, client) => {
  const { productId } = context.query;
  const { data } = await client.get(`/api/products/${productId}`);

  return { product: data };
};

export default ProductShow;
