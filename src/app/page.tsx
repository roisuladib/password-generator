'use client';

import { useEffect, useState } from 'react';

import type { GenerateOptions } from 'generate-password';
import generator from 'generate-password';
import { passwordStrength } from 'check-password-strength';

import { Button } from '@heroui/button';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Switch } from '@heroui/switch';
import { NumberInput } from '@heroui/number-input';
import { Progress } from '@heroui/progress';
import { addToast } from '@heroui/toast';

import { Copy, ThemeSwitch } from '^/components';
import { cn } from '@heroui/theme';
import { STRENGTH_COLORS, STRENGTH_VALUES, TOGGLES } from '^/constants';

export default function Home() {
  const [result, setResult] = useState('');
  const [options, setOptions] = useState<GenerateOptions>({
    length: 8,
    lowercase: true,
    uppercase: true,
    numbers: false,
    symbols: false,
  });

  const generatePassword = () => {
    try {
      setResult(generator.generate(options));
    } catch (error) {
      setResult('');
      addToast({
        color: 'danger',
        title: error instanceof Error ? error.message : 'Something went wrong',
      });
    }
  };

  useEffect(generatePassword, []);

  const strength = passwordStrength(result);
  const color = STRENGTH_COLORS[strength.id] ?? 'default';
  const value = result ? STRENGTH_VALUES[strength.id] : 0;

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
            <Copy />
          </CardBody>

          {result && (
            <Progress label={strength.value} size="sm" color={color} value={value} />
          )}

          <NumberInput
            label="Password Length"
            labelPlacement="outside-left"
            size="sm"
            value={options.length}
            onValueChange={length => setOptions(prev => ({ ...prev, length }))}
            classNames={{
              label: cn('text-small !pl-0'),
              mainWrapper: cn('max-w-14 ml-auto'),
            }}
          />
          {TOGGLES.map(({ key, label, parse }) => (
            <div key={key} className="flex items-center justify-between gap-2">
              <p className="text-small">{label}</p>
              <Switch
                isSelected={Boolean(parse ? parse(options[key] as boolean | string) : options[key])}
                onValueChange={value => setOptions(prev => ({ ...prev, [key]: value }))}
              />
            </div>
          ))}
          <Button color="primary" fullWidth size="lg" onPress={generatePassword}>
            Generate
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
