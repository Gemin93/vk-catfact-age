import axios from "axios";
import { Fact } from "../types/types";

export const fetchFact = async () => {
  const { data }: Fact = await axios.get("https://catfact.ninja/fact");
  const fact = data.fact;
  return fact;
};
