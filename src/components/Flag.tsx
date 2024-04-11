import clsx from "clsx";

export const Flag = ({
  code,
  className,
}: {
  code: string | undefined;
  className: string;
}) => {
  if (!code) return null;

  return (
    <img
      style={{
        outline: "1px solid rgba(255,255,255,0.3)",
      }}
      className={clsx(
        "aspect-[16/12] object-cover brightness-110 saturate-150",
        className,
      )}
      src={`https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/${code.toLowerCase()}.svg`}
    />
  );
};
