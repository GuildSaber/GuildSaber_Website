import clsx from "clsx";

type AvatarProps = {
  src: string | null | undefined;
  name: string;
  className: string;
};

function Avatar({ src, name, className, ...otherProps }: AvatarProps) {
  return (
    <div
      {...otherProps}
      className={clsx(
        "flex aspect-square items-center justify-center overflow-hidden bg-white/10",
        className,
      )}
    >
      {src ? (
        <img src={src} className="aspect-square h-full" />
      ) : (
        <span className="text-xs font-semibold uppercase tracking-wide text-white">
          {name.charAt(0)}
        </span>
      )}
    </div>
  );
}

export default Avatar;
