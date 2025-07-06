export function Logo(): JSX.Element {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 190 190"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M102.256 188.162C97.6186 190.613 92.0647 190.613 87.4273 188.162L11.3881 147.988C6.20803 145.251 2.96875 139.885 2.96875 134.04L2.96875 55.9596C2.96875 50.115 6.20804 44.7487 11.3881 42.0119L87.4273 1.83758C92.0647 -0.612537 97.6186 -0.612537 102.256 1.83758L178.295 42.0119C183.475 44.7487 186.715 50.115 186.715 55.9596L186.715 134.04C186.715 139.885 183.475 145.251 178.295 147.988L102.256 188.162ZM17.2566 130.86C17.2566 133.8 18.9004 136.499 21.5152 137.859L86.6791 171.709C89.3137 173.075 92.4666 171.171 92.4666 168.21L92.4666 100.577C92.4666 97.6363 90.8224 94.9374 88.208 93.5771L23.0442 59.727C20.4089 58.3581 17.2566 60.2643 17.2566 63.2268L17.2566 130.86Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function LargeLogo(): JSX.Element {
  return (
    <div className="mr-4 flex items-center gap-2 lg:mr-6 text-foreground">
      <Logo />
      <span className="font-bold text-lg pt-0.5 font-gilroy">BadtzUI</span>
      <span className="text-[10px] mt-2 -ml-0.5 bg-muted px-1 rounded mr-1 leading-none py-0.5">
        Beta
      </span>
    </div>
  );
}
