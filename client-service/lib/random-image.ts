const randomImage = () => {
    const products = ['t1.jpg', 't2.jpg', 't3.jpg', 't4.webp', 't5.webp', 't6.webp', 't7.jpg', 't8.jpeg', 't9.webp', 't10.png', 't11.webp'];
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    return `/images/${randomProduct}`;
}

export default randomImage;
