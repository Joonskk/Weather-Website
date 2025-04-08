import { motion } from 'framer-motion'

const Spinner: React.FC = () => {
  return (
    <div className="spinner-container">
      <motion.div
        className="spinner"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      >
      </motion.div>
    </div>
  )
}

export default Spinner;
