import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Navbar = ({ setCurrentPage }: Props) => {
  const router = useRouter();

  return (
    <div className="flex top-0 sticky items-center p-5 shadow-md bg-[#7db146] shadow-[#4A7B43] h-14 z-50">
      <div
        className="flex items-center gap-2 italic text-lg"
        onClick={() => {
          router.push("/");
          setCurrentPage(0);
        }}
      >
        <Image
          src="https://note-keeper.s3.eu-north-1.amazonaws.com/note-keeper-icons/fabicon.png"
          alt="note-keeper-icon"
          width={40}
          height={40}
          className="cursor-pointer hover:scale-105"
        />
        <span className="font-bold text-gray-50">NoteKeeper</span>
      </div>
    </div>
  );
};

export default Navbar;
