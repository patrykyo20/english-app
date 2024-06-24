import { FC } from "react";

interface SkeletonProps {
  variant?: 'rectangular' | 'circle';
  type?: 'image' | 'typography';
  width?: number;
  height?: number;
}

const Skeleton: FC<SkeletonProps> = ({
  variant,
  type,
  width,
  height,
}) => {
  return (
    <div
      className={`skeleton skeleton--${variant} skeleton__${type}`}
      style={{
        width: `${width}vh`,
        height: `${height}vh`,
      }}
    >

    </div>
  );
};

export default Skeleton;