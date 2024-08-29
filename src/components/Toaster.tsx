import { Toaster as ToasterSpawner } from "react-hot-toast";

const Toaster = () => {
  return (
    <ToasterSpawner
      position="bottom-right"
      toastOptions={{
        style: {
          background: "#1A1C1E",
          border: "1px solid #2E3136",
          color: "white",
        },
      }}
    />
  );
};

export default Toaster;
