import React from 'react';
import MainDrawer from './MainDrawer';
import Sidebar from './Sidebar';

interface MainMenuProps {
  isOpen: boolean;
  toggleDrawer: () => void;
}

function MenuDrawer({ isOpen, toggleDrawer }: MainMenuProps) {
  return (
    <MainDrawer isOpen={isOpen} toggleDrawer={toggleDrawer}>
      <Sidebar />
    </MainDrawer>
  );
}

export default MenuDrawer;
