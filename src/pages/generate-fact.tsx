import { useQuery } from "@tanstack/react-query";
import Axios from "axios";

interface CatData {
  fact: string;
}

export const Fact = () => {
  const {
    data: catData,
    isLoading,
    isError,
    refetch,
  } = useQuery<CatData, Error>({
    queryKey: ["cat"],
    queryFn: () => Axios.get("https://catfact.ninja/fact").then((res) => res.data),
  });

  if (isError) {
    return <h1> Sorry, there was an error </h1>;
  }

  if (isLoading) {
    return <h1> Loading...</h1>;
  }

  return (
    <div>
      <h1>
        <p>Do you know? <br></br>{catData?.fact}</p>
      </h1>
      <button onClick={() => refetch()}>Generate Another Fact</button>
    </div>
  );
};
