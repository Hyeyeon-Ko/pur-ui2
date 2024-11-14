import dynamic from "next/dynamic";

const LoginBody = dynamic(() => import("./page.body"));

const LoginPage = () => {
  return (
    <>
      <LoginBody />
    </>
  );
};

export default LoginPage;
