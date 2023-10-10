import { NextPage } from "next";
import Link from "next/link";

const MallPage: NextPage = () => {
  return (
    <section className="flex flex-col">
      <Link href="/use-shopping-cart">
        <div className="flex min-h-[550px] flex-col items-center">
          <img src="/use-shopping-cart.png" className="my-auto w-[550px]" />
          <h2 className="bottom font-black text-white">Start Shopping</h2>
        </div>
      </Link>
    </section>
  );
};

export default MallPage;
