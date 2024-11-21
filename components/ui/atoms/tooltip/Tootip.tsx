import colors from "@/styles/colors";

const Tooltip = ({ text }: { text: string }) => (
  <span
    className="absolute left-16 top-1/2 transform -translate-y-1/2 px-2 py-1 rounded-md text-xs shadow-lg"
    style={{
      backgroundColor: colors.sub,
      color: colors.white,
      whiteSpace: "nowrap",
    }}
  >
    {text}
  </span>
);

export default Tooltip;
