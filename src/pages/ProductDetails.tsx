import ProductReview from '@/components/ProductReview';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { addToCart } from '@/redux/features/cart/cartSlice';
import { useGetSingleProductQuery } from '@/redux/features/product/productApi';
import { useAppDispatch } from '@/redux/hook';
import { IProduct } from '@/types/globalTypes';
import { JSXElementConstructor, Key, ReactElement, ReactFragment } from 'react';
import { useParams } from 'react-router-dom';

export default function ProductDetails() {
  const { id } = useParams();
  const { data: product } = useGetSingleProductQuery(id);
  const dispatch = useAppDispatch();

  const handleAddProduct = (product: IProduct) => {
    dispatch(addToCart(product));
    toast({
      description: 'Product Added',
    });
  };

  return (
    <>
      <div className="flex max-w-7xl mx-auto items-center border-b border-gray-300">
        <div className="w-[50%]">
          <img src={product?.image} alt="" />
        </div>
        <div className="w-[50%] space-y-3">
          <h1 className="text-3xl font-semibold">{product?.name}</h1>
          <p className="text-xl">Rating: {product?.rating}</p>
          <ul className="space-y-1 text-lg">
            {product?.features?.map(
              (
                feature:
                  | boolean
                  | Key
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  | ReactElement<any, string | JSXElementConstructor<any>>
                  | ReactFragment
                  | null
                  | undefined,
                index: Key | null | undefined
              ) => (
                <li key={index}>{feature}</li>
              )
            )}
          </ul>
          <Button onClick={() => handleAddProduct(product)}>Add to cart</Button>
        </div>
      </div>
      <ProductReview id={id as string} />
    </>
  );
}
