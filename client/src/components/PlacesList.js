import { motion } from "framer-motion";
import { FaSpinner, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CardIMG from "../images/cardIMG1.jpg";
import PlaceListCard from "./PlaceListCard";
import CategorySelector from "./CategorySelector";

export default function PlacesList({
  categories,
  setKeyWord,
  keyWord,
  loading,
  places,
  error,
  openModal,
  setDirectionCoordinates,
}) {
  const navigate = useNavigate();
  return (
    <div className="w-[40%] h-[80%]  p-4 overflow-y-auto border ">
      <CategorySelector
        categories={categories}
        keyWord={keyWord}
        setKeyWord={setKeyWord}
      />

      <motion.h2
        className="text-xl font-bold text-black text-center mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Nearby {keyWord.charAt(0).toUpperCase() + keyWord.slice(1)}
      </motion.h2>

      {loading && (
        <motion.div
          className="flex justify-center items-center h-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <FaSpinner className="animate-spin text-yellow-500 text-4xl" />
        </motion.div>
      )}

      {error && !loading && (
        <motion.p
          className="text-red-500 text-center font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {error}
        </motion.p>
      )}

      {!loading && places.length > 0 && (
        <PlaceListCard
          CardIMG={CardIMG}
          keyWord={keyWord}
          openModal={openModal}
          places={places}
          setDirectionCoordinates={setDirectionCoordinates}
        />
      )}
    </div>
  );
}
