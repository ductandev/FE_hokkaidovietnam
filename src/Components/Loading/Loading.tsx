import { SyncLoader } from "react-spinners";

// eslint-disable-next-line no-empty-pattern
export default function Loading() {

  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        zIndex: 10,
        background: "#e8e8e8",
        display: "flex",
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
