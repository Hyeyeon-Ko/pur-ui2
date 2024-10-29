import Button from "@/components/ui/atoms/button/Button";

interface ManagementHeaderProps {
  onSaveAll: () => void;
  headerTitle?: string;
}

const ManagementHeader: React.FC<ManagementHeaderProps> = ({ onSaveAll, headerTitle }) => {
  return (
    <>
      <div className="flex justify-end mx-auto py-2 w-[80%]">
        <Button
          color="Button_Default"
          mode="sm"
          content="전체 저장"
          onClick={onSaveAll}
        />
      </div>

      <div className="flex justify-end mb-2">
        <div className="mx-auto border-signature bg-signature rounded-tl-lg rounded-tr-lg w-[80%] p-4 text-white">
          {headerTitle}
        </div>
      </div>
    </>
  );
};

export default ManagementHeader;
