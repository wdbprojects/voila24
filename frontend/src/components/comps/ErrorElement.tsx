import { useRouteError } from "react-router-dom";
import Container from "./Container";

const ErrorElement = () => {
  const error = useRouteError();
  console.log(error);

  return (
    <Container>
      <div className="p-4">
        <h4 className="font-bold text-2xl">There was an error</h4>
      </div>
    </Container>
  );
};

export default ErrorElement;
