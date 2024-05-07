
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Input, Button, Stack, Text, Link } from '@chakra-ui/react';

const Repositories = () => {
  const [repos, setRepos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await axios.get(`https://api.github.com/users/your-username/repos?page=${currentPage}&per_page=10`);
        setRepos(response.data);
        setTotalPages(Math.ceil(response.headers['x-total-count'] / 10));
      } catch (error) {
        console.error('Error fetching repositories:', error);
      }
    };
    fetchRepos();
  }, [currentPage]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://api.github.com/users/your-username/repos?q=${searchTerm}`);
      setRepos(response.data);
      setTotalPages(1);
    } catch (error) {
      console.error('Error searching repositories:', error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Box p={4}>
      <Stack direction="row" spacing={4} mb={4}>
        <Input
          placeholder="Search repositories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button onClick={handleSearch}>Search</Button>
      </Stack>
      <Stack spacing={4}>
        {repos.map((repo) => (
          <Box key={repo.id} borderWidth="1px" borderRadius="lg" p={4}>
            <Text fontSize="xl">
              <Link href={repo.html_url} isExternal>
                {repo.name}
              </Link>
            </Text>
            <Text>{repo.description}</Text>
          </Box>
        ))}
      </Stack>
      {totalPages > 1 && (
        <Stack direction="row" spacing={2} mt={4}>
          {Array.from({ length: totalPages }, (_, index) => (
            <Button key={index + 1} onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </Button>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default Repositories;
