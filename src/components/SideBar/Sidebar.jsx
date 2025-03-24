import './Sidebar.css'
import { Icon, IconButton } from '@chakra-ui/react'
import { MdDashboard, MdLibraryBooks, MdClose } from 'react-icons/md'
import { FaDatabase } from "react-icons/fa";
import { RiSurveyFill, RiFindReplaceLine } from "react-icons/ri";
import PropTypes from 'prop-types';

function Sidebar({ isOpen, isMobile, onClose }) {
  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'} ${isMobile ? 'mobile' : ''}`}>
      <div className="sidebar-top">
        <img src="./Yellow-user.jpeg" alt="User" />
        <h1>Admin</h1>
        {isMobile && (
          <IconButton
            icon={<MdClose />}
            aria-label="Close menu"
            onClick={onClose}
            size="sm"
            variant="ghost"
            color="white"
            ml="auto"
          />
        )}
      </div>
      <div className="sidebar-center">
        <a href="#">
          <Icon as={MdDashboard} mr={2}/>
          Dashboard
        </a>
        <a href="#">
          <Icon as={FaDatabase} mr={2}/>
          Data Lab
        </a>
        <a href="#">
          <Icon as={RiSurveyFill} mr={2}/>
          Surveys
        </a>
        <a href="#">
          <Icon as={MdLibraryBooks} mr={2}/>
          Library
        </a>
        <a href="#">
          <Icon as={RiFindReplaceLine} mr={2}/>
          Marketplace
        </a>
      </div>
      <div className="sidebar-bottom">
        <img src="./Yellow-user.jpeg" alt="User profile" />
        <p>M.J.M Sakeen</p>
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  isOpen: PropTypes.bool,
  isMobile: PropTypes.bool,
  onClose: PropTypes.func
};

export default Sidebar;