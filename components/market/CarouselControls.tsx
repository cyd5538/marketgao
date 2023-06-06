// components/CarouselControls.tsx
import classNames from "classnames";

type Props = {
  canScrollPrev: boolean;
  canScrollNext: boolean;
  onPrev(): void;
  onNext(): void;
};
const CarouselControls = (props: Props) => {
  return (
    <div className="flex justify-end gap-2 absolute bottom-[30px] right-4">
      <button
        onClick={() => {
          if (props.canScrollPrev) {
            props.onPrev();
          }
        }}
        disabled={!props.canScrollPrev}
        className={classNames({
          "px-4 py-2 text-black dark:text-white rounded-md": true,
          "bg-red-200 dark:bg-zinc-800": !props.canScrollPrev,
          "bg-red-100 dark:bg-zinc-700": props.canScrollPrev,
        })}
      >
        Prev
      </button>
      <button
        onClick={() => {
          if (props.canScrollNext) {
            props.onNext();
          }
        }}
        disabled={!props.canScrollNext}
        className={classNames({
          "px-4 py-2 text-black dark:text-white rounded-md": true,
          "bg-red-200 dark:bg-zinc-800": !props.canScrollNext,
          "bg-red-100 dark:bg-zinc-700": props.canScrollNext,
        })}
      >
        Next
      </button>
    </div>
  );
};
export default CarouselControls;
