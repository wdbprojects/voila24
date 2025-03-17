import { Spinner } from "@nextui-org/react";

const Loader = () => {
  //return <span className="loading loading-ring loading-xl"></span>;
  return (
    <div className="flex gap-4">
      <Spinner size="lg" label="Loading..." color="warning" />
    </div>
  );
};

export default Loader;
