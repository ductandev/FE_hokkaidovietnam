import { useSelector } from "react-redux";
import { RootState } from "../../Redux/configStore";
import { SyncLoader } from "react-spinners";

type Props = {};

export default function Loading({ }: Props) {
  const { isLoadingContact } = useSelector((state: RootState) => state.contactReducer);

  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        zIndex: 10,
        background: "#e8e8e8",
        display:
          isLoadingContact
            ? "flex"
            : "none",
        justifyContent: "center",
        alignItems: "center",
        left: 0,
        top: 0,
        color: "#fff",
      }}
    >
      <SyncLoader color="#36d7b7" />
    </div>
  );
}
