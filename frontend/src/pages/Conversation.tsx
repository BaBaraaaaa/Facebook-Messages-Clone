import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

export default function Conversation() {
  const { id } = useParams();
  return (
    <Box p={2}>
      <Typography variant="h6">Cuộc trò chuyện: {id}</Typography>
      {/* Tin nhắn, input box sẽ nằm ở đây */}
    </Box>
  );
}
