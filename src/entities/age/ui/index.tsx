import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { FormItem, Input, Button, Text, Spacing } from "@vkontakte/vkui";

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
  const [searchName, setSearchName] = useState<string>("");

  const [whereRequest, setWhereRequest] = useState<"keyboard" | "button" | "">(
    ""
  );

  const queryClient = useQueryClient();

  const handleQueryKeyboard = (e: React.ChangeEvent<HTMLInputElement>) => {
    queryClient.cancelQueries([searchName]);
    setName(e.target.value);
    setWhereRequest("keyboard");
  };

  const handleFetchAge = (name: string) => {
    setSearchName(name);
    setWhereRequest("button");
    queryClient.cancelQueries([searchName]);
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

  const { register } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  if (isError) {
    return error.message;
  }

  return (
    <FormItem htmlFor="name">
      <Input
        id="name"
        type="text"
        {...(register && register("name"))}
        value={name}
        onChange={(e) => handleQueryKeyboard(e)}
      ></Input>
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
    </FormItem>
  );
};
