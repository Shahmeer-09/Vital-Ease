import React from "react";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

interface submitbtnprops {
    children: React.ReactNode;
  classname?: string;
  isloading?: boolean;
}

const Submitbtn = ({ children, classname, isloading }: submitbtnprops) => {
  return (
    <Button
      disabled={isloading}
      className={classname ?? "shad-primary-btn w-full text-[18px] "}
      type="submit"
    >
      {isloading ? (
        <div className=" w-full flex h-full items-center justify-center  ">
          <Loader2 className=" animate-spin h-[20px] w-[20px] " />
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default Submitbtn;
