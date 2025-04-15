'use client';

import { useState } from 'react';

import type { GenerateOptions } from 'generate-password';
import generator from 'generate-password';
import { Button } from '@heroui/button';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Copy, ThemeSwitch } from '^/components';
import { Switch } from '@heroui/switch';
import { NumberInput } from '@heroui/number-input';
import { toBoolean } from '^/utils';
import { cn } from '@heroui/theme';
import { addToast } from '@heroui/toast';

export default function Home() {
  const [options, setOptions] = useState<GenerateOptions>({
    length: 8,
    lowercase: true,
    uppercase: true,
    numbers: false,
    symbols: false,
  });
  const [result, setResult] = useState(generator.generate(options));

  const handleGeneratePassword = () => {
    try {
      setResult(generator.generate(options));
    } catch (error) {
      setResult('');
      let title = 'Something went wrong'
      if (error instanceof Error) {
         title = error.message
      }
      addToast({ color: 'danger', title });
    }
  };

  return (
    <Card>
      <CardHeader>
        <h1 className="text-3xl font-bold mr-auto">Password Generator</h1>
        <ThemeSwitch />
      </CardHeader>
      <CardBody>
        <div className="space-y-3">
          <CardBody className="h-12 items-center justify-between gap-2 flex-row bg-default-100 rounded-large">
            <p>{result}</p>
            {result && <Copy />}
          </CardBody>
          <NumberInput
            label="Password Length"
            labelPlacement="outside-left"
            size="sm"
            value={options.length}
            onValueChange={length => setOptions(prev => ({ ...prev, length }))}
            classNames={{ label: cn('text-small !pl-0'), mainWrapper: cn('max-w-14 ml-auto') }}
          />
          <div className="flex items-center justify-between gap-2">
            <p className="text-small">Include Uppercase (A–Z)</p>
            <Switch
              isSelected={options.uppercase}
              onValueChange={uppercase => setOptions(prev => ({ ...prev, uppercase }))}
            />
          </div>
          <div className="flex items-center justify-between gap-2">
            <p className="text-small">Include Lowercase (a–z)</p>
            <Switch
              isSelected={options.lowercase}
              onValueChange={lowercase => setOptions(prev => ({ ...prev, lowercase }))}
            />
          </div>
          <div className="flex items-center justify-between gap-2">
            <p className="text-small">Include Numbers (0–9)</p>
            <Switch
              isSelected={options.numbers}
              onValueChange={numbers => setOptions(prev => ({ ...prev, numbers }))}
            />
          </div>
          <div className="flex items-center justify-between gap-2">
            <p className="text-small">Include Symbols (!@#$...)</p>
            <Switch
              isSelected={toBoolean(options.symbols)}
              onValueChange={symbols => setOptions(prev => ({ ...prev, symbols }))}
            />
          </div>
          <Button color="primary" fullWidth size="lg" onPress={handleGeneratePassword}>
            Generate
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
