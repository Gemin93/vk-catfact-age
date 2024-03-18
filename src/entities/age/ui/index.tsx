import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { FormItem, Button, Text, Spacing } from "@vkontakte/vkui";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchAge, delayQuery } from "../api";

const schema = yup.object({
  name: yup
    .string()
    .matches(/^[a-zA-Z]*$/, "Только буквы")
    .required(),
});

export const AgePage = () => {
  const [name, setName] = useState<string>("");
  // стейт для фиксации значени input при клики на кнопку
  const [searchName, setSearchName] = useState<string>("");
  // стейт для хранения значений откуда совершается запрос - клавиатура или кнопка "Узнать возраст"
  const [whereRequest, setWhereRequest] = useState<"keyboard" | "button" | "">(
    ""
  );

  const queryClient = useQueryClient();

  const handleQueryKeyboard = (e: React.ChangeEvent<HTMLInputElement>) => {
    // прерывание запроса
    queryClient.cancelQueries([searchName]);

    setName(e.target.value);
    setWhereRequest("keyboard");
  };

  const handleFetchAge = (name: string) => {
    // прерывание запроса
    queryClient.cancelQueries([searchName]);
    //фиксация значение input
    setSearchName(name);
    setWhereRequest("button");
  };

  const { data, isError, isLoading, error } = useQuery({
    queryKey: [searchName, name],
    queryFn: ({ signal }) => {
      if (whereRequest === "") {
        return "Введите имя";
      }

      if (whereRequest === "keyboard") {
        return delayQuery(name, signal);
      }

      if (whereRequest === "button") {
        return fetchAge(searchName, signal);
      }
    },
    staleTime: Infinity,
  });

  const {
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  if (isError) {
    return error.message;
  }

  return (
    <FormItem style={{ minWidth: "240px" }} htmlFor="name">
      <input
        style={{
          fontSize: "24px",
          padding: "5px",
          borderRadius: "5px",
          width: "80%",
        }}
        type="text"
        id="name"
        value={name}
        {...register("name")}
        onChange={(e) => handleQueryKeyboard(e)}
      />
      <Spacing size={16} />
      <Text style={{ minHeight: "20px" }}>
        {isLoading ? "Вычисляем возраст..." : data}
      </Text>
      <Spacing size={16} />
      <Button
        type="submit"
        appearance="positive"
        align="left"
        mode="primary"
        size="l"
        onClick={() => handleFetchAge(name)}
      >
        Узнать возраст
      </Button>
      <Text>{errors.name?.message}</Text>
    </FormItem>
  );
};
