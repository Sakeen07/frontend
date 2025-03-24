import { Box, Flex, Text, Heading, VStack } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const ActivityLogItem = ({ username, action, time }) => (
  <Flex direction="column" mb={4}>
    <Flex flexWrap="wrap">
      <Text fontWeight="bold" mr={1}>{username}</Text>
      <Text overflow="hidden" textOverflow="ellipsis">{action}</Text>
    </Flex>
    <Text color="gray.500" fontSize="sm">{time}</Text>
  </Flex>
);

const ActivityLog = ({ username }) => {
  
  const activities = [
    {
      username,
      action: "logged in to the system",
      time: "5 minutes ago"
    },
    {
      username,
      action: "updated profile information",
      time: "10 minutes ago"
    },
    {
      username,
      action: "created a new project",
      time: "2 hours ago"
    },
    {
      username,
      action: "shared a document with team members",
      time: "Yesterday at 2:30 PM"
    }
  ];

  return (
    <Box
      borderWidth="2px"
      borderColor="gray.800"
      borderRadius="md"
      p={6}
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
      <Heading size="md" mb={4}>
        Recent Activity
      </Heading>
      <VStack align="stretch" spacing={3}>
        {activities.map((activity, index) => (
          <ActivityLogItem 
            key={index}
            username={activity.username}
            action={activity.action}
            time={activity.time}
          />
        ))}
      </VStack>
    </Box>
  );
};

ActivityLog.propTypes = {
  username: PropTypes.string.isRequired
};

ActivityLogItem.propTypes = {
  username: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired
};

export default ActivityLog;