import { FormItem, Button, Textarea } from "@vkontakte/vkui";
import axios from "axios";
import { useRef, useEffect, useState } from "react";

export const FactPage = () => {
  const [fact, setFact] = useState<string>("");
  const [error, setError] = useState(false);

  const fetchFact = async () => {
    try {
      const { data } = await axios.get("https://catfact.ninja/fact");
      setFact(data.fact);
      setError(false);
    } catch {
      setError(true);
    }
  };

  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (textAreaRef.current) {
      // записываем полученный факт в переменную
      const catFact = textAreaRef.current.value;
      // фокус на поле ввода
      textAreaRef.current.focus();
      // вычисляем длину первого слова
      const firstWord = catFact.split(" ")[0].length;
      // устанавливаем курсор после первого слова
      textAreaRef.current.setSelectionRange(firstWord, firstWord);
    }
  }, [fact]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
      }}
    >
      <FormItem
        style={{ width: "700px" }}
        htmlFor="fact"
        width={200}
        size={200}
      >
        <Textarea
          getRef={textAreaRef}
          rows={6}
          placeholder="Котофакт"
          translate="yes"
          id="fact"
          value={error ? "Ошибка загрузки данных" : fact}
        />
      </FormItem>
      <Button
        appearance="positive"
        align="left"
        mode="primary"
        size="l"
        onClick={fetchFact}
      >
        Новый факт
      </Button>
    </div>
  );
};
