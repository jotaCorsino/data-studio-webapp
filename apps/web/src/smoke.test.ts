import { describe, expect, it } from 'vitest';

describe('web scaffold', () => {
  it('mantém o ambiente de testes ativo', () => {
    expect('data-studio').toContain('studio');
  });
});
