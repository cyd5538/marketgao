// components/CarouselControls.tsx
import classNames from "classnames";
import { FcNext, FcPrevious } from "react-icons/fc";

type Props = {
  canScrollPrev: boolean;
  canScrollNext: boolean;
  onPrev(): void;
  onNext(): void;
};
const CarouselControls = (props: Props) => {
  return (
    <div className="flex justify-end gap-2 absolute bottom-[10px] right-4">
      <button
        onClick={() => {
          if (props.canScrollPrev) {
            props.onPrev();
          }
        }}
        disabled={!props.canScrollPrev}
        className={classNames({
          "px-4 py-2 text-black dark:text-white rounded-md hover:opacity-100 opacity-50": true,
          "bg-white dark:bg-zinc-800": !props.canScrollPrev,
          "bg-white dark:bg-zinc-700": props.canScrollPrev,
        })}
      >
        <FcPrevious/>
      </button>
      <button
        onClick={() => {
          if (props.canScrollNext) {
            props.onNext();
          }
        }}
        disabled={!props.canScrollNext}
        className={classNames({
          "px-4 py-2 text-black dark:text-white rounded-md hover:opacity-100 opacity-50": true,
          "bg-white dark:bg-zinc-800": !props.canScrollNext,
          "bg-white dark:bg-zinc-700": props.canScrollNext,
        })}
      >
        <FcNext/>
      </button>
    </div>
  );
};
export default CarouselControls;
