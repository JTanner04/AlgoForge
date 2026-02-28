import Image from "next/image";
import LoginPage from "./login/login";

function testCardinalDebug() {
  console.log("This is a debug function");
}

export default function Home() {
  return(
    <LoginPage />
  )
}
