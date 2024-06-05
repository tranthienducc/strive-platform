import { ChildrenType } from "@/utils/types/type";

const Title = ({ children }: ChildrenType) => {
  return (
    <>
      <div className="flex justify-center mb-3">
        <h1 className="px-4 py-1 rounded-xl text-black bg-gradient-1">
          {children}
        </h1>
      </div>
    </>
  );
};

export default Title;
