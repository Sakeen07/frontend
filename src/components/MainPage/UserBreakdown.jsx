/* eslint-disable react/prop-types */
import { Box, Text, Flex, HStack, VStack, Circle } from '@chakra-ui/react';
import { 
  PieChart as RePieChart, 
  Pie as RePie, 
  Cell as ReCell, 
  ResponsiveContainer,
  Tooltip 
} from 'recharts';
import { useState, useEffect } from 'react';

const UserBreakdown = () => {
  // Data for the pie chart
  const data = [
    { name: 'Staff', value: 151, color: '#21bfe8' },
    { name: 'Students', value: 200, color: '#107b96' },     
    { name: 'Students', value: 200, color: '#005469' },
    { name: 'Other', value: 200, color: '#33323f' },
  ];

  // Track the active sector
  const [activeIndex, setActiveIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 930);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  
  // Update state when screen size changes
  useEffect(() => {
    setIsMobile(isMobile);
  }, [isMobile]);

  // Handle pie sector click
  const handleClick = (data, index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const color = payload[0].payload.color;
      return (
        <Box 
          bg="white" 
          p={3} 
          borderRadius="md" 
          borderWidth="1px" 
          borderColor="gray.200"
          boxShadow="md"
        >
          <HStack spacing={2} mb={1}>
            <Circle size="8px" bg={color} />
            <Text fontWeight="bold">{payload[0].name}</Text>
          </HStack>
          <Text>Value: {payload[0].value}</Text>
        </Box>
      );
    }
    return null;
  };

  return (
    <Box
      borderWidth="2px"
      borderColor="black"
      borderRadius="md"
      p={isMobile ? 4 : 6}
      width="100%"
      height={isMobile ? "auto" : "580px"}
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
      {/* Daily Active Users Section */}
      <VStack align="stretch" spacing={6}>
        <VStack align="flex-start" spacing={1}>
          <Text fontSize="lg" fontWeight="medium" color="gray.700">
            Daily active users
          </Text>
          <Text fontSize="5xl" fontWeight="bold" lineHeight="1">
            1051
          </Text>
        </VStack>
        
        {/* User Distribution with Doughnut Chart */}
        <Flex 
          alignItems="flex-start" 
          direction={isMobile ? "column" : "row"}
          gap={isMobile ? 4 : 0}
        >
          <VStack align="flex-start" spacing={3} pt={4} flex="1">
            {data.map((item, index) => (
              <HStack 
                key={index} 
                spacing={2} 
                onClick={() => handleClick(item, index)}
                cursor="pointer"
                transition="all 0.2s"
              >
                <Circle size="10px" bg={item.color} />
                <Text 
                  fontSize={activeIndex === index ? "lg" : "md"}
                  fontWeight={activeIndex === index ? "bold" : "normal"}
                  transition="all 0.2s"
                >
                  {item.name} - {item.value}
                </Text>
              </HStack>
            ))}
          </VStack>
          
          <Box 
            height={isMobile ? "180px" : "200px"} 
            width={isMobile ? "100%" : "200px"} 
            mt={isMobile ? 2 : -6}
            sx={{
              '& svg': {
                outline: 'none',
                '& *': { outline: 'none' }
              }
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart 
                onClick={(e) => e.stopPropagation()}
                style={{ outline: 'none' }}
              >
                <Tooltip content={<CustomTooltip />} />
                <RePie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={isMobile ? 40 : 50}
                  outerRadius={isMobile ? 70 : 80}
                  stroke="#000"
                  strokeWidth={1}
                  dataKey="value"
                  nameKey="name"
                  onClick={handleClick}
                  activeIndex={activeIndex}
                  startAngle={90}
                  endAngle={-270}
                >
                  {data.map((entry, index) => (
                    <ReCell 
                      key={`cell-${index}`} 
                      fill={entry.color}
                      stroke="#000"
                      strokeWidth={1}
                      cursor="pointer"
                      outerRadius={activeIndex === index ? (isMobile ? 80 : 90) : (isMobile ? 70 : 80)}
                      style={{ outline: 'none' }}
                    />
                  ))}
                </RePie>
              </RePieChart>
            </ResponsiveContainer>
          </Box>
        </Flex>
        
        {/* Authentication Method Section */}
        <VStack align="flex-start" spacing={4} pt={4} pr={isMobile ? 0 : 16}>
          <Text fontSize="lg" fontWeight="medium">
            By authentication method
          </Text>
          
          <Flex 
            width="100%" 
            justify="space-between"
            direction={isMobile ? "column" : "row"}
            gap={isMobile ? 4 : 0}
          >
            <VStack align="flex-start" spacing={1}>
              <Text color="gray.700">Microsoft</Text>
              <Text fontSize="4xl" fontWeight="bold" lineHeight="1">
                100
              </Text>
            </VStack>
            
            <VStack align="flex-start" spacing={1}>
              <Text color="gray.700">Internal</Text>
              <Text fontSize="4xl" fontWeight="bold" lineHeight="1">
                100
              </Text>
            </VStack>
          </Flex>
          
          <VStack align="flex-start" spacing={1} pt={2}>
            <Text color="gray.700">SMAL</Text>
            <Text fontSize="4xl" fontWeight="bold" lineHeight="1">
              100
            </Text>
          </VStack>
        </VStack>
      </VStack>
    </Box>
  );
};

export default UserBreakdown;