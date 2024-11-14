import dynamic from "next/dynamic";
const AddItemBody = dynamic(() => import("./page.body"), { ssr: false });

const AddItemPage = () => {
  return <AddItemBody />;
};

export default AddItemPage;
