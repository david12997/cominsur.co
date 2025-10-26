import ButtonPrimary from "@/frontend/components/buttons/button.primary";
import Image from "next/image";

export default function Home() {
  return<>

    <ButtonPrimary onClick={() => alert('Button Clicked!')}>
      Click Me
    </ButtonPrimary>
  
  </> 

}
