import axios from "axios";
import { Age } from "../types/types";

export const fetchAge = async (name: string, signal: AbortSignal) => {
  if (name === "") {
    return "Введите имя";
  } else {
    const response = await axios.get(`https://api.agify.io?name=${name}`, {
      signal,
    });
    const res: Age = response.data;
    return res.age;
  }
};

// отправка запроса с задержкой в 3 секунды

export const delayQuery = (
  name: string,
  signal: AbortSignal
): Promise<number | "Введите имя"> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetchAge(name, signal)
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    }, 3000);
  });
};
