import { z } from "zod";

export const paymentSchema = z.object({
  pan: z
    .string()
    .min(1, "Номер карты обязателен")
    .refine((val) => /^\d{13,19}$/.test(val), {
      message: "Номер карты должен содержать от 13 до 19 цифр",
    }),
  expire: z
    .string()
    .min(1, "Срок действия обязателен")
    .regex(
      /^(0[1-9]|1[0-2])\/(2[1-6])$/,
      "Формат MM/YY (месяц 01-12, год 21-26)"
    )
    .refine((val) => {
      const [month, year] = val.split("/");
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;
      if (
        parseInt(year, 10) === currentYear &&
        parseInt(month, 10) < currentMonth
      ) {
        return false;
      }
      return true;
    }, "Срок действия карты истек"),
  cvc: z
    .string()
    .min(3, "CVV должен содержать минимум 3 цифры")
    .max(3, "CVV должен содержать максимум 3 цифры")
    .regex(/^[0-9]+$/, "Только цифры"),
  cardholder: z
    .string()
    .min(1, "Имя владельца обязательно")
    .transform((val) => val.trim())
    .refine((val) => !/\d/.test(val), {
      message: "Цифры не допускаются",
    })
    .refine((val) => val.split(" ").length === 2, {
      message: "Введите имя и фамилию через один пробел",
    })
    .refine((val) => /^[A-Za-z]+\s[A-Za-z]+$/.test(val), {
      message: "Допустима только латиница и один пробел между словами",
    })
    .transform((val) => val.toUpperCase()),
});

export type IPaymentSchema = z.infer<typeof paymentSchema>;
