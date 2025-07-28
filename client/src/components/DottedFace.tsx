import dottedface from "@/media/dottedface.gif";

export default function DottedFace(props: any) {
  return (
    <div className="flex justify-center items-center">
      <img src={dottedface} alt="loading..." width={350} height={350} />
    </div>
  );
}
