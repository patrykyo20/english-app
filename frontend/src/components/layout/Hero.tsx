import Link from "next/link";
import Button from "../ui/Button";
import Image from "next/image";

const Hero = () => {
  return (
    <main className="hero" style={{ backgroundImage: '/HeroImage.png'}}>
      <div className="container hero__container">
        <div className="hero__element--item1">
          <p className="typography__headline">LET’S LEARN YOUR ENGLISH</p>
          <h1 className="typography__title typography__title--primary hero__title">
            Take your English to the next level
          </h1>
          <p className="typography__paragraph--description hero__paragraph">
            With English io you can improve your English by 100% in the shortest possible time
          </p>
          <Link href={"#OurService"}>
            <Button
              title={"Get start learning"}
              className="hero__button"
            />
          </Link>
        </div>
        <div className="hero__element--item2">
          <Image
            src={"/Oval.svg"}
            alt={"oval"}
            width={500}
            height={500}
            className="hero__image"
          />
          <Image
            src={"/dots.svg"}
            alt="dots"
            width={100}
            height={100}
            className="icon--dots"
          />
          <Image
            src={"/round.svg"}
            alt="dots"
            width={150}
            height={150}
            className="icon--round"
          />
          <Image
            src={"/waves.svg"}
            alt="dots"
            width={100}
            height={100}
            className="icon--waves"
          />
        </div>
      </div>
    </main>
  );
};

export default Hero;

