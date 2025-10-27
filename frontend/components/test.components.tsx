"use client";

import BtnQuote from "./buttons/button.quote";




type TestComponentsProps = {
    
};

const TestComponents: React.FC<TestComponentsProps> = ({}) => {

  return<>
    <div className="p-4 border border-gray-300 rounded-md ">
      
      <BtnQuote text="Get a Quote" width={200} height={50} onClick={() => alert('Quote button clicked!')} />
    </div>
  </>
};

export default TestComponents;
