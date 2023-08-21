import { UserService } from './userService';

describe('UserService', () => {
  let service;

  beforeEach(() => {
    service = new UserService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
