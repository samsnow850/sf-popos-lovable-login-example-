import { describe, expect, it } from 'vitest';
import { passwordsMatch } from '@/lib/auth-validation';

describe('Signup password confirmation', () => {
  it('accepts an identical confirmation password', () => {
    expect(passwordsMatch('ParkVisit2026', 'ParkVisit2026')).toBe(true);
  });
  it('rejects a different confirmation password', () => {
    expect(passwordsMatch('ParkVisit2026', 'Different2026')).toBe(false);
  });
});