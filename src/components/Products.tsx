import products from "../data/products";
import { formatCurrencyString } from "use-shopping-cart";
import { useShoppingCart } from "use-shopping-cart";

const Products = () => {
  const { addItem, removeItem } = useShoppingCart();

  return (
    <section className="products max-h-[500px] overflow-y-auto bg-white py-[20px] pl-[20px]">
      {products.map((product) => (
        <div key={product.id} className="product">
          <h2>{product.name}</h2>
          <p className="price">
            {formatCurrencyString({
              value: product.price,
              currency: product.currency,
            })}
          </p>
          <div className="flex gap-[10px]">
            <button
              className="block rounded-md bg-[#008080] px-2 py-1 text-sm font-semibold text-white transition duration-200 hover:bg-gray-300"
              onClick={() => {
                console.log(product);
                addItem(product);
                // setOrder({product: product.name, price_id:product.price});
              }}
            >
              Add to cart
            </button>
            <button
              className="block rounded-md bg-[#008080] px-2 py-1 text-sm font-semibold text-white transition duration-200 hover:bg-gray-300"
              onClick={() => removeItem(product.id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Products;
