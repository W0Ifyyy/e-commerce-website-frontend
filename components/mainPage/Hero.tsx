import { HeroButton } from "./hero/HeroButton";

export default function Hero() {
  return (
    <section className="h-[50vh] flex flex-col justify-center items-center text-center bg-gray-100">
      <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800">
        Elevate Your Shopping Experience
      </h1>
      <p className="text-base md:text-lg text-gray-600 mt-4">
        Discover unbeatable deals on the best products!
      </p>

      <HeroButton />
    </section>
  );
}
