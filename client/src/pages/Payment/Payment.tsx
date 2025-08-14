import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { PatternFormat } from "react-number-format";
import { type IPaymentSchema } from "../../shared/validation/schema/schema";
import { paymentSchema } from "../../shared/validation/schema/schema";
import pay from "../../api/services/postServices";
import getId from "../../shared/functions/getId";
import routes from "../../shared/const/routes";
import Loader from "../../shared/components/Loader/Loader";
import { defaultValues } from "../../shared/validation/schema/defaultValues";

const Payment = () => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm<IPaymentSchema>({
    resolver: zodResolver(paymentSchema),
    mode: "onChange",
    defaultValues,
  });
  const navigate = useNavigate();

  const onSubmit = async (data: IPaymentSchema) => {
    const cleanedData = {
      pan: data.pan,
      expire: data.expire,
      cvc: data.cvc,
      cardholder: data.cardholder,
    };

    const response = await pay(getId(), cleanedData);
    reset({});
    navigate({
      pathname: routes.status,
      search: `?pid=${response.result.pid}`,
    });
  };

  return (
    <form
      className="max-w-sm mx-auto"
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
    >
      <h2 className="font-inter font-bold text-2xl mb-4">
        Оплата банковской картой
      </h2>
      <div className="mb-4">
        <label htmlFor="card-number-input" className="text-grey-900 font-inter">
          Номер карты
        </label>
        <div className="relative">
          <Controller
            render={({ field }) => (
              <PatternFormat
                value={field.value}
                onValueChange={(values) => {
                  field.onChange(values.value);
                }}
                placeholder="4242 4242 4242 4242"
                valueIsNumericString
                format="#### #### #### ####"
                className={`bg-gray-50 border ${
                  errors.pan ? "border-red-500" : "border-gray-300"
                } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pe-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              />
            )}
            control={control}
            name="pan"
          />
        </div>
        {errors.pan && (
          <p className="text-[10px] text-error absolute">
            {errors.pan.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="relative max-w-sm col-span-2">
          <label
            htmlFor="card-expiration-input"
            className="text-grey-900 font-inter"
          >
            Месяц/Год
          </label>
          <Controller
            render={({ field }) => (
              <PatternFormat
                value={field.value?.toString()?.replace("/", "")}
                onValueChange={(values) => {
                  field.onChange(values.formattedValue);
                }}
                placeholder="Default"
                valueIsNumericString
                format="##/##"
                className={`bg-gray-50 border ${
                  errors.pan ? "border-red-500" : "border-gray-300"
                } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pe-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              />
            )}
            control={control}
            name="expire"
          />
          {errors.expire && (
            <p className="text-[10px] text-error absolute">
              {errors.expire.message}
            </p>
          )}
        </div>

        <div className="col-span-1">
          <label htmlFor="cvv-input" className="text-grey-900 font-inter">
            Код
          </label>
          <Controller
            render={({ field }) => (
              <input
                type="password"
                className={`bg-gray-50 border ${
                  errors.pan ? "border-red-500" : "border-gray-300"
                } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pe-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                value={field.value}
                onChange={field.onChange}
                placeholder="CVC"
                maxLength={3}
                minLength={3}
                autoComplete="new-password"
              />
            )}
            control={control}
            name="cvc"
          />
          {errors.cvc && (
            <p className="text-[10px] text-error absolute max-w-[120px]">
              {errors.cvc.message}
            </p>
          )}
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="card-holder-name" className="text-grey-900 font-inter">
          Владелец карты
        </label>
        <div className="relative">
          <Controller
            render={({ field }) => (
              <input
                type="text"
                autoComplete="off"
                placeholder="IVAN IVANOV"
                value={field.value}
                onChange={field.onChange}
                className={`bg-gray-50 border ${
                  errors.cardholder ? "border-red-500" : "border-gray-300"
                } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pe-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              />
            )}
            control={control}
            name="cardholder"
          />
        </div>
        {errors.cardholder && (
          <p className="text-[10px] text-error absolute">
            {errors.cardholder.message}
          </p>
        )}
      </div>

      <div className="w-full flex justify-end">
        <button
          disabled={!!Object.values(errors).length}
          type="submit"
          className="bg-primary hover:bg-blue-700 text-white font-medium py-2.5 px-5 rounded-lg text-sm transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed w-28 flex justify-center items-center h-10"
        >
          {isSubmitting ? <Loader /> : "Оплатить"}
        </button>
      </div>
    </form>
  );
};

export default Payment;
