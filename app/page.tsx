import Image from "next/image";
import { promises as fs } from "fs";
import { Button } from "@nextui-org/react";
// import * from "../public/images";

export default async function Home() {
  const file = await fs.readFile(process.cwd() + "/app/data.json", "utf8");
  const data: DataType[] = JSON.parse(file);

  type DataType = {
    image: {
      desktop: string;
    };
    name: string;
    category: string;
    price: number;
  };

  interface Props {
    data: DataType[];
  }

  return (
    <main className="flex flex-row min-h-screen w-screen flex-wrap p-24 bg-orange-50 text-black">
      <div className="flex flex-col flex-wrap w-4/5">
        <h1 className="text-4xl font-bold">Desserts</h1>
        <div className="flex flex-row flex-wrap w-2/3 py-16 justify-between">
          {data.map(({ image, name, category, price }) => (
            <div key={name} className="flex flex-col px-2 py-4">
              <Image
                src={image.desktop}
                alt={name}
                width={225}
                height={225}
                className="rounded-lg"
              ></Image>
              <Button className="bg-red-200 flex flex-row w-max font-bold p-2 rounded-md translate-x-1/4 -translate-y-4 hover:scale-110 transition ease-in-out">
                <Image
                  src="/images/icon-add-to-cart.svg"
                  alt="My Icon"
                  width={20}
                  height={20}
                  className="m-1"
                />
                Add to basket
              </Button>
              <p>{name}</p>
              <p className="font-bold">{category}</p>
              <p className="text-orange-500">£{price}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col w-1/5">
        <div className="text-xl font-bold bg-white text-orange-600 w-full h-fit rounded-lg p-8">
          Your Cart (0){" "}
          <Image
            src="/images/illustration-empty-cart.svg"
            alt="My Icon"
            width={200}
            height={200}
            className="m-1"
          />{" "}
          <p className="text-gray-400 text-sm">
            Your added items will appear here
          </p>
        </div>
      </div>
    </main>
  );
}
