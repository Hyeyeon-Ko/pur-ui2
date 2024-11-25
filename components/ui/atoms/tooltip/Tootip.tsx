import colors from "@/styles/colors";

const Tooltip = ({ text }: { text: string }) => (
  <span
    className="absolute left-16 top-1/2 -translate-y-1/2 transform rounded-md px-2 py-1 text-xs shadow-lg"
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
