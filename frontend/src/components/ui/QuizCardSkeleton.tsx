import Skeleton from "./Skeleton";
import Image from "next/image";

const QuizCardSkeleton = () => {
  return (
    <article className={`quizCard quizCard--blocked`}>
      <div className="quizCard__headline">
        <Skeleton variant={'rectangular'} width={5} height={2} /> 
        <Skeleton variant={'rectangular'} width={2} height={2} />
      </div>
      <Image
        src={'/desk.jpeg'}
        alt="test"
        width={200}
        height={200}
        className="quizCard__image"
      />
      <Skeleton variant={'rectangular'} width={26} height={2} />
      <Skeleton variant={'rectangular'} width={26} height={2} />
      <Skeleton variant={'rectangular'} width={15} height={5} />
    </article>
  );
};

export default QuizCardSkeleton;