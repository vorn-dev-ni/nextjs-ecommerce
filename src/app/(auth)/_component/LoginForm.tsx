"use client";
import { Button } from "@/components/ui/button";
import { LoaderIcon } from "lucide-react";
import Link from "next/link";
import { startTransition, useActionState, useEffect, useState } from "react";
import { loginAction } from "../_action/login.action";
import { useRouter } from "next/navigation";
import { useSetAtom } from "jotai";
import { userAtom } from "@/lib/atom";
import { toast } from "react-toastify";
import LoadingSpinner from "@/components/LoadingSpinner";

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
const LoginForm = () => {
  const actionHandler = async (
    _prevState: State,
    formData: FormData
  ): Promise<State> => {
    const result = await loginAction(formData);
    return (
      result ?? { success: false, message: "Unexpected error", data: null }
    );
  };
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const setUser = useSetAtom(userAtom);
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
          toast(`Welcome backs !!!`, {
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
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      {!state.success && state.message && (
        <p className="text-red-500">{state.message}</p>
      )}

      <Button
        type="submit"
        disabled={isPending}
        className="w-full text-white bg-blue-700 hover:bg-blue-600"
      >
        {isPending ? <LoaderIcon /> : "Login"}
      </Button>
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Don't have an account?{" "}
        <Link
          href="/register"
          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
        >
          Register Here
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
