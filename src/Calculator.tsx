import React, { useState } from 'react';
import { Box, Button, Flex, Grid, Text } from '@chakra-ui/react';

interface CalculatorProps {}

const Calculator: React.FC<CalculatorProps> = () => {
  const [expression, setExpression] = useState<string>('');
  const [result, setResult] = useState<string>('');

  // APIから計算結果を取得する関数
  const calculate = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ expression })
      });
      const data = await response.json();
      console.log("Received data:", data);  // レスポンスの内容を確認
      setResult(data.result);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setResult('Error: ' + error.message);
      } else {
        setResult('Error: An unknown error occurred');
      }
    };
  };

  // ボタンのクリックイベントハンドラ
  const handleButtonClick = (value: string) => {
    if (value === 'C') {
      setExpression('');
      setResult('');
    } else if (value === '=') {
      calculate();
    } else {
      setExpression(expression + value);
    }
  };

  return (
    <Box p={4} bg="gray.100" rounded="md" shadow="md">
      <Text fontSize="xl" mb={4}>Calculator</Text>
      <Grid templateColumns="repeat(4, 1fr)" gap={4}>
        {['7', '8', '9', '-', '4', '5', '6', '*', '1', '2', '3', '+', '0', '=', '.', '/', 'C']
          .map(value => (
            <Button key={value} onClick={() => handleButtonClick(value)} colorScheme="blue" rounded="md">
              {value}
            </Button>
          ))}
      </Grid>
      <Flex mt={4} justify="center">
        <Text fontSize="2xl">
            Expression: {expression} <br />
            Result: {result || "0"}
        </Text>
      </Flex>
    </Box>
  );
};

export default Calculator;
