import Layout from "@/layout/layout";
import Link from "next/link";
import styles from "../styles/Form.module.css";
import { HiAtSymbol, HiFingerPrint, HiOutlineEye } from "react-icons/hi";
import { useState } from "react";
import { useFormik } from "formik";
import { RegisterValidate } from "@/lib/validate";
import { useRouter } from "next/router";
import { useToast } from "@voidpkg/react-ui";
export default function Login() {
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit,
    validate: RegisterValidate,
  });
  async function onSubmit(values) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    };
    await fetch("/api/auth/signup", options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success(data.message);
          router.push("/login");
        }
        else {
          toast.error(data.message);
        }
      });
  }
  return (
    <Layout>
      <section className="w-3/4 mx-auto flex flex-col gap-10">
        <div className="title">
          <h1 className="text-gray-800 text-4xl font-bold py-4">Register</h1>
          <p className="w-3/4 mx-auto text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores,
            afficia
          </p>
        </div>

        <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
          <div className={styles.input_group}>
            <input
              className={styles.input_text}
              type="email"
              name="email"
              placeholder="Email"
              {...formik.getFieldProps("email")}
            />
            <span className="icon flex items-center px-4">
              <HiAtSymbol size={25} />
            </span>
          </div>
          {formik.errors.email && formik.touched.email && (
            <span className="text-rose-500">{formik.errors.email}</span>
          )}
          <div className={styles.input_group}>
            <input
              className={styles.input_text}
              type={visible ? "text" : "password"}
              name="password"
              placeholder="Password"
              {...formik.getFieldProps("password")}
            />
            <span
              onClick={() => {
                setVisible(!visible);
              }}
              className="icon hover:text-[#6366f1] flex items-center px-4 cursor-pointer"
            >
              {visible ? (
                <HiOutlineEye size={25} />
              ) : (
                <HiFingerPrint size={25} />
              )}
            </span>
          </div>
          {formik.errors.password && formik.touched.password && (
            <span className="text-rose-500">{formik.errors.password}</span>
          )}
          <div className={styles.input_group}>
            <input
              className={styles.input_text}
              type={visible ? "text" : "password"}
              name="password"
              placeholder="Confirm Password"
              // onChange={(e)=>{setConfirmPassword(e.target.value)}}
              {...formik.getFieldProps("confirmPassword")}
            />
            <span
              onClick={() => {
                setVisible(!visible);
              }}
              className="icon hover:text-[#6366f1] flex items-center px-4 cursor-pointer"
            >
              {visible ? (
                <HiOutlineEye size={25} />
              ) : (
                <HiFingerPrint size={25} />
              )}
            </span>
          </div>
          {formik.errors.confirmPassword && formik.touched.confirmPassword && (
            <span className="text-rose-500">
              {formik.errors.confirmPassword}
            </span>
          )}
          <div>
            <button
              disabled={
                formik.errors.confirmPassword ||
                formik.errors.password ||
                formik.errors.email
              }
              className={`${styles.input_button} disabled:opacity-50`}
              type="submit"
            >
              Register
            </button>
          </div>
          <p className="text-center text-gray-400">
            Do you already have an account?{" "}
            <Link href="/login" className="text-blue-500">
              Sign In
            </Link>
          </p>
        </form>
      </section>
    </Layout>
  );
}
