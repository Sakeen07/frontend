import { useState, useEffect } from "react";
import Sidebar from "../SideBar/Sidebar";
import { Box, Flex, IconButton, Text, Stack, Grid, GridItem } from '@chakra-ui/react';
import UserActivityChart from "./UserActivityChart";
import UserBreakdown from "./UserBreakdown";
import ActivityLog from "./ActivityLog";
import "./MainPage.css";

function MainPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  
  // Use custom media query implementation
  useEffect(() => {
    const checkScreenSize = () => {
      const isSmall = window.innerWidth <= 1060;
      setIsMobile(isSmall);
      setSidebarOpen(!isSmall);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  
  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // Close sidebar (for mobile)
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <Flex h="100vh">
      {/* Overlay for mobile sidebar */}
      {isMobile && isSidebarOpen && (
        <Box 
          className={`sidebar-overlay ${isSidebarOpen ? 'show' : ''}`}
          onClick={closeSidebar}
        />
      )}
      
      <Sidebar 
        isOpen={isSidebarOpen} 
        isMobile={isMobile} 
        onClose={closeSidebar}
      />
      
      <Box 
        flex="1"
        ml={isSidebarOpen && !isMobile ? "250px" : "0"}
        transition="margin-left 0.3s"
        p={4}
        w="100%"
        overflowY="auto"
      >
        {/* Mobile menu button */}
        {isMobile && (
          <IconButton
          aria-label="Open menu"
          onClick={toggleSidebar}
          mb={4}
          borderRadius="md"
          width="40px"
          height="40px"
          bg="black"
          p={0}
          position="relative"
          _hover={{ bg: "#333" }}
          _before={{
            content: '""',
            position: 'absolute',
            borderRadius: 'md',
            border: '1px solid black',
            transform: 'translate(-3px, -3px)',
            pointerEvents: 'none',
            zIndex: -1
          }}
          >
            <Flex 
              direction="column" 
              justify="center" 
              align="center" 
              height="100%" 
              width="100%"
            >
              <Box bg="white" h="2px" w="20px" mb="4px"></Box>
              <Box bg="white" h="2px" w="20px" mb="4px"></Box>
              <Box bg="white" h="2px" w="20px"></Box>
            </Flex>
          </IconButton>
        )}
        
        {/* Main content */}
        <Box maxW="1200px" mx="auto">
          {/* Responsive layout - grid for desktop, stack for mobile */}
          {!isMobile ? (
            // Desktop layout (two-column)
            <Grid templateColumns="repeat(2, 1fr)" gap={6} mb={6}>
              {/* Left column - stacked components */}
              <GridItem w="100%">
                <Flex direction="column" height="100%">
                  {/* Daily Active Users - with reduced height */}
                  <Box
                    borderWidth="2px"
                    borderColor="black"
                    borderRadius="md"
                    p={4}
                    bg="white"
                    width="100%"
                    position="relative"
                    mb={4}
                    _before={{
                      content: '""',
                      position: 'absolute',
                      top: '-2px',
                      left: '-2px',
                      right: '-2px',
                      bottom: '-2px',
                      borderRadius: 'md',
                      border: '1px solid black',
                      transform: 'translate(-3px, -3px)',
                      pointerEvents: 'none',
                    }}
                  >
                    <Flex justifyContent="space-between" alignItems="flex-start">
                      {/* Daily Active Users */}
                      <Stack spacing={0}>
                        <Text fontSize="sm" fontWeight="medium" color="gray.700">
                          Daily active users
                        </Text>
                        <Text fontSize="4xl" fontWeight="bold" lineHeight="1.2">
                          1051
                        </Text>
                        <Text fontSize="sm" color="gray.500">
                          18 Mar 2020
                        </Text>
                      </Stack>
                      {/* Monthly Active Users */}
                      <Stack spacing={0}>
                        <Text fontSize="sm" fontWeight="medium" color="gray.700">
                          Monthly active users
                        </Text>
                        <Text fontSize="4xl" fontWeight="bold" lineHeight="1.2">
                          1051
                        </Text>
                        <Text fontSize="sm" color="gray.500">
                          18 Mar 2020
                        </Text>
                      </Stack>
                      {/* Daily Time Per Active User */}
                      <Stack spacing={0}>
                        <Text fontSize="sm" fontWeight="medium" color="gray.700">
                          Daily time per active user
                        </Text>
                        <Text fontSize="4xl" fontWeight="bold" lineHeight="1.2">
                          1051
                        </Text>
                        <Text fontSize="sm" color="gray.500">
                          18 Mar 2020
                        </Text>
                      </Stack>
                    </Flex>
                  </Box>
                  
                  {/* UserActivityChart - below Daily Active Users box */}
                  <Box flex="1">
                    <UserActivityChart />
                  </Box>
                </Flex>
              </GridItem>
              
              {/* Right column - UserBreakdown (full height) */}
              <GridItem w="100%">
                <Box height="100%">
                  <UserBreakdown />
                </Box>
              </GridItem>
            </Grid>
          ) : (
            // Mobile layout (stacked)
            <Flex direction="column" gap={6} mb={6}>
              {/* Daily Active Users */}
              <Box
                borderWidth="2px"
                borderColor="black"
                borderRadius="md"
                p={4}
                bg="white"
                width="100%"
                position="relative"
                _before={{
                  content: '""',
                  position: 'absolute',
                  top: '-2px',
                  left: '-2px',
                  right: '-2px',
                  bottom: '-2px',
                  borderRadius: 'md',
                  border: '1px solid black',
                  transform: 'translate(-3px, -3px)',
                  pointerEvents: 'none',
                }}
              >
                <Stack spacing={4}>
                  {/* Daily Active Users */}
                  <Stack spacing={0}>
                    <Text fontSize="sm" fontWeight="medium" color="gray.700">
                      Daily active users
                    </Text>
                    <Text fontSize="4xl" fontWeight="bold" lineHeight="1.2">
                      1051
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      18 Mar 2020
                    </Text>
                  </Stack>
                  
                  {/* Monthly Active Users */}
                  <Stack spacing={0}>
                    <Text fontSize="sm" fontWeight="medium" color="gray.700">
                      Monthly active users
                    </Text>
                    <Text fontSize="4xl" fontWeight="bold" lineHeight="1.2">
                      1051
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      18 Mar 2020
                    </Text>
                  </Stack>
                  
                  {/* Daily Time Per Active User */}
                  <Stack spacing={0}>
                    <Text fontSize="sm" fontWeight="medium" color="gray.700">
                      Daily time per active user
                    </Text>
                    <Text fontSize="4xl" fontWeight="bold" lineHeight="1.2">
                      1051
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      18 Mar 2020
                    </Text>
                  </Stack>
                </Stack>
              </Box>
              
              {/* UserActivityChart */}
              <Box>
                <UserActivityChart />
              </Box>
              
              {/* UserBreakdown */}
              <Box>
                <UserBreakdown />
              </Box>
            </Flex>
          )}
          
          {/* Activity Log */}
          <Box>
            <ActivityLog username="M.J.M Sakeen" />
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}

export default MainPage;