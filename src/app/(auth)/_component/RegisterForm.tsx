"use client";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { userAtom } from "@/lib/atom";
import { useSetAtom } from "jotai";
import { LoaderIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { registerAction } from "../_action/register.action";

type State = {
  success: boolean;
  message: any;
  data: any;
};

const initialState: State = {
  success: false,
  message: "",
  data: null,
};
const RegisterForm = () => {
  const actionHandler = async (
    _prevState: State,
    formData: FormData
  ): Promise<State> => {
    const result = await registerAction(formData);
    return (
      result ?? { success: false, message: "Unexpected error", data: null }
    );
  };
  const router = useRouter();

  const [mutateState, setMutateState] = useState({
    username: "",
    email: "",
    password: "",
    cfpassword: "",
  });
  const setUser = useSetAtom(userAtom);
  const [isLoading, setLoading] = useState(false);
  const [state, formAction, isPending] = useActionState(
    actionHandler,
    initialState
  );
  useEffect(() => {
    if (state.success) {
      setLoading(true);
      startTransition(() => {
        setUser(state?.data);

        setTimeout(() => {
          router.back();
          setLoading(false);
          toast(`Welcome new user !!!`, {
            autoClose: 1000,
            pauseOnHover: false,
            type: "success",
            position: "top-center",
          });
        }, 1000);
      });
    }
  }, [state.success, router]);

  return (
    <form className="space-y-4 md:space-y-6" action={formAction}>
      {(isPending || isLoading) && <LoadingSpinner />}

      <div>
        <label
          htmlFor="username"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Username
        </label>
        <input
          type="username"
          name="username"
          id="username"
          value={mutateState?.username}
          placeholder="Username"
          onChange={(event) =>
            setMutateState((pre) => ({
              ...pre,
              username: event.target?.value?.trim(),
            }))
          }
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your email
        </label>
        <input
          type="email"
          onChange={(event) =>
            setMutateState((pre) => ({
              ...pre,
              email: event.target?.value?.trim(),
            }))
          }
          name="email"
          id="email"
          value={mutateState?.email}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@company.com"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          onChange={(event) =>
            setMutateState((pre) => ({
              ...pre,
              password: event.target?.value?.trim(),
            }))
          }
          value={mutateState?.password}
          id="password"
          placeholder="••••••••"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          //
        />
      </div>
      <div>
        <label
          htmlFor="confirm-password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Confirm password
        </label>
        <input
          type="password"
          onChange={(event) =>
            setMutateState((pre) => ({
              ...pre,
              cfpassword: event.target?.value?.trim(),
            }))
          }
          name="cfpassword"
          value={mutateState?.cfpassword}
          id="cfpassword"
          placeholder="••••••••"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          //
        />
      </div>
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="terms"
            aria-describedby="terms"
            type="checkbox"
            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-1 focus:ring-white dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
            required
          />
        </div>
        <div className="ml-3 text-sm">
          <label
            htmlFor="terms"
            className="font-light text-gray-500 dark:text-gray-300"
          >
            I accept the{" "}
            <a
              href="/"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Terms and Conditions
            </a>
          </label>
        </div>
      </div>
      {!state.success && state.message && (
        <p className="text-red-600 text-sm  md:text-md">{state.message}*</p>
      )}
      <Button
        type="submit"
        disabled={isPending}
        className="w-full text-white bg-blue-700 hover:bg-blue-600"
      >
        {isPending ? <LoaderIcon /> : "Create"}
      </Button>
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
        >
          Login here
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
