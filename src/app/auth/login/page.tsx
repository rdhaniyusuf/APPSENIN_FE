'use client';
import React from "react";
import { loginUser } from "@/utils/Auth";
import { usePathname, useRouter } from "next/navigation";
import AuthFormComp from "@/components/AuthForm";
import { isAuthenticated } from "@/utils/Auth";
import Loading from "@/components/Loading";
import AlertComp from "@/components/Alert";
import { Alert, Button } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion"

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [showAlert, setShowAlert] = React.useState(false);
  const [showFailed, setShowFailed] = React.useState(false);
  const pathname = usePathname();
  const [message, setMessage] = React.useState("");

  const handleSubmit = async (username: string, password: string) => {
    const result = await loginUser(username, password);

    if (result.success) {
      console.log("Welcome", username);
      router.push("/");
    } else {
      console.log("Authentication failed:", result.message);
      setMessage(result.message || "");
      setShowFailed(true);
    }
  };

  React.useEffect(() => {
    setLoading(true);

    const checkAuth = () => {
      if (isAuthenticated()) {
        if (pathname === "/auth/login") {
          setShowAlert(true);
        }
      }
      setLoading(false);
    };

    const timer = setTimeout(checkAuth, 1000);
    return () => clearTimeout(timer);
  }, [pathname]);


  return (
    <>
      {loading && (
        <div className="w-full top-0 left-0 absolute min-h-screen backdrop-blur-sm z-10">
          <div className="flex flex-col items-center min-h-screen justify-center">
            <div className="mb-6">
              <Loading />
            </div>
          </div>
        </div>
      )}

      {!loading && showAlert && (
        <div className="w-full top-0 left-0 absolute min-h-screen backdrop-blur-sm z-10">
          <div className="flex flex-col items-center min-h-screen justify-center">
            <AlertComp
              colorA="success"
              contentA="You has login."
              titleA="Access Granted"
              buttonTextA="Back to Home"
              hrefA="/"
            />
          </div>
        </div>
      )
      }
      {!loading && !showAlert && (
        loginForm(handleSubmit, showFailed, setShowFailed,message)
      )}
    </>
  )
}

const loginForm = (handleSubmit: any, showFailed: boolean, setShowFailed: React.Dispatch<React.SetStateAction<boolean>>, message:string) => {
  return (
    <>
      <AlertLogin showFailed={showFailed} setShowFailed={setShowFailed} message={message} />
      <div className="grid 
    min-h-screen
    p-5
    xl:grid-flow-col
    xl:pt-20
    xl:min-h-[calc(21vh)]
    xl:max-h-fit
    xl:grid-cols-8
    ">
        <div className="
    col-start-1
    xl:col-span-6
    xl:col-start-2
    xl:grid
    xl:grid-cols-2
    ">
          < div className="bg-gray-100 xl:w-full xl:block xl:p-3 rounded-xl">
            {/* <Image src="/assets/login-logo.png" alt="Logo"
            className='hidden xl:block'
            /> */}
          </div>

          <div className="grid grid-rows-6">
            <div className='flex flex-col xl:w-3/4 xl:justify-start xl:align-middle xl:p-3 xl:h-full gap-2 py-12 
            row-start-3
            row-span-3
            '>
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-sm">Welcome back MRP Team</p>
              <AuthFormComp onSubmit={handleSubmit} mode="login" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const AlertLogin: React.FC<{ showFailed: boolean, setShowFailed: React.Dispatch<React.SetStateAction<boolean>>, message:string }> = ({ showFailed, setShowFailed, message}) => {
  return (
    <motion.div
      key={"div"}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      className="z-10 absolute top-10 left-1/2 transform -translate-x-1/2 flex flex-col gap-4 max-w-max p-4 mx-auto">
      {showFailed ? (
        <Alert
          color="warning"
          description={message+ ", Please try again."} 
          isVisible={showFailed}
          title={"Failed to login"}
          variant="faded"
          onClose={() => setShowFailed(false)}
        />
      )
        : null}
    </motion.div>
  )
}
