'use client';

import { Button } from '@heroui/button';
import { CopyIcon } from './icons';
import { addToast } from '@heroui/toast';

export function Copy() {
  return (
    <Button
      size="sm"
      isIconOnly
      onPress={() =>
        addToast({ title: 'Password Copied', description: 'You can now paste it wherever needed' })
      }
    >
      <CopyIcon size={20} />
    </Button>
  );
}
