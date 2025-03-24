import { Box, Text } from '@chakra-ui/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Box
        bg="white"
        p={2}
        borderWidth="1px"
        borderColor="gray.200"
        borderRadius="md"
        boxShadow="md"
      >
        <Text fontWeight="bold">{label}</Text>
        <Text>Users: {payload[0].value}</Text>
      </Box>
    );
  }
  return null;
};

const UserActivityChart = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 1060);
    };
    
    checkScreenSize(); // Check initially
    window.addEventListener('resize', checkScreenSize); // Add listener
    
    return () => window.removeEventListener('resize', checkScreenSize); // Cleanup
  }, []);
  
  // Update state when screen size changes
  useEffect(() => {
    setIsMobile(isMobile);
  }, [isMobile]);

  // Sample data based on the image
  const data = [
    { date: '1 Sep', users: 230 },
    { date: '2 Sep', users: 750 },
    { date: '3 Sep', users: 380 },
    { date: '4 Sep', users: 920 },
    { date: '5 Sep', users: 130 },
    { date: '6 Sep', users: 680 },
    { date: '7 Sep', users: 300 }
  ];
  
  return (
    <Box
      borderWidth="2px"
      borderColor="black"
      borderRadius="md"
      p={isMobile ? 3 : 5}
      width="100%"
      height={isMobile ? "350px" : "410px"}
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
      <Text fontSize="xl" fontWeight="bold" mb={4} pl={isMobile ? 2 : 4}>
        User activity
      </Text>
      
      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={data} margin={{ 
          top: 20, 
          right: isMobile ? 10 : 30, 
          left: isMobile ? 0 : 20, 
          bottom: 20 
        }}>
          <CartesianGrid vertical={false} stroke="#f5f5f5" />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: isMobile ? 12 : 14 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: isMobile ? 12 : 14 }}
            domain={[0, 1200]}
            ticks={[200, 400, 600, 800, 1000, 1200]}
            width={isMobile ? 30 : 40}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: 'gray', strokeDasharray: '3 3' }}
          />
          <Line
            type="monotone"
            dataKey="users"
            stroke="#000"
            strokeWidth={2}
            dot={false}
            activeDot={{
              r: isMobile ? 6 : 8,
              stroke: 'black',
              strokeWidth: 2,
              fill: 'white'
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

CustomTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.array,
  label: PropTypes.string,
};

export default UserActivityChart;