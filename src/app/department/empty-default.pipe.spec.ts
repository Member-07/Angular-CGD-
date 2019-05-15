import { EmptyDefaultPipe } from './empty-default.pipe';

describe('EmptyDefaultPipe', () => {
  it('create an instance', () => {
    const pipe = new EmptyDefaultPipe();
    expect(pipe).toBeTruthy();
  });
});
