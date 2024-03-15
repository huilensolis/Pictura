import { forwardRef } from "react";

type TProps = {
  children: React.ReactNode;
};

type TRef = HTMLUListElement;

// eslint-disable-next-line react/display-name
const PostsGridContainer = forwardRef<TRef, TProps>(({ children }, ref) => {
  return (
    <ul
      className="break-inside-avoid gap-2 pt-2 lg:[column-count:3] [column-count:2] w-full"
      ref={ref}
    >
      {children}
    </ul>
  );
});

PostsGridContainer.displayName = "PostsGridContainer";

export { PostsGridContainer };
