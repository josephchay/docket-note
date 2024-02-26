import { motion } from 'framer-motion';

import searchIcon from '../../assets/icons/search.svg';

import './Header.css';

const Header = () => {
  return (
    <motion.header
      initial={{
        opacity: 0,
        translateY: 80,
      }}
      animate={{
        opacity: 1,
        translateY: 0,
      }}
      transition={{
        duration: 0.8,
        type: "spring",
        stiffness: 120,
      }}
      className="header"
    >
      <div className="search">
        <div className="icon">
          <img src={ searchIcon } alt="Search Icon" />
        </div>
        <input type="text" placeholder="Search" />
      </div>
    </motion.header>
  );
}

export default Header;
