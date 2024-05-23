import plusBlackIcon from "../../assets/plus-black.svg";

interface Props {
  onClick: () => void;
  title: string;
}

export const CreateButton: React.FC<Props> = ({ onClick, title }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="border-dashed border-2 border-dark flex transition-all
                gap-3 justify-center items-center min-h-[40px] w-full rounded-lg hover:bg-slate-200"
    >
      <img src={plusBlackIcon} alt="plus.svg" className="h-[18px]" />
      {title}
    </button>
  );
};
